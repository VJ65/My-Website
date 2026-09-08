/* ============================================================
   PAGE SEO APPLIER for wajeeh.dev
   ------------------------------------------------------------
   Applies the per-page meta title / description set in the
   dashboard's "Site & SEO" tab. The homepage uses the legacy
   top-level settings fields; every other page reads its entry
   from settings.pages[<page>]. Pages without an override keep
   their built-in <title> and meta tags.
   ============================================================ */
(function () {
  function pageKey() {
    var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!p || p === 'index.html' || p === 'index.htm') return 'home';
    if (p.indexOf('about') === 0) return 'about';
    if (p.indexOf('services') === 0) return 'services';
    if (p.indexOf('projections') === 0) return 'projections';
    if (p.indexOf('projects') === 0) return 'projects';
    if (p.indexOf('blog') === 0) return 'blog';
    if (p.indexOf('contact') === 0) return 'contact';
    return null;
  }
  function setMeta(name, attr, val) {
    if (!val) return;
    var el = document.head.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute('content', val);
  }
  function dataFor(settings, key) {
    if (!settings) return null;
    if (key === 'home') return { metaTitle: settings.metaTitle, metaDescription: settings.metaDescription };
    var pages = settings.pages || {};
    return pages[key] || null;
  }
  function apply(settings) {
    applyBrand(settings);
    var key = pageKey();
    if (!key) return;
    var d = dataFor(settings, key);
    if (!d) return;
    if (d.metaTitle) {
      document.title = d.metaTitle;
      setMeta('og:title', 'property', d.metaTitle);
      setMeta('twitter:title', 'name', d.metaTitle);
    }
    if (d.metaDescription) {
      setMeta('description', 'name', d.metaDescription);
      setMeta('og:description', 'property', d.metaDescription);
      setMeta('twitter:description', 'name', d.metaDescription);
    }
  }

  /* Brand & contact settings apply to every page: footer copyright line,
     contact-email links, and social links. Elements opt in with markers:
       .footer-copy / [data-site-footer]  -> footer text
       [data-contact-email]               -> mailto href (+ text if empty marker)
       [data-social="linkedin|github|instagram|x"] -> href */
  function applyBrand(settings) {
    var site = settings && settings.site;
    if (!site) return;
    if (site.footerText) {
      document.querySelectorAll('.footer-copy, [data-site-footer]').forEach(function (el) {
        el.textContent = site.footerText;
      });
    }
    if (site.contactEmail) {
      document.querySelectorAll('[data-contact-email]').forEach(function (el) {
        if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + site.contactEmail);
        if (el.getAttribute('data-contact-email') === 'text') el.textContent = site.contactEmail;
      });
    }
    var sc = site.social || {};
    Object.keys(sc).forEach(function (net) {
      if (!sc[net]) return;
      document.querySelectorAll('[data-social="' + net + '"]').forEach(function (el) {
        el.setAttribute('href', sc[net]);
      });
    });
  }

  // 1) Apply synchronously from published content (instant, no flicker).
  apply(window.WJH_PUBLISHED && window.WJH_PUBLISHED.settings);

  // 2) Re-apply if the live store returns newer settings.
  if (window.WJH_LIVE && window.WJH_LIVE.fetchLive) {
    window.WJH_LIVE.fetchLive().then(function (d) {
      if (d && d.settings) {
        window.WJH_PUBLISHED = window.WJH_PUBLISHED || { blogs: [], projects: [] };
        window.WJH_PUBLISHED.settings = d.settings;
        apply(d.settings);
      }
    }).catch(function () {});
  }
})();
