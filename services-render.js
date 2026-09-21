/* Service detail body — ported from services.html renderService(); markup kept 1:1 */
const RELATED = {
  scratch: ['performance', 'webdev', 'automation'],
  seo: ['content', 'sem', 'webdev'],
  sem: ['performance', 'paid', 'seo'],
  paid: ['performance', 'sem', 'social'],
  performance: ['sem', 'paid', 'scratch'],
  social: ['content', 'paid', 'performance'],
  content: ['seo', 'social', 'email'],
  email: ['automation', 'performance', 'content'],
  webdev: ['scratch', 'wordpress', 'seo'],
  wordpress: ['webdev', 'seo', 'content'],
  automation: ['scratch', 'email', 'performance']
};
window.renderServiceBody = function (key) {
  const SERVICES = window.SERVICES; const s = SERVICES[key]; if (!s) return '';
  const order = window.SERVICE_ORDER || Object.keys(SERVICES);
  const idx = order.indexOf(key);
  const prevKey = order[(idx - 1 + order.length) % order.length];
  const nextKey = order[(idx + 1) % order.length];
  const related = (RELATED[key] || [nextKey, prevKey]).filter(k => k !== key && SERVICES[k]).slice(0, 3);
  return `
    <div class="svc-section">
      <div class="svc-h2-lbl">What You Get</div>
      <h2 class="svc-h2">A complete ${s.short} system, not a checklist</h2>
      <p>Every engagement is scoped around outcomes, not deliverable counts. Here are the building blocks I bring to ${s.short} engagements:</p>
      <div class="svc-grid">
        ${s.whatYouGet.map(([num, t, p]) => `
          <div class="svc-card">
            <div class="num">${num}</div>
            <h4>${t}</h4>
            <p>${p}</p>
          </div>`).join('')}
      </div>
    </div>

    <div class="svc-section">
      <div class="svc-h2-lbl">My Process</div>
      <h2 class="svc-h2">${s.process.title}</h2>
      <p>${s.process.intro}</p>
      <div class="kr-flow">
        ${s.process.steps.map(([title, body, tools], i) => `
          <div class="kr-step">
            <div class="kr-num">${String(i+1).padStart(2,'0')}</div>
            <div class="kr-body">
              <h4>${title}</h4>
              <p>${body}</p>
              <div class="kr-tools">${tools.map(t => `<span>${t}</span>`).join('')}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="svc-section">
      <div class="svc-h2-lbl">Deliverables</div>
      <h2 class="svc-h2">What ships in a typical engagement</h2>
      <p>Concrete deliverables you can plan around. Scope and volume scale with retainer tier — let's talk about what your business needs.</p>
      <div class="deliv-list">
        ${s.deliverables.map(d => `<div class="deliv-item"><div class="chk">✓</div><div class="txt">${d}</div></div>`).join('')}
      </div>
    </div>

    ${(window.renderExecution && window.renderExecution(key)) || ''}

    ${(window.renderEstimator && window.renderEstimator(key)) || ''}

    <div class="svc-section svc-related">
      <div class="svc-h2-lbl">Related Services</div>
      <h2 class="svc-h2">Pairs well with</h2>
      <p>${s.short} performs best as part of a system. These services compound with it:</p>
      <div class="related-grid">
        ${related.map(k => { const r = SERVICES[k]; return `
          <a class="related-card" href="services.html?s=${k}">
            <span class="related-ico">${r.icon}</span>
            <span class="related-info"><b>${r.title}</b><small>${r.lead.split('. ')[0]}.</small></span>
            <span class="related-go">→</span>
          </a>`; }).join('')}
      </div>
    </div>

    <div class="cta-band">
      <div>
        <h3>Need help with ${s.short}?</h3>
        <p>Free 30-minute consultation. No pitch deck, just a working session on your specific problem.</p>
      </div>
      <a class="btn" href="contact.html">Start a Conversation →</a>
    </div>

    <div class="svc-pager">
      <a class="pager-link" href="services.html?s=${prevKey}"><small>← Previous Service</small><span>${SERVICES[prevKey].title}</span></a>
      <a class="pager-link next" href="services.html?s=${nextKey}"><small>Next Service →</small><span>${SERVICES[nextKey].title}</span></a>
    </div>
  `;
};
