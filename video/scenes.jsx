// scenes.jsx — the five scenes for the demo video. Loaded after shared.jsx.

// ── small helpers ───────────────────────────────────────────────────
function Icon({ name, color }) {
  const c = color || TEAL;
  const p = { width: 38, height: 38, viewBox: '0 0 24 24', fill: 'none', stroke: c,
    strokeWidth: 2.1, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    seo: <g><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /><path d="M8 11l2 2 4-4" /></g>,
    ads: <g><path d="M3 11l18-5v12L3 14v-3z" /><path d="M7 13v4a2 2 0 0 0 4 0" /></g>,
    dev: <g><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></g>,
    auto: <g><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></g>,
  };
  return <svg {...p}>{paths[name]}</svg>;
}

// ── SCENE 1 · Hook ──────────────────────────────────────────────────
function HookScene() {
  const t = useTime();
  const subK = animate({ from: 0, to: 1, start: 1.1, end: 1.6, ease: Easing.easeOutCubic })(t);
  const headK = animate({ from: 0, to: 1, start: 0.7, end: 1.3, ease: Easing.easeOutBack })(t);
  const headY = (1 - clamp(animate({ from: 0, to: 1, start: 0.7, end: 1.3 })(t), 0, 1)) * 30;
  return (
    <SceneFade fadeIn={0.01} fadeOut={0.45} scaleFrom={1.0} style={{ background: BG }}>
      <GridBg />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 90px' }}>
        <LogoRing size={250} t0={0.1} />
        <div style={{ opacity: headK, transform: `translateY(${headY}px)`, marginTop: 80, textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 96, lineHeight: 1.08,
            color: FG, letterSpacing: '-0.03em' }}>
            Stop <span style={{ color: TEAL }}>guessing</span><br />your marketing<br /><span style={{ color: AMBER }}>ROI.</span>
          </div>
        </div>
        <div style={{ opacity: subK, marginTop: 56, fontFamily: SANS, fontSize: 34, color: FG2,
          fontWeight: 500, textAlign: 'center', letterSpacing: '0.01em' }}>
          Syed Wajeeh Ul Hassan — Growth Developer
        </div>
      </div>
    </SceneFade>
  );
}

