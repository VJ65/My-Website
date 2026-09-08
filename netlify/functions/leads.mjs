// ============================================================
//  Netlify Function: leads
//  POST /.netlify/functions/leads   → append a lead (PUBLIC — the
//        projection lead-magnet form on the service pages posts here)
//  GET  /.netlify/functions/leads   → return all collected leads
//        (requires the admin token — used by the dashboard's
//        "Collected emails" tab)
//
//  Storage uses Netlify Blobs (same mechanism as the content
//  function). Leads are shared across every visitor, so an email
//  captured on the live site shows up in the dashboard instantly.
//
//  SECURITY: reads require the header  x-admin-token  to match the
//  ADMIN_TOKEN env var (falls back to the dashboard's login hash).
//  Writes are intentionally public so the lead-capture form works
//  for anonymous visitors.
// ============================================================
import { getStore } from '@netlify/blobs';

const STORE = 'wjh-leads';
const KEY = 'list';
const DEFAULT_TOKEN = '2411275664774193';
const MAX_LEADS = 5000;

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

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export default async (req) => {
  if (req.method === 'OPTIONS') return json({ ok: true });

  let store;
  try {
    store = getStore(STORE);
  } catch (e) {
    return json({ leads: [], error: 'blobs-unavailable' });
  }

  if (req.method === 'GET') {
    const expected = process.env.ADMIN_TOKEN || DEFAULT_TOKEN;
    const token = req.headers.get('x-admin-token') || '';
    if (token !== expected) return json({ error: 'unauthorized' }, 401);
    const data = (await store.get(KEY, { type: 'json' })) || { leads: [] };
    return json({ leads: Array.isArray(data.leads) ? data.leads : [] });
  }

  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); }
    catch (e) { return json({ error: 'invalid-json' }, 400); }

    const email = str(body.email, 200);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: 'invalid-email' }, 400);
    }
    const lead = {
      name: str(body.name, 120),
      email,
      service: str(body.service, 60),
      type: str(body.type, 60),
      summary: str(body.summary, 600),
      page: str(body.page, 300),
      ts: str(body.ts, 40) || new Date().toISOString()
    };

    const data = (await store.get(KEY, { type: 'json' })) || { leads: [] };
    const leads = Array.isArray(data.leads) ? data.leads : [];
    leads.push(lead);
    // Keep the store bounded.
    const trimmed = leads.slice(-MAX_LEADS);
    await store.setJSON(KEY, { leads: trimmed, updatedAt: new Date().toISOString() });
    return json({ ok: true, count: trimmed.length });
  }

  return json({ error: 'method-not-allowed' }, 405);
};
