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
    applyHead(settings);
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

  /* Head tags set in the dashboard ("Head tags & verification"):
     webmaster verification metas, GA4, and custom head HTML —
     injected into <head> on every page. Guarded against re-runs. */
  function applyHead(settings) {
    var head = settings && settings.head;
    if (!head) return;
    setMeta('google-site-verification', 'name', head.googleVerify);
    setMeta('msvalidate.01', 'name', head.bingVerify);
    setMeta('facebook-domain-verification', 'name', head.facebookVerify);
    if (head.ga4 && !document.getElementById('wjh-ga4')) {
      var id = String(head.ga4).replace(/[^A-Za-z0-9_-]/g, '');
      var s1 = document.createElement('script');
      s1.id = 'wjh-ga4'; s1.async = true;
      s1.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(s1);
      var s2 = document.createElement('script');
      s2.textContent = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" + id + "');";
      document.head.appendChild(s2);
    }
    if (head.custom && !document.getElementById('wjh-custom-head')) {
      var marker = document.createElement('meta');
      marker.id = 'wjh-custom-head'; marker.setAttribute('content', '1');
      document.head.appendChild(marker);
      var tpl = document.createElement('template');
      tpl.innerHTML = head.custom;
      Array.prototype.slice.call(tpl.content.childNodes).forEach(function (n) {
        if (n.nodeType === 1 && n.tagName === 'SCRIPT') {
          var sc = document.createElement('script');
          Array.prototype.forEach.call(n.attributes, function (a) { sc.setAttribute(a.name, a.value); });
          sc.textContent = n.textContent;
          document.head.appendChild(sc);
        } else {
          document.head.appendChild(n);
        }
      });
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

  // 1b) Also apply settings saved in this browser's dashboard
  //     (localStorage) — covers previews and setups where the live
  //     store isn't reachable yet.
  try {
    var ls = JSON.parse(localStorage.getItem('wjh_site_settings') || 'null');
    if (ls) apply(ls);
  } catch (e) {}

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
