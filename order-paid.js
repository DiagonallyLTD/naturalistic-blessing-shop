// Netlify Function: Stripe webhook → emails Emily a clean order summary after every paid order.
// Stripe Dashboard → Developers → Webhooks → Add endpoint:
//   URL:    https://YOUR-DOMAIN/.netlify/functions/order-paid
//   Event:  checkout.session.completed
// Env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET (whsec_...),
//           RESEND_API_KEY (free at resend.com), ORDER_EMAIL_TO (e.g. shop@naturalisticblessing.com),
//           ORDER_EMAIL_FROM (a verified sender on Resend, e.g. orders@naturalisticblessing.com)
// If RESEND_API_KEY is not set, the order is just logged (Netlify → Functions → order-paid → Logs).

const crypto = require('crypto');

function verify(raw, header, secret) {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')));
  const expected = crypto.createHmac('sha256', secret).update(`${parts.t}.${raw}`).digest('hex');
  const ok = parts.v1 && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1));
  const fresh = Math.abs(Date.now() / 1000 - Number(parts.t)) < 300;
  return ok && fresh;
}
const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

exports.handler = async (event) => {
  const raw = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
  if (!verify(raw, event.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET)) return { statusCode: 400, body: 'Bad signature' };
  const evt = JSON.parse(raw);
  if (evt.type !== 'checkout.session.completed') return { statusCode: 200, body: 'ignored' };

  const s = evt.data.object, m = s.metadata || {};
  const items = Object.keys(m).filter(k => k.startsWith('item_')).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map(k => m[k]);
  const total = (s.amount_total / 100).toFixed(2);
  const email = (s.customer_details && s.customer_details.email) || s.customer_email || '';

  const text = [`New order — $${total} USD`, `Name: ${m.customer_name}`, `Email: ${email}`, `TikTok: ${m.tiktok}`, `Country: ${m.country}`, '', ...items.map((t, i) => `${i + 1}. ${t}`), '', `Stripe session: ${s.id}`].join('\n');
  console.log(text);

  if (process.env.RESEND_API_KEY) {
    const html = `<div style="font-family:Georgia,serif;color:#2e2015"><h2 style="font-weight:500">New order · $${total}</h2><p><b>${esc(m.customer_name)}</b><br>${esc(email)}<br>TikTok: ${esc(m.tiktok)}<br>${esc(m.country)}</p><ol>${items.map(t => `<li style="margin-bottom:8px">${esc(t)}</li>`).join('')}</ol><p style="color:#6e5a47;font-size:13px">Stripe session ${esc(s.id)}</p></div>`;
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.ORDER_EMAIL_FROM, to: process.env.ORDER_EMAIL_TO, reply_to: email || undefined, subject: `New order · ${m.customer_name || 'customer'} · $${total}`, text, html })
    });
  }
  return { statusCode: 200, body: 'ok' };
};
