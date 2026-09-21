// Mounts the site's original estimator widget (estimator.js) for one service key.
// estimator.js reads window.SERVICES and exposes window.renderEstimator / attachEstimator.
const { useEffect, useRef, useState } = React;
let loading = null;
function ensureLoaded() {
  if (window.renderEstimator && window.SERVICES) return Promise.resolve();
  if (!loading) {
    loading = import('./data/services.js').then((m) => {
      window.SERVICES = m.SERVICES; window.SERVICE_ORDER = m.SERVICE_ORDER;
      return new Promise((res, rej) => {
        if (window.renderEstimator) return res();
        const s = document.createElement('script'); s.src = 'estimator.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s);
      });
    });
  }
  return loading;
}
function Estimator({ service }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { ensureLoaded().then(() => setReady(true)); }, []);
  useEffect(() => {
    if (!ready || !ref.current) return;
    ref.current.innerHTML = window.renderEstimator(service) || '';
    // attachEstimator queries document for .est-card — scope by temporarily ensuring ours is first
    try { window.attachEstimator(service); } catch (e) { console.warn('estimator attach failed', e); }
  }, [ready, service]);
  return React.createElement('div', { ref, 'data-estimator': service, style: { minHeight: ready ? 0 : 320 } },
    ready ? null : React.createElement('div', { style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'oklch(62% 0.015 240)', padding: 20 } }, 'Loading estimator…'));
}
window.Estimator = Estimator;
