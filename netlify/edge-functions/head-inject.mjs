// ============================================================
//  Netlify Edge Function: head-inject
//  Injects the head tags saved in the dashboard ("Head tags &
//  verification") into the RAW HTML of every page, server-side.
//  This is what makes Google Search Console / Bing verification
//  work — their crawlers read the raw HTML and do not run JS.
//
//  Reads the same live store as everything else (via the content
//  function) and caches it for 60s per edge node.
// ============================================================
let cache = { at: 0, head: null };

export default async (request, context) => {
  const url = new URL(request.url);
  const p = url.pathname;
  const isHtml = p === '/' || p.endsWith('/') || p.endsWith('.html');
  if (!isHtml) return context.next();

  const res = await context.next();
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('text/html')) return res;

  let head = cache.head;
  if (Date.now() - cache.at > 60000) {
    try {
      const r = await fetch(url.origin + '/.netlify/functions/content');
      const d = await r.json();
      head = d && d.settings && d.settings.head ? d.settings.head : null;
    } catch (e) { head = null; }
    cache = { at: Date.now(), head };
  }
  if (!head) return res;

  const esc = (v) => String(v || '').replace(/"/g, '&quot;');
  let tags = '';
  if (head.googleVerify) tags += '<meta name="google-site-verification" content="' + esc(head.googleVerify) + '">\n';
  if (head.bingVerify) tags += '<meta name="msvalidate.01" content="' + esc(head.bingVerify) + '">\n';
  if (head.facebookVerify) tags += '<meta name="facebook-domain-verification" content="' + esc(head.facebookVerify) + '">\n';
  if (head.ga4) {
    const id = String(head.ga4).replace(/[^A-Za-z0-9_-]/g, '');
    if (id) tags += '<script id="wjh-ga4" async src="https://www.googletagmanager.com/gtag/js?id=' + id + '"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag(\'js\',new Date());gtag(\'config\',\'' + id + '\');</script>\n';
  }
  if (head.custom) tags += '<meta id="wjh-custom-head" content="1">\n' + head.custom + '\n';
  if (!tags) return res;

  const html = await res.text();
  const marker = '<!-- dashboard head tags -->\n';
  const out = html.includes('</head>')
    ? html.replace('</head>', marker + tags + '</head>')
    : marker + tags + html;
  const headers = new Headers(res.headers);
  headers.delete('content-length');
  return new Response(out, { status: res.status, headers });
};

export const config = {
  path: '/*',
  excludedPath: ['/images/*', '/content/*', '/video/*', '/screenshots/*', '/uploads/*', '/.netlify/*'],
  onError: 'bypass'
};
