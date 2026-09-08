// ============================================================
//  Netlify Function: robots
//  GET /robots.txt → serves the robots.txt body saved from the
//  dashboard's Site & SEO tab (Netlify Blobs). If nothing has
//  been saved yet, serves the built-in default below, which
//  mirrors the static robots.txt that ships with the site.
//
//  Wired up via the redirect in netlify.toml:
//    /robots.txt → /.netlify/functions/robots  (force = true)
// ============================================================
import { getStore } from '@netlify/blobs';

const DEFAULT_ROBOTS = `# robots.txt — Syed Wajeeh Ul Hassan · Portfolio

# --- All search engines: allow the public site -----------------
User-agent: *
Allow: /

# Block admin, build artifacts, uploads, and source-only files
Disallow: /admin
Disallow: /admin/
Disallow: /admin.html
Disallow: /dashboard
Disallow: /dashboard/
Disallow: /dashboard.html
Disallow: /uploads/
Disallow: /scraps/
Disallow: /screenshots/
Disallow: /*.jsx$
Disallow: /*.json$
Disallow: /*.pdf$

# Block low-value internal query parameters (filter views)
Disallow: /services.html?s=
Disallow: /*?utm_
Disallow: /*?fbclid=
Disallow: /*?gclid=

# --- Google ------------------------------------------------------
User-agent: Googlebot
Allow: /Syed_Wajeeh_Ul_Hassan_CV.pdf
Allow: /
Disallow: /uploads/
Disallow: /scraps/
Disallow: /screenshots/
Disallow: /admin
Disallow: /admin/
Disallow: /admin.html
Disallow: /dashboard
Disallow: /dashboard/
Disallow: /dashboard.html

User-agent: Googlebot-Image
Allow: /
Disallow: /scraps/

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 2

# DuckDuckGo
User-agent: DuckDuckBot
Allow: /

# --- AI / LLM crawlers (training opt-out) ------------------------
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

# --- Block aggressive scrapers -----------------------------------
User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: PetalBot
Disallow: /

# --- Sitemap ------------------------------------------------------
Sitemap: https://syedwajeehulhassan.com/sitemap.xml
`;

export default async () => {
  let txt = '';
  try {
    const store = getStore('wjh-content');
    const data = await store.get('published', { type: 'json' });
    if (data && data.settings && typeof data.settings.robots === 'string') {
      txt = data.settings.robots.trim();
    }
  } catch (e) { /* blobs unavailable → fall back */ }

  if (!txt) txt = DEFAULT_ROBOTS;

  return new Response(txt + '\n', {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=300'
    }
  });
};
