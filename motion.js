/* Site-wide motion — balanced intensity. Load once from <helmet>.
   - Scroll reveal: every <section> and [data-reveal] fades/slides in once visible
   - Counters: [data-count="300"] [data-prefix] [data-suffix] count up on reveal
   - Parallax: [data-orb] (and .orb) drift with scroll
   - Card lift + glow: any <a>/<button> card with a border-radius ≥ 10px inside main/section
   Respects prefers-reduced-motion. Idempotent; safe to call window.WJHMotion.refresh() after re-render. */
(function () {
  if (window.WJHMotion) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = document.createElement('style');
  css.id = 'wjh-motion';
  css.textContent = `
  [data-m-reveal] { opacity: 0; transform: translateY(26px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); will-change: opacity, transform; }
  [data-m-reveal="in"] { opacity: 1; transform: none; }
  [data-m-reveal] > * { transition: inherit; }
  [data-m-card] { transition: transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s cubic-bezier(.16,1,.3,1), border-color .28s !important; }
  [data-m-card]:hover { transform: translateY(-5px) !important; box-shadow: 0 18px 40px oklch(18% 0.02 240 / .12), 0 0 0 1px oklch(52% 0.14 195 / .35), 0 0 32px oklch(52% 0.14 195 / .18) !important; }
  [data-m-card]:active { transform: translateY(-2px) scale(.995) !important; }
  @media (prefers-reduced-motion: reduce) { [data-m-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; } [data-m-card]:hover { transform: none !important; } }`;
  document.head.appendChild(css);

  const ease = (t) => 1 - Math.pow(1 - t, 4);
  const fmt = (n, dec) => dec ? n.toFixed(dec) : Math.round(n).toLocaleString('en-US');

  function runCounter(el) {
    if (el.dataset.mDone) return; el.dataset.mDone = '1';
    const target = parseFloat(el.dataset.count); if (isNaN(target)) return;
    const dec = (String(el.dataset.count).split('.')[1] || '').length;
    const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduced) { el.textContent = pre + fmt(target, dec) + suf; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (now) => { const p = Math.min(1, (now - t0) / dur); el.textContent = pre + fmt(target * ease(p), dec) + suf; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.setAttribute('data-m-reveal', 'in');
      e.target.querySelectorAll('[data-count]').forEach(runCounter);
      if (e.target.hasAttribute('data-count')) runCounter(e.target);
      io.unobserve(e.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  function refresh() {
    // reveal targets: direct children of <main>/<section> content wrappers, and explicit [data-reveal]
    const targets = new Set();
    document.querySelectorAll('section, [data-reveal], main > *').forEach((el) => {
      if (el.closest('nav, footer, [role="dialog"], deck-stage')) return;
      if (el.id === 'hero' || el.closest('#hero, header')) return;
      targets.add(el);
    });
    targets.forEach((el) => {
      if (el.hasAttribute('data-m-reveal')) return;
      const r = el.getBoundingClientRect();
      const visible = r.top < innerHeight * 0.85 && r.bottom > 0;
      el.setAttribute('data-m-reveal', visible ? 'in' : '');
      if (visible) { el.querySelectorAll('[data-count]').forEach(runCounter); }
      else io.observe(el);
    });
    // counters outside sections (hero)
    document.querySelectorAll('[data-count]:not([data-m-done])').forEach((el) => { if (!el.closest('[data-m-reveal=""]')) runCounter(el); });
    // cards
    document.querySelectorAll('main a, main button, section a, section button').forEach((el) => {
      if (el.hasAttribute('data-m-card') || el.closest('nav, footer, form, [role="dialog"]')) return;
      const cs = getComputedStyle(el);
      if (cs.display === 'inline' || parseFloat(cs.borderRadius) < 10 || parseFloat(cs.borderRadius) > 40) return;
      if (el.offsetHeight < 90) return;
      el.setAttribute('data-m-card', '');
    });
  }

  // parallax orbs
  let orbs = [];
  function collectOrbs() {
    orbs = Array.from(document.querySelectorAll('[data-orb]')).map((el, i) => ({ el, k: parseFloat(el.dataset.orb) || (i % 2 ? -0.12 : 0.18) }));
  }
  let raf = 0;
  function onScroll() {
    if (reduced || raf) return;
    raf = requestAnimationFrame(() => { raf = 0; const y = scrollY; for (const o of orbs) o.el.style.setProperty('--m-py', (y * o.k).toFixed(1) + 'px'); });
  }
  const orbCss = document.createElement('style');
  orbCss.textContent = `[data-orb] { translate: 0 var(--m-py, 0px); }`;
  document.head.appendChild(orbCss);
  addEventListener('scroll', onScroll, { passive: true });

  // observe DOM changes (streaming render / route changes)
  let pending = 0;
  const mo = new MutationObserver(() => { if (pending) return; pending = setTimeout(() => { pending = 0; refresh(); collectOrbs(); onScroll(); }, 80); });
  const start = () => { refresh(); collectOrbs(); onScroll(); mo.observe(document.body, { childList: true, subtree: true }); };
  if (document.body) start(); else addEventListener('DOMContentLoaded', start);

  window.WJHMotion = { refresh: () => { refresh(); collectOrbs(); } };
})();
