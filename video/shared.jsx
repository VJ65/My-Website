// shared.jsx — brand tokens + reusable bits for the demo video
// Exports to window at the bottom. Loaded after animations.jsx.

const TEAL   = 'oklch(52% 0.14 195)';
const TEALD  = 'oklch(43% 0.15 195)';
const TEALL  = 'oklch(94% 0.04 195)';
const TEALDIM= 'oklch(52% 0.14 195 / 0.12)';
const AMBER  = 'oklch(68% 0.14 65)';
const AMBERL = 'oklch(95% 0.04 65)';
const BG     = 'oklch(98.5% 0.008 60)';
const BG2    = 'oklch(96% 0.012 60)';
const FG     = 'oklch(18% 0.02 240)';
const FG2    = 'oklch(42% 0.02 240)';
const FG3    = 'oklch(62% 0.015 240)';
const BORDER = 'oklch(88% 0.01 60)';
const INK    = 'oklch(22% 0.03 240)'; // deep navy for premium dark scenes
const INK2   = 'oklch(16% 0.03 245)';
const MONO   = "'JetBrains Mono', monospace";
const SANS   = "'Plus Jakarta Sans', sans-serif";

const BRAND = { TEAL, TEALD, TEALL, TEALDIM, AMBER, AMBERL, BG, BG2, FG, FG2, FG3, BORDER, INK, INK2, MONO, SANS };

// ── Animated counter ────────────────────────────────────────────────
// Reads global time; counts from->to between start..end (abs seconds).
function CountUp({ from = 0, to = 100, start, end, format }) {
  const t = useTime();
  const v = animate({ from, to, start, end, ease: Easing.easeOutCubic })(t);
  return <>{format ? format(v) : Math.round(v)}</>;
}

// ── SceneFade ───────────────────────────────────────────────────────
// Wrap a scene's content. Fades + gently scales on entry/exit using the
// enclosing Sprite's progress window. fadeIn/fadeOut in seconds.
function SceneFade({ fadeIn = 0.5, fadeOut = 0.5, scaleFrom = 1.04, children, style }) {
  const { localTime, duration } = useSprite();
  const outStart = Math.max(0, duration - fadeOut);
  let opacity = 1, scale = 1;
  if (localTime < fadeIn) {
    const k = Easing.easeOutCubic(clamp(localTime / fadeIn, 0, 1));
    opacity = k; scale = scaleFrom + (1 - scaleFrom) * k;
  } else if (localTime > outStart) {
    const k = Easing.easeInCubic(clamp((localTime - outStart) / fadeOut, 0, 1));
    opacity = 1 - k; scale = 1 - 0.03 * k;
  }
  return (
    <div style={{ position: 'absolute', inset: 0, opacity, transform: `scale(${scale})`,
      transformOrigin: 'center', willChange: 'transform, opacity', ...style }}>
      {children}
    </div>
  );
}

// ── Caption (lower third) ───────────────────────────────────────────
// Big punchy caption for the device scenes. parts = array of {t, c} for
// colored runs; or pass plain `lines`.
function Caption({ top = 1500, lines, sub }) {
  const { localTime } = useSprite();
  const inK = Easing.easeOutBack(clamp(localTime / 0.5, 0, 1));
  const ty = (1 - clamp(localTime / 0.5, 0, 1)) * 26;
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, top,
      textAlign: 'center', opacity: clamp(localTime / 0.4, 0, 1),
      transform: `translateY(${ty}px)`, willChange: 'transform, opacity' }}>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 62, lineHeight: 1.12,
        color: FG, letterSpacing: '-0.02em', textWrap: 'balance' }}>
        {lines.map((ln, i) => (
          <div key={i} style={{ transform: `scale(${0.96 + 0.04 * inK})`, transformOrigin: 'center' }}>
            {ln.map((run, j) => (
              <span key={j} style={{ color: run.c || FG }}>{run.t}</span>
            ))}
          </div>
        ))}
      </div>
      {sub && (
        <div style={{ marginTop: 18, fontFamily: SANS, fontSize: 30, color: FG2, fontWeight: 500 }}>{sub}</div>
      )}
    </div>
  );
}

// ── Brand watermark (top) ───────────────────────────────────────────
function Watermark() {
  return (
    <div style={{ position: 'absolute', top: 70, left: 64, display: 'flex',
      alignItems: 'center', gap: 12, zIndex: 50 }}>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, color: TEAL,
        letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 8 }}>
        SWH<span style={{ width: 9, height: 9, borderRadius: '50%', background: AMBER, display: 'inline-block' }}></span>
      </div>
    </div>
  );
}

// ── Logo ring (SWH monogram) ────────────────────────────────────────
function LogoRing({ size = 240, t0 = 0 }) {
  const t = useTime();
  const draw = animate({ from: 0, to: 1, start: t0, end: t0 + 0.9, ease: Easing.easeInOutCubic })(t);
  const pop = animate({ from: 0.6, to: 1, start: t0 + 0.2, end: t0 + 0.9, ease: Easing.easeOutBack })(t);
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={TEALL} strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={TEAL} strokeWidth="4"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - draw)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <circle cx={size / 2 + r * Math.cos(2 * Math.PI * draw - Math.PI / 2)}
          cy={size / 2 + r * Math.sin(2 * Math.PI * draw - Math.PI / 2)} r="7" fill={AMBER} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', transform: `scale(${pop})` }}>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: size * 0.3, color: TEAL,
          letterSpacing: '-0.04em' }}>SWH</span>
      </div>
    </div>
  );
}

// ── Browser frame ───────────────────────────────────────────────────
// Persistent device shell. Children render inside the viewport.
function BrowserFrame({ x = 90, y = 232, w = 900, h = 1232, children }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h,
      background: '#fff', borderRadius: 34, border: `1px solid ${BORDER}`,
      boxShadow: '0 40px 90px oklch(18% 0.02 240 / 0.18)', overflow: 'hidden' }}>
      {/* chrome */}
      <div style={{ height: 88, background: BG2, borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16 }}>
        <div style={{ display: 'flex', gap: 9 }}>
          <span style={{ width: 15, height: 15, borderRadius: '50%', background: '#ff5f57' }}></span>
          <span style={{ width: 15, height: 15, borderRadius: '50%', background: '#febc2e' }}></span>
          <span style={{ width: 15, height: 15, borderRadius: '50%', background: '#28c840' }}></span>
        </div>
        <div style={{ flex: 1, height: 50, borderRadius: 25, background: '#fff',
          border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 10, fontFamily: MONO, fontSize: 24, color: FG2 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.4"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          syedwajeehulhassan.com
        </div>
      </div>
      <div style={{ position: 'relative', width: '100%', height: h - 88, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  BRAND, TEAL, TEALD, TEALL, TEALDIM, AMBER, AMBERL, BG, BG2, FG, FG2, FG3, BORDER, INK, INK2, MONO, SANS,
  CountUp, SceneFade, Caption, Watermark, LogoRing, BrowserFrame,
});
