/* ============================================================
   LIVE CONTENT CLIENT for wajeeh.dev
   ------------------------------------------------------------
   Talks to the Netlify Function at /.netlify/functions/content,
   which stores blogs & projects in a Netlify Blob that is SHARED
   by every visitor. This is what makes a post you publish in the
   dashboard show up for everyone — automatically, with no export
   and no redeploy.

   Graceful fallback: if the function isn't reachable (e.g. local
   preview, or before you've deployed the function), the site keeps
   working from content/published.js + the built-in seed content.
   ============================================================ */
(function () {
  var API = '/.netlify/functions/content';
  var CACHE_KEY = 'wjh_live_cache';

  function valid(d) {
    return d && (Array.isArray(d.blogs) || Array.isArray(d.projects));
  }

  // Instantly reuse the last-known live content (so returning visitors
  // see the newest posts on first paint, before the network responds).
  function cached() {
    try {
      var c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      return valid(c) ? { blogs: c.blogs || [], projects: c.projects || [] } : null;
    } catch (e) { return null; }
  }

  // Fetch the authoritative live content from the function.
  function fetchLive() {
    var ctrl = new AbortController();
    var t = setTimeout(function () { ctrl.abort(); }, 4000);
    return fetch(API, { headers: { accept: 'application/json' }, cache: 'no-store', signal: ctrl.signal })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (d) {
        clearTimeout(t);
        if (!valid(d)) return null;
        var out = { blogs: d.blogs || [], projects: d.projects || [], settings: d.settings || null };
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(out)); } catch (e) {}
        return out;
      })
      .catch(function () { clearTimeout(t); return null; });
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
          // Bubble up the function's real reason so the dashboard can show it.
          var reason = (d && (d.detail || d.hint || d.error)) || ('HTTP ' + res.status);
          var err = new Error(reason);
          err.status = res.status;
          err.code = d && d.error;
          throw err;
        }
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(payload)); } catch (e) {}
        return d;
      });
    }).catch(function (e) {
      clearTimeout(t);
      if (e && e.name === 'AbortError') { var te = new Error('timed out reaching the server'); te.status = 0; throw te; }
      throw e;
    });
  }

  // On load, fold any cached live content into window.WJH_PUBLISHED so the
  // first synchronous render already reflects it.
  var c = cached();
  if (c) {
    window.WJH_PUBLISHED = window.WJH_PUBLISHED || { blogs: [], projects: [] };
    if (c.blogs.length) window.WJH_PUBLISHED.blogs = c.blogs;
    if (c.projects.length) window.WJH_PUBLISHED.projects = c.projects;
  }

  window.WJH_LIVE = { fetchLive: fetchLive, save: save, cached: cached, API: API };
})();