// ── persistent backgrounds ──────────────────────────────────────────
function GridBg() {
  return <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none',
    backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`,
    backgroundSize: '72px 72px', maskImage: 'radial-gradient(circle at 50% 40%, #000 35%, transparent 78%)',
    WebkitMaskImage: 'radial-gradient(circle at 50% 40%, #000 35%, transparent 78%)' }} />;
}

// ── inner: Services screen ──────────────────────────────────────────
function ServicesScreen({ start }) {
  const t = useTime();
  const cards = [
    { ic: 'seo', name: 'SEO & Content', d: 'Rank, traffic, authority' },
    { ic: 'ads', name: 'Google & Meta Ads', d: '$10M+ ad spend managed' },
    { ic: 'dev', name: 'Web Development', d: 'Fast, conversion-built' },
    { ic: 'auto', name: 'Marketing Automation', d: 'Pipelines that compound' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '70px 64px' }}>
      <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 26, color: TEAL,
        letterSpacing: '0.12em' }}>WHAT I DO</div>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 64, color: FG,
        marginTop: 16, letterSpacing: '-0.03em', lineHeight: 1.05 }}>Growth,<br />end to end.</div>
      <div style={{ width: 70, height: 5, background: TEAL, borderRadius: 3, margin: '34px 0 50px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {cards.map((c, i) => {
          const s = start + 0.45 + i * 0.22;
          const k = animate({ from: 0, to: 1, start: s, end: s + 0.5, ease: Easing.easeOutBack })(t);
          return (
            <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 22,
              padding: '36px 32px', boxShadow: '0 8px 30px oklch(18% 0.02 240 / 0.05)',
              opacity: clamp(k, 0, 1), transform: `translateY(${(1 - clamp(k, 0, 1)) * 24}px) scale(${0.92 + 0.08 * clamp(k, 0, 1)})`,
              transformOrigin: 'center' }}>
              <div style={{ width: 78, height: 78, borderRadius: 18, background: TEALL,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 26 }}>
                <Icon name={c.ic} />
              </div>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, color: FG, letterSpacing: '-0.02em' }}>{c.name}</div>
              <div style={{ fontFamily: SANS, fontSize: 24, color: FG2, marginTop: 10 }}>{c.d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── inner: Estimator screen (hero feature) ──────────────────────────
function EstimatorScreen({ start }) {
  const t = useTime();
  const budget = animate({ from: 2000, to: 6000, start: start + 0.3, end: start + 1.2, ease: Easing.easeOutCubic })(t);
  const sliderK = animate({ from: 0, to: 1, start: start + 0.3, end: start + 1.2, ease: Easing.easeOutCubic })(t);
  const press = animate({ from: 1, to: 0.95, start: start + 1.4, end: start + 1.55, ease: Easing.easeOutQuad })(t)
              + animate({ from: 0, to: 0.05, start: start + 1.55, end: start + 1.7, ease: Easing.easeOutQuad })(t);
  const resStart = start + 1.85;
  const resK = animate({ from: 0, to: 1, start: resStart, end: resStart + 0.5, ease: Easing.easeOutBack })(t);
  const bars = [34, 52, 61, 78, 90, 100];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '60px 60px' }}>
      <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 26, color: TEAL, letterSpacing: '0.12em' }}>PROJECTION ESTIMATOR</div>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 52, color: FG, marginTop: 14, letterSpacing: '-0.03em' }}>Your ROI, projected.</div>

      {/* tabs */}
      <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
        {['SEO', 'Google Ads', 'Web'].map((tab, i) => (
          <div key={i} style={{ fontFamily: MONO, fontSize: 24, fontWeight: 600,
            padding: '14px 26px', borderRadius: 999,
            background: i === 1 ? TEAL : BG2, color: i === 1 ? '#fff' : FG2,
            border: `1px solid ${i === 1 ? TEAL : BORDER}` }}>{tab}</div>
        ))}
      </div>

      {/* budget input */}
      <div style={{ marginTop: 30, background: BG2, border: `1px solid ${BORDER}`, borderRadius: 22, padding: '30px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: SANS, fontSize: 26, color: FG2, fontWeight: 600 }}>Monthly ad budget</span>
          <span style={{ fontFamily: MONO, fontSize: 40, fontWeight: 700, color: TEAL }}>
            <CountUp from={2000} to={6000} start={start + 0.3} end={start + 1.2} format={v => '$' + Math.round(v / 100) * 100}/>
          </span>
        </div>
        <div style={{ position: 'relative', height: 12, borderRadius: 6, background: BORDER, marginTop: 26 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${10 + sliderK * 62}%`,
            background: TEAL, borderRadius: 6 }} />
          <div style={{ position: 'absolute', left: `${10 + sliderK * 62}%`, top: '50%',
            width: 34, height: 34, marginLeft: -17, marginTop: -17, borderRadius: '50%',
            background: '#fff', border: `4px solid ${TEAL}`, boxShadow: '0 4px 12px oklch(52% 0.14 195 / 0.4)' }} />
        </div>
      </div>

      {/* calculate button */}
      <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 28, fontWeight: 700, color: '#fff', background: TEAL,
          padding: '20px 44px', borderRadius: 14, transform: `scale(${clamp(press, 0.9, 1.05)})`,
          boxShadow: '0 12px 30px oklch(52% 0.14 195 / 0.35)' }}>Calculate projection →</div>
      </div>

      {/* results */}
      <div style={{ marginTop: 34, opacity: clamp(resK, 0, 1), transform: `translateY(${(1 - clamp(resK, 0, 1)) * 26}px)` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <div style={{ background: TEALL, borderRadius: 20, padding: '26px 28px' }}>
            <div style={{ fontFamily: MONO, fontSize: 60, fontWeight: 700, color: TEALD }}>
              <CountUp from={0} to={168} start={resStart + 0.1} end={resStart + 1.6} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 23, color: FG2, marginTop: 6, fontWeight: 600 }}>Leads / month</div>
          </div>
          <div style={{ background: AMBERL, borderRadius: 20, padding: '26px 28px' }}>
            <div style={{ fontFamily: MONO, fontSize: 60, fontWeight: 700, color: AMBER }}>
              <CountUp from={0} to={58} start={resStart + 0.1} end={resStart + 1.6} format={v => '$' + Math.round(v) + 'K'} />
            </div>
            <div style={{ fontFamily: SANS, fontSize: 23, color: FG2, marginTop: 6, fontWeight: 600 }}>Est. revenue / mo</div>
          </div>
        </div>
        {/* ramp */}
        <div style={{ marginTop: 24, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '24px 30px' }}>
          <div style={{ fontFamily: MONO, fontSize: 20, color: FG3, letterSpacing: '0.08em', marginBottom: 18 }}>PROJECTED RAMP · 6 MONTHS</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 150 }}>
            {bars.map((bh, i) => {
              const bs = resStart + 0.3 + i * 0.12;
              const bk = animate({ from: 0, to: 1, start: bs, end: bs + 0.5, ease: Easing.easeOutCubic })(t);
              return <div key={i} style={{ flex: 1, height: `${bh * clamp(bk, 0, 1)}%`,
                background: `linear-gradient(${TEAL}, ${AMBER})`, borderRadius: '8px 8px 0 0', minHeight: 4 }} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── inner: A/B test screen ──────────────────────────────────────────
function ABScreen({ start }) {
  const t = useTime();
  const swapAt = start + 1.0;
  const isB = t >= swapAt;
  const headline = isB ? 'I grow brands that already have product.' : 'Growth Dev & Performance Marketer';
  const ctaColor = isB ? AMBER : TEAL;
  const ctaText = isB ? 'Get my growth plan →' : "Let's work together →";
  const variants = ['A', 'B', 'C'];
  const activeIdx = isB ? 1 : 0;
  const liftStart = swapAt + 0.15;
  // headline fades on the A→B swap so it reads as a transition (and never starts hidden in static capture)
  const headOpacity = t < swapAt ? 1 : clamp((t - swapAt) / 0.35, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '60px 60px' }}>
      <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 26, color: TEAL, letterSpacing: '0.12em' }}>A/B TEST PLAYGROUND</div>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 52, color: FG, marginTop: 14, letterSpacing: '-0.03em' }}>Be the marketer.</div>

      {/* live preview card */}
      <div style={{ marginTop: 34, background: BG2, border: `1px solid ${BORDER}`, borderRadius: 22,
        padding: '44px 38px', minHeight: 250 }}>
        <div style={{ fontFamily: MONO, fontSize: 22, color: TEAL, letterSpacing: '0.06em', marginBottom: 18 }}>● LIVE PREVIEW</div>
        <div key={headline} style={{ fontFamily: MONO, fontWeight: 700, fontSize: 40, color: FG,
          lineHeight: 1.12, letterSpacing: '-0.02em', opacity: headOpacity }}>{headline}</div>
        <div style={{ marginTop: 30, display: 'inline-block', fontFamily: MONO, fontSize: 26, fontWeight: 700,
          color: '#fff', background: ctaColor, padding: '18px 34px', borderRadius: 12 }}>{ctaText}</div>
      </div>

      {/* variant chips */}
      <div style={{ display: 'flex', gap: 16, marginTop: 30 }}>
        {variants.map((v, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: MONO, fontSize: 30, fontWeight: 700,
            padding: '22px 0', borderRadius: 16,
            background: i === activeIdx ? TEAL : '#fff', color: i === activeIdx ? '#fff' : FG3,
            border: `2px solid ${i === activeIdx ? TEAL : BORDER}` }}>Variant {v}</div>
        ))}
      </div>

      {/* impact readout */}
      <div style={{ marginTop: 28, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20,
        padding: '28px 34px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: SANS, fontSize: 24, color: FG2, fontWeight: 600 }}>Projected CTR lift</div>
          <div style={{ fontFamily: MONO, fontSize: 30, color: FG3, marginTop: 6 }}>vs. control</div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 84, fontWeight: 700, color: TEAL }}>
          +<CountUp from={0} to={18} start={liftStart} end={liftStart + 1.0} />%
        </div>
      </div>
    </div>
  );
}

