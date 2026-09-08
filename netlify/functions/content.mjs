// ============================================================
//  Netlify Function: content
//  GET  /.netlify/functions/content   → returns the live blogs+projects+settings (public)
//  POST /.netlify/functions/content   → saves blogs+projects+settings (requires admin token)
//
//  `settings` holds the dashboard's Site & SEO tab: site-wide meta
//  title / description / focus keyphrase, and the robots.txt body
//  (served at /robots.txt by the companion `robots` function).
//
//  Storage uses Netlify Blobs — built into Netlify, no third-party
//  account or database to manage. The data is shared by every
//  visitor, so a post published from the dashboard is instantly
//  live for everyone (no export, no redeploy).
//
//  SECURITY: writes require the header  x-admin-token  to match an
//  ADMIN_TOKEN you set in Netlify → Site settings → Environment
//  variables. If you don't set one, a built-in default is used so
//  it works out of the box — but PLEASE set ADMIN_TOKEN for safety.
// ============================================================
import { getStore } from '@netlify/blobs';

const STORE = 'wjh-content';
const KEY = 'published';
// Fallback token (the dashboard's login hash). Override by setting
// an ADMIN_TOKEN environment variable in Netlify.
const DEFAULT_TOKEN = '2411275664774193';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'content-type, x-admin-token'
    }
  });

// Open the Blobs store. In a deployed Netlify Function this is
// configured automatically; locally (without `netlify dev`) it may
// throw. We surface the real reason instead of failing silently.
function openStore() {
  try {
    return { store: getStore(STORE), error: null };
  } catch (e) {
    return { store: null, error: (e && e.message) || String(e) };
  }
}

export default async (req) => {
  if (req.method === 'OPTIONS') return json({ ok: true });

  const { store, error } = openStore();

  if (req.method === 'GET') {
    if (!store) {
      // Degrade gracefully so the public site still renders.
      return json({ blogs: [], projects: [], settings: null, store: 'unavailable', detail: error });
    }
    try {
      const data = (await store.get(KEY, { type: 'json' })) || { blogs: [], projects: [] };
      let blogs = data.blogs || [];
      let projects = data.projects || [];
      // ?lite=1 → strip base64 images + long bodies. Used by pages that
      // only need titles/settings (home, about, services…). Cuts the
      // response from megabytes to a few KB.
      const lite = new URL(req.url).searchParams.get('lite') === '1';
      if (lite) {
        const slim = (p) => {
          const o = {};
          for (const k of Object.keys(p || {})) {
            const v = p[k];
            if (typeof v === 'string' && v.startsWith('data:')) continue;
            if (k === 'content') continue;
            o[k] = v;
          }
          return o;
        };
        blogs = blogs.map(slim);
        projects = [];
      }
      return json({ blogs, projects, settings: data.settings || null, store: 'ok' });
    } catch (e) {
      return json({ blogs: [], projects: [], settings: null, store: 'error', detail: (e && e.message) || String(e) });
    }
  }

  if (req.method === 'POST') {
    const expected = process.env.ADMIN_TOKEN || DEFAULT_TOKEN;
    const token = req.headers.get('x-admin-token') || '';
    if (token !== expected) return json({ error: 'unauthorized', hint: 'x-admin-token did not match. If you set an ADMIN_TOKEN env var in Netlify, sign in to the dashboard with the matching password.' }, 401);

    if (!store) {
      return json({ error: 'blobs-unavailable', detail: error, hint: 'Netlify Blobs is not reachable. Make sure the site is deployed on Netlify (Blobs does not run in a plain static preview).' }, 503);
    }

    let body;
    try { body = await req.json(); }
    catch (e) { return json({ error: 'invalid-json' }, 400); }

    // Sanitize settings: only known string fields, with sane size caps.
    const s = body.settings && typeof body.settings === 'object' ? body.settings : null;
    const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');
    const pageSeo = (p) => (p && typeof p === 'object') ? {
      metaTitle: str(p.metaTitle, 200),
      metaDescription: str(p.metaDescription, 500),
      focusKeyword: str(p.focusKeyword, 200)
    } : null;
    let pages = null;
    if (s && s.pages && typeof s.pages === 'object') {
      pages = {};
      for (const k of Object.keys(s.pages).slice(0, 40)) {
        const ps = pageSeo(s.pages[k]);
        if (ps && (ps.metaTitle || ps.metaDescription || ps.focusKeyword)) pages[String(k).slice(0, 40)] = ps;
      }
    }
    const settings = s ? {
      metaTitle: str(s.metaTitle, 200),
      metaDescription: str(s.metaDescription, 500),
      focusKeyword: str(s.focusKeyword, 200),
      robots: str(s.robots, 20000),
      pages: pages || {},
      head: (s.head && typeof s.head === 'object') ? {
        googleVerify: str(s.head.googleVerify, 300),
        bingVerify: str(s.head.bingVerify, 300),
        facebookVerify: str(s.head.facebookVerify, 300),
        ga4: str(s.head.ga4, 50),
        custom: str(s.head.custom, 10000)
      } : {},
      site: (s.site && typeof s.site === 'object') ? {
        contactEmail: str(s.site.contactEmail, 200),
        footerText: str(s.site.footerText, 400),
        social: (s.site.social && typeof s.site.social === 'object') ? {
          linkedin: str(s.site.social.linkedin, 300),
          github: str(s.site.social.github, 300),
          instagram: str(s.site.social.instagram, 300),
          x: str(s.site.social.x, 300)
        } : {}
      } : {}
    } : null;

    const payload = {
      blogs: Array.isArray(body.blogs) ? body.blogs : [],
      projects: Array.isArray(body.projects) ? body.projects : [],
      settings,
      updatedAt: new Date().toISOString()
    };
    try {
      await store.setJSON(KEY, payload);
    } catch (e) {
      return json({ error: 'save-failed', detail: (e && e.message) || String(e) }, 500);
    }
    return json({ ok: true, blogs: payload.blogs.length, projects: payload.projects.length });
  }

  return json({ error: 'method-not-allowed' }, 405);
};
