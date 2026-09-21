// Mounts the original service detail body (services-render.js) + execution demo + estimator for a key.
const { useEffect, useRef, useState } = React;
let loading = null;
function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
function ensureLoaded() {
  if (!loading) {
    loading = import('./data/services.js').then(async (m) => {
      window.SERVICES = m.SERVICES; window.SERVICE_ORDER = m.SERVICE_ORDER;
      if (!window.renderEstimator) await loadScript('estimator.js');
      if (!window.renderExecution) await loadScript('execution-demos.js');
      if (!window.renderServiceBody) await loadScript('services-render.js');
    });
  }
  return loading;
}
function ServiceBody({ service }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { ensureLoaded().then(() => setReady(true)); }, []);
  useEffect(() => {
    if (!ready || !ref.current) return;
    ref.current.innerHTML = window.renderServiceBody(service) || '';
    try { if (window.attachEstimator) window.attachEstimator(service); } catch (e) { console.warn('estimator attach failed', e); }
  }, [ready, service]);
  return React.createElement('div', { ref, className: 'layout', 'data-service-body': service, style: { minHeight: ready ? 0 : 600 } },
    ready ? null : React.createElement('div', { style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'oklch(62% 0.015 240)', padding: 20 } }, 'Loading…'));
}
window.ServiceBody = ServiceBody;