// ── device span (services + estimator + ab) ─────────────────────────
function DeviceSpan() {
  const t = useTime();
  // gentle camera: continuous drift + a closer push during estimator results
  const baseScale = interpolate([2.6, 6.0, 8.5, 10.0, 12.9],
    [1.005, 1.02, 1.06, 1.02, 1.04], Easing.easeInOutCubic)(t);
  const camY = interpolate([2.6, 8.5, 10.0, 12.9], [0, -40, 0, 0], Easing.easeInOutCubic)(t);
  return (
    <SceneFade fadeIn={0.45} fadeOut={0.45} scaleFrom={1.05} style={{ background: BG }}>
      <GridBg />
      <Watermark />
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${baseScale}) translateY(${camY}px)`,
        transformOrigin: '50% 42%', willChange: 'transform' }}>
        <BrowserFrame>
          <Sprite start={2.95} end={5.75}>
            {() => <ScreenFadeInner><ServicesScreen start={3.0} /></ScreenFadeInner>}
          </Sprite>
          <Sprite start={5.7} end={10.05}>
            {() => <ScreenFadeInner><EstimatorScreen start={5.75} /></ScreenFadeInner>}
          </Sprite>
          <Sprite start={10.0} end={12.85}>
            {() => <ScreenFadeInner><ABScreen start={10.05} /></ScreenFadeInner>}
          </Sprite>
        </BrowserFrame>
      </div>
    </SceneFade>
  );
}

// crossfade for inner screens inside the device viewport
function ScreenFadeInner({ children }) {
  const { localTime, duration } = useSprite();
  const outStart = Math.max(0, duration - 0.4);
  let opacity = 1, tx = 0;
  if (localTime < 0.4) { const k = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1)); opacity = k; tx = (1 - k) * 40; }
  else if (localTime > outStart) { const k = Easing.easeInCubic(clamp((localTime - outStart) / 0.4, 0, 1)); opacity = 1 - k; tx = -k * 40; }
  return <div style={{ position: 'absolute', inset: 0, opacity, transform: `translateX(${tx}px)`, willChange: 'transform, opacity' }}>{children}</div>;
}

// ── captions layer (gated sprites) ──────────────────────────────────
function Captions() {
  return (
    <>
      <Sprite start={3.0} end={5.7}>
        <Caption top={1530} lines={[[{ t: 'Engineered ' }, { t: '+', c: TEAL }, { t: ' marketed.' }]]} sub="One person. Full-stack growth." />
      </Sprite>
      <Sprite start={5.75} end={10.0}>
        <Caption top={1530} lines={[[{ t: 'Instant ROI ' }, { t: 'projections', c: TEAL }], [{ t: 'live on the site.' }]]} />
      </Sprite>
      <Sprite start={10.05} end={12.8}>
        <Caption top={1530} lines={[[{ t: 'A/B test my site ' }], [{ t: 'yourself.', c: AMBER }]]} sub="Interactive proof, not promises." />
      </Sprite>
    </>
  );
}

// ── SCENE 5 · CTA ───────────────────────────────────────────────────
function CtaScene() {
  const t = useTime();
  const base = 12.85;
  const headK = animate({ from: 0, to: 1, start: base + 0.3, end: base + 0.9, ease: Easing.easeOutBack })(t);
  const statsK = animate({ from: 0, to: 1, start: base + 0.7, end: base + 1.2, ease: Easing.easeOutCubic })(t);
  const btnK = animate({ from: 0, to: 1, start: base + 1.0, end: base + 1.5, ease: Easing.easeOutBack })(t);
  const stats = [['$10M+', 'Ad spend'], ['300+', 'Clients'], ['3×', 'Lead growth']];
  return (
    <SceneFade fadeIn={0.4} fadeOut={0.01} scaleFrom={1.04} style={{ background: BG }}>
      <GridBg />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <LogoRing size={170} t0={base + 0.05} />
        <div style={{ opacity: headK, transform: `translateY(${(1 - headK) * 26}px)`, marginTop: 54, textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 90, lineHeight: 1.06,
            color: FG, letterSpacing: '-0.03em' }}>Let's grow<br />your <span style={{ color: TEAL }}>traffic.</span></div>
        </div>
        <div style={{ opacity: statsK, display: 'flex', gap: 44, marginTop: 56 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 56, color: TEAL }}>{s[0]}</div>
              <div style={{ fontFamily: SANS, fontSize: 24, color: FG3, marginTop: 8 }}>{s[1]}</div>
            </div>
          ))}
        </div>
        <div style={{ opacity: btnK, transform: `scale(${0.9 + 0.1 * btnK})`, marginTop: 66 }}>
          <div style={{ fontFamily: MONO, fontSize: 38, fontWeight: 700, color: '#fff', background: TEAL,
            padding: '28px 56px', borderRadius: 16, boxShadow: '0 18px 44px oklch(52% 0.14 195 / 0.4)' }}>Book a consultation →</div>
        </div>
        <div style={{ opacity: btnK, marginTop: 40, fontFamily: MONO, fontSize: 34, fontWeight: 600,
          color: FG2, letterSpacing: '0.02em' }}>syedwajeehulhassan.com</div>
      </div>
    </SceneFade>
  );
}

Object.assign(window, {
  HookScene, ServicesScreen, EstimatorScreen, ABScreen, DeviceSpan, ScreenFadeInner,
  Captions, CtaScene, GridBg, Icon,
});
