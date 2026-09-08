/* ============================================================
   LIVE CONTENT CLIENT for wajeeh.dev — v3
   ------------------------------------------------------------
   Talks to the Netlify Function at /.netlify/functions/content.
   v3 performance changes:
   - ONE network request per page load, shared by every caller
     (page-seo.js, blog teasers, etc.) via a memoized promise.
   - Pages that don't render full posts (home, about, services…)
     fetch ?lite=1 — a few KB instead of megabytes of base64
     images. blog/projects/dashboard/admin get the full payload.
   ============================================================ */
(function () {
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var FULL = /^(blog|projects|dashboard|admin)/.test(page);
  var API = '/.netlify/functions/content';
  var CACHE_KEY = FULL ? 'wjh_live_cache' : 'wjh_live_cache_lite';

  function valid(d) {
    return d && (Array.isArray(d.blogs) || Array.isArray(d.projects));
  }

  function cached() {
    try {
      var c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      return valid(c) ? { blogs: c.blogs || [], projects: c.projects || [], settings: c.settings || null } : null;
    } catch (e) { return null; }
  }

  var inflight = null;
  function fetchLive() {
    if (inflight) return inflight;
    var ctrl = new AbortController();
    var t = setTimeout(function () { ctrl.abort(); }, 6000);
    inflight = fetch(API + (FULL ? '' : '?lite=1'), { headers: { accept: 'application/json' }, cache: 'no-store', signal: ctrl.signal })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (d) {
        clearTimeout(t);
        if (!valid(d)) return null;
        var out = { blogs: d.blogs || [], projects: d.projects || [], settings: d.settings || null };
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(out)); } catch (e) {}
        return out;
      })
      .catch(function () { clearTimeout(t); inflight = null; return null; });
    return inflight;
  }

  // Save content to the live store (dashboard only). Requires the admin token.
  function save(data, token) {
    var ctrl = new AbortController();
    var t = setTimeout(function () { ctrl.abort(); }, 6000);
    var payload = {
      blogs: (data && data.blogs) || [],
      projects: (data && data.projects) || [],
      settings: (data && data.settings) || null
    };
    return fetch(API, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-token': token || '' },
      body: JSON.stringify(payload),
      signal: ctrl.signal
    }).then(function (res) {
      clearTimeout(t);
      return res.json().catch(function () { return {}; }).then(function (d) {
        if (!res.ok) {
          var reason = (d && (d.detail || d.hint || d.error)) || ('HTTP ' + res.status);
          var err = new Error(reason);
          err.status = res.status;
          err.code = d && d.error;
          throw err;
        }
        try { localStorage.setItem('wjh_live_cache', JSON.stringify(payload)); } catch (e) {}
        return d;
      });
    }).catch(function (e) {
      clearTimeout(t);
      if (e && e.name === 'AbortError') { var te = new Error('timed out reaching the server'); te.status = 0; throw te; }
      throw e;
    });
  }

  // Fold cached live content into WJH_PUBLISHED for instant first paint.
  var c = cached();
  if (c) {
    window.WJH_PUBLISHED = window.WJH_PUBLISHED || { blogs: [], projects: [] };
    if (c.blogs.length) window.WJH_PUBLISHED.blogs = c.blogs;
    if (c.projects.length) window.WJH_PUBLISHED.projects = c.projects;
    if (c.settings) window.WJH_PUBLISHED.settings = c.settings;
  }

  window.WJH_LIVE = { fetchLive: fetchLive, save: save, cached: cached, API: API };
})();
