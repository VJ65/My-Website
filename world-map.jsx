// World map for About — fetches a public TopoJSON of countries, colors served markets.
const { useEffect, useState } = React;
const TOPO = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const NUM_TO_ISO2 = {"840":"US","124":"CA","484":"MX","076":"BR","170":"CO","032":"AR","152":"CL","604":"PE","218":"EC","826":"GB","372":"IE","250":"FR","276":"DE","724":"ES","620":"PT","380":"IT","528":"NL","056":"BE","756":"CH","040":"AT","752":"SE","578":"NO","208":"DK","246":"FI","616":"PL","203":"CZ","642":"RO","300":"GR","792":"TR","804":"UA","586":"PK","356":"IN","050":"BD","144":"LK","524":"NP","398":"KZ","784":"AE","682":"SA","634":"QA","414":"KW","048":"BH","512":"OM","400":"JO","818":"EG","504":"MA","566":"NG","404":"KE","710":"ZA","288":"GH","834":"TZ","392":"JP","410":"KR","702":"SG","458":"MY","360":"ID","764":"TH","704":"VN","608":"PH","036":"AU","554":"NZ"};

function project(lon, lat, W, H) {
  // equirectangular, clipped to ±60 lat for a tighter map
  const x = (lon + 180) / 360 * W;
  const y = (80 - lat) / 140 * H;
  return [x, y];
}
function ringPath(ring, W, H) {
  return ring.map((pt, i) => { const [x, y] = project(pt[0], pt[1], W, H); return (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }).join('') + 'Z';
}
function decodeTopo(topo) {
  const { scale, translate } = topo.transform;
  const arcs = topo.arcs.map(arc => { let x = 0, y = 0; return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * scale[0] + translate[0], y * scale[1] + translate[1]]; }); });
  const arcRing = (idxs) => { let out = []; idxs.forEach(i => { let a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; if (out.length) a = a.slice(1); out = out.concat(a); }); return out; };
  const geoms = topo.objects.countries.geometries;
  return geoms.map(g => {
    const polys = g.type === 'Polygon' ? [g.arcs] : g.arcs;
    return { id: g.id, rings: polys.map(p => p.map(arcRing)).flat() };
  });
}
function WorldMap({ served = [] }) {
  const [countries, setCountries] = useState(null);
  useEffect(() => { fetch(TOPO).then(r => r.json()).then(t => setCountries(decodeTopo(t))).catch(() => setCountries([])); }, []);
  const W = 1000, H = 389;
  const servedSet = new Set(served);
  const [lx, ly] = project(74.3436, 31.5497, W, H);
  return React.createElement('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'World map highlighting client markets', style: { width: '100%', height: 'auto', display: 'block' } },
    countries ? countries.map(c => React.createElement('path', {
      key: c.id, d: c.rings.map(r => ringPath(r, W, H)).join(''),
      fill: servedSet.has(NUM_TO_ISO2[c.id]) ? 'oklch(52% 0.14 195)' : 'oklch(88% 0.01 60)',
      stroke: 'oklch(98.5% 0.008 60)', strokeWidth: 0.6
    })) : React.createElement('text', { x: W / 2, y: H / 2, textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fill: 'oklch(62% 0.015 240)' }, 'Loading map…'),
    React.createElement('circle', { cx: lx, cy: ly, r: 10, fill: 'oklch(56% 0.14 65 / 0.3)' }),
    React.createElement('circle', { cx: lx, cy: ly, r: 5.5, fill: 'oklch(56% 0.14 65)', stroke: '#fff', strokeWidth: 2 })
  );
}
window.WorldMap = WorldMap;
