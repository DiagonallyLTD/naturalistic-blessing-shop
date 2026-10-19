// Netlify Function: creates ONE Stripe Checkout Session for the whole basket.
// Env var required in Netlify: STRIPE_SECRET_KEY (sk_live_... or sk_test_...)
// Prices are set HERE on the server so they can't be changed in the browser.

const TIERS = { essential: { name: 'Essential', usd: 15 }, deeper: { name: 'Deeper', usd: 50 }, ritual: { name: 'Full Ritual', usd: 150 } };
const PRODUCTS = {
  'advice-reading': 'Single Advice Reading', 'confession': 'Confession Spell', 'custom': 'Custom Spell', 'weather-day': 'Weather Spell',
  'contact-me': 'Contact Me Love Spell', 'intimate': 'Intimate Sex Spell', 'obsession': 'Powerful Obsession Spell',
  'regret': 'Powerful Regret Spell', 'karmic-soul-binding': 'Karmic Soul Binding Spell',
  'negative-energy-cleanse': 'Negative Energy Cleanse Spell', 'glamour-magick': 'Glamour Magick Spell',
  'make-a-wish': 'Make a Wish Spell', 'inner-radiance': 'Inner Radiance Self Love Spell',
  'soulmate-attraction': 'Soulmate Attraction Spell', 'road-opener': 'Road Opener Spell',
  'wealthy-prosperity': 'Wealthy Prosperity Spell', 'cord-cutting': 'Cord Cutting Ceremony Spell',
  'thought-implantation': 'Thought Implantation Ritual Spell'
};
const clip = (s, n) => String(s || '').slice(0, n);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (e) { return { statusCode: 400, body: 'Bad JSON' }; }
  const items = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
  if (!items.length) return { statusCode: 400, body: 'Basket is empty' };

  const origin = event.headers.origin || `https://${event.headers.host}`;
  const f = new URLSearchParams();
  f.append('mode', 'payment');
  f.append('success_url', `${origin}/Checkout.html?paid=1&session={CHECKOUT_SESSION_ID}`);
  f.append('cancel_url', `${origin}/Checkout.html`);
  if (body.email) f.append('customer_email', clip(body.email, 200));
  f.append('metadata[customer_name]', clip(body.name, 200));
  f.append('metadata[tiktok]', clip(body.tiktok, 100));
  f.append('metadata[country]', clip(body.country, 60));
  f.append('payment_intent_data[description]', 'Naturalistic Blessing Shop order');

  let n = 0;
  for (const it of items) {
    const name = PRODUCTS[it.slug], t = TIERS[it.tier] && (it.slug === 'advice-reading' && it.tier === 'ritual' ? { ...TIERS[it.tier], name: 'Full Reading' } : TIERS[it.tier]);
    if (!name || !t) return { statusCode: 400, body: `Unknown item: ${it.slug}/${it.tier}` };
    f.append(`line_items[${n}][quantity]`, '1');
    f.append(`line_items[${n}][price_data][currency]`, 'usd');
    f.append(`line_items[${n}][price_data][unit_amount]`, String(t.usd * 100));
    f.append(`line_items[${n}][price_data][product_data][name]`, `${name} · ${t.name}`);
    const desc = [it.forName && `For: ${it.forName}`, it.intent && `Intention: ${it.intent}`].filter(Boolean).join(' | ');
    if (desc) f.append(`line_items[${n}][price_data][product_data][description]`, clip(desc, 480));
    // Intake answers per item, visible on the payment in the Stripe dashboard
    f.append(`metadata[item_${n + 1}]`, clip(`${name} (${t.name})${desc ? ' | ' + desc : ''}`, 490));
    n++;
  }

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: f.toString()
  });
  const data = await r.json();
  if (!r.ok) return { statusCode: 502, body: JSON.stringify({ error: data.error && data.error.message }) };
  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: data.url }) };
};
