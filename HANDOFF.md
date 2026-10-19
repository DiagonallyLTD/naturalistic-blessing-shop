# Naturalistic Blessing Shop: tech handoff

## How it fits together (Stripe basket + Stan profile)
- **This site** = the shop. Visitors build one basket and pay **once** for everything.
- **Stripe Checkout** takes the payment (one session, many line items). The serverless function is in `netlify/functions/create-checkout.js`.
- **Stan Store** (https://stan.store/naturalisticblessing) stays as Emily's link-in-bio / profile and links to this site. It is not used for basket payments, because Stan checks out one product at a time.

```
Visitor → this site (browse, choose option, basket) → ONE Stripe Checkout → back to Checkout.html?paid=1 (thank-you)
```

## Setup (about 20 minutes)
1. **Stripe:** create or verify the company account (business details, bank account, payouts in USD). Copy the **test** secret key (Developers → API keys).
2. **Netlify:** deploy the `site/` folder (drag-and-drop at app.netlify.com/drop, or connect Git). `netlify.toml` already points at the functions folder. No npm install is needed, because the functions use only built-in Node APIs.
3. **Env vars:** copy them from `.env.example` into Netlify → Site settings → Environment variables, then redeploy.
4. **Test:** add 2+ items, check out with card `4242 4242 4242 4242` (any future date, any CVC), and confirm you land on the thank-you page.
5. **Order emails (optional, recommended):** add a Stripe webhook → `https://YOUR-DOMAIN/.netlify/functions/order-paid`, event `checkout.session.completed`. Paste its `whsec_` secret into `STRIPE_WEBHOOK_SECRET`. Create a free Resend account, verify the domain, and add `RESEND_API_KEY`, `ORDER_EMAIL_TO` and `ORDER_EMAIL_FROM`. Emily then gets one tidy email per order with every item, who it's for, the intention, and the TikTok handle.
6. **Go live:** swap `sk_test_` for `sk_live_`, create a live-mode webhook (it has a different `whsec_`), and redeploy.
7. **Domain:** in Netlify → Domain management, add naturalisticblessing.com. HTTPS is automatic.
8. **Stripe emails:** Settings → Emails → turn on successful-payment receipts. Add to the receipt footer: "I can't reach out to you, please message me on TikTok @naturalisticblessingshop for your report."
9. **Stan:** at stan.store/naturalisticblessing, add a Link button to the website.

## Files added for the backend
| File | Purpose |
|---|---|
| `netlify/functions/create-checkout.js` | Builds one Stripe Checkout Session for the whole basket. Prices are locked server-side. |
| `netlify/functions/order-paid.js` | Webhook. Verifies Stripe's signature, then emails Emily the order summary (or logs it). |
| `.env.example` | Every environment variable needed, with placeholders. |
| `netlify.toml` | Publish + functions config. |
| `_headers` | Long caching for images/CSS/JS, basic security headers. |
| `robots.txt` | Keeps the checkout page out of search results. |

## Troubleshooting
- **"Checkout isn't connected yet"** on the live site: `STRIPE_SECRET_KEY` is missing, or the site wasn't redeployed after adding it. Check Netlify → Functions → create-checkout → Logs.
- **Webhook 400 "Bad signature":** the `whsec_` secret is from the wrong mode (test vs live) or the wrong endpoint.
- **Old styles after a deploy:** bump the `?v=` number on the css/js tags in every HTML file. `_headers` caches them for a year.
- **Refunds/disputes:** handled entirely in the Stripe dashboard. No code needed.

## Optional extras for later
- Apple Pay / Google Pay: enable them in Stripe → Settings → Payment methods. Checkout shows them automatically.
- Discount codes: create Promotion codes in Stripe, then add `f.append('allow_promotion_codes','true')` in create-checkout.js.
- Sales tax: turn on Stripe Tax, then add `f.append('automatic_tax[enabled]','true')`.

## Where order details show
Each Stripe payment's **metadata** has customer_name, tiktok, country and item_1…item_n (product, option, who it's for, intention). Each line item also carries the same text in its description.

## Prices
Set on the server in `create-checkout.js → TIERS` (Essential $15, Deeper $50, Full Ritual $150), so the browser can't change them. If you change prices, also update `TIERS` in `site.js` (display only).

## Files
| File | Purpose |
|---|---|
| `stan-config.js` | Shop settings: `mode` ('stripe' / 'stan' / 'demo'), checkout endpoint, Stan profile URL. |
| `netlify/functions/create-checkout.js` | Serverless function that creates the Stripe Checkout Session. |
| `site.js` | Catalog (`SPELLS`), options (`TIERS`), basket, currency estimates, carousel, Stan handoff. |
| `site.css` | All styling. |
| `Home / Spells / Spell / About / Checkout.html` | Pages. `Spell.html?s=<slug>` renders any product. |
| `img/` | Listing images (800×800 JPG). |

## Setup checklist
1. In Stan, create **one product per spell and per option** (17 listings × 3 options = 51), *or* one product per spell with options if your Stan plan supports that. Prices: **Essential $15, Deeper $50, Full Ritual $150**.
2. Add these **custom checkout questions** to every Stan product (the site doesn't collect them when `intakeOnSite: false`):
   - Your full name
   - Your TikTok handle
   - Who is this for? (spells only, optional)
   - Your intention / what you'd like guidance on
3. Paste each product's Stan link into `stan-config.js → products[slug][option]`.
4. Set `storeUrl` to the Stan profile (fallback for any blank link).
5. Turn on Stan's confirmation email with the TikTok instruction: *"I can't reach out to you, please message me on TikTok @naturalisticblessingshop for your report."*
6. Bump the `?v=` number on the `site.css`, `site.js` and `stan-config.js` script/link tags in every HTML file after each deploy (cache-busting).

## Slugs (keys in `stan-config.js`)
advice-reading, confession, custom, contact-me, intimate, obsession, regret, karmic-soul-binding, negative-energy-cleanse, glamour-magick, make-a-wish, inner-radiance, soulmate-attraction, road-opener, wealthy-prosperity, cord-cutting, thought-implantation

Option keys: `essential` ($15), `deeper` ($50), `ritual` ($150).

## Behaviour notes
- **Basket:** stored in `localStorage` (`nb-cart`). Stan checks out one product at a time, so the Checkout page lists each item with its own "Pay on Stan" button. Items are marked "Opened ✓" once clicked (`nb-paid`), and "clear my basket" resets both.
- **Currency:** everything is charged in USD. The nav selector shows *estimates* using the fixed rates in `site.js → CUR`. Update them now and then or swap in a rates API.
- **Analytics:** `add_to_cart` and `begin_checkout` events are pushed to `window.dataLayer`, ready for Google Tag Manager / GA4. Add the GTM snippet to each page `<head>`.
- **Hero video:** Pexels sources are listed in `site.js → hero()`. Self-host the chosen MP4 for speed and set it with `data-video="/video/sea.mp4"` on `<header class="hero">`.
- **Images:** the Sea / Earth / Herb photos are hotlinked from Pexels. Download them and serve them locally before launch.
- **Preview mode:** set `mode: 'demo'` to use the fake on-site checkout for design reviews.

## Content still to supply
- Final spell descriptions (current copy is placeholder written for layout)
- Real testimonials (current ones are sample copy)
- Photo of Emily (About page placeholder)
