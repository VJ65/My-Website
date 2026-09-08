// ============================================================
//  Netlify Function: feedback
//  POST   /.netlify/functions/feedback  → append blog feedback
//         (PUBLIC — the "Was this helpful?" form on blog posts
//          posts here)
//  GET    /.netlify/functions/feedback  → return all feedback
//         (admin token required — dashboard "Feedback" tab)
//  DELETE /.netlify/functions/feedback?id=ID  → remove one entry
//         (admin token required — the dashboard remove button)
//
//  Storage uses Netlify Blobs, shared across all visitors, so blog
//  feedback from the live site appears in the dashboard.
// ============================================================
import { getStore } from '@netlify/blobs';

const STORE = 'wjh-feedback';
const KEY = 'list';
const DEFAULT_TOKEN = '2411275664774193';
const MAX_ITEMS = 5000;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
      'access-control-allow-headers': 'content-type, x-admin-token'
    }
  });

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isAdmin = (req) => (req.headers.get('x-admin-token') || '') === (process.env.ADMIN_TOKEN || DEFAULT_TOKEN);

export default async (req) => {
  if (req.method === 'OPTIONS') return json({ ok: true });

  let store;
  try { store = getStore(STORE); }
  catch (e) { return json({ feedback: [], error: 'blobs-unavailable' }); }

  if (req.method === 'GET') {
    if (!isAdmin(req)) return json({ error: 'unauthorized' }, 401);
    const data = (await store.get(KEY, { type: 'json' })) || { feedback: [] };
    return json({ feedback: Array.isArray(data.feedback) ? data.feedback : [] });
  }

  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); }
    catch (e) { return json({ error: 'invalid-json' }, 400); }

    const email = str(body.email, 200);
    const name = str(body.name, 120);
    if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: 'invalid-contact' }, 400);
    }
    const rating = Math.max(0, Math.min(5, parseInt(body.rating, 10) || 0));
    const helpful = body.helpful === 'up' ? 'up' : body.helpful === 'down' ? 'down' : '';
    const entry = {
      id: 'fb_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      postId: body.postId != null ? String(body.postId).slice(0, 40) : '',
      postTitle: str(body.postTitle, 200),
      name, email, helpful, rating,
      comment: str(body.comment, 2000),
      page: str(body.page, 300),
      ts: str(body.ts, 40) || new Date().toISOString()
    };
    const data = (await store.get(KEY, { type: 'json' })) || { feedback: [] };
    const list = Array.isArray(data.feedback) ? data.feedback : [];
    list.push(entry);
    const trimmed = list.slice(-MAX_ITEMS);
    await store.setJSON(KEY, { feedback: trimmed, updatedAt: new Date().toISOString() });
    return json({ ok: true, count: trimmed.length });
  }

  if (req.method === 'DELETE') {
    if (!isAdmin(req)) return json({ error: 'unauthorized' }, 401);
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return json({ error: 'missing-id' }, 400);
    const data = (await store.get(KEY, { type: 'json' })) || { feedback: [] };
    const list = (Array.isArray(data.feedback) ? data.feedback : []).filter(f => f.id !== id);
    await store.setJSON(KEY, { feedback: list, updatedAt: new Date().toISOString() });
    return json({ ok: true, count: list.length });
  }

  return json({ error: 'method-not-allowed' }, 405);
};
