# Naturalistic Blessing Shop

*Blessing you, Naturally. Love, Emily*

The website for Naturalistic Blessing Shop: natural spell castings and advice readings by Emily, made with moonlit seawater, earth and herbs. Customers fill one basket and pay for everything at once through Stripe. The site links to the Stan store at [stan.store/naturalisticblessing](https://stan.store/naturalisticblessing).

- **Contact:** TikTok [@naturalisticblessingshop](https://www.tiktok.com/@naturalisticblessingshop) · [shop@naturalisticblessing.com](mailto:shop@naturalisticblessing.com)
- **Business:** United States LLC · prices charged in USD

## Pages

| Page | File |
|---|---|
| Home (sea video hero, offerings, reviews) | `Home.html` |
| Spells (all 17 listings, filters, FAQ) | `Spells.html` |
| Single listing (`?s=slug`, e.g. `?s=weather-day`) | `Spell.html` |
| About Emily | `About.html` |
| Checkout and thank-you | `Checkout.html` |
| Phone preview of every page (design review only) | `Mobile Preview.html` |

## How it's built

Plain HTML, CSS and JavaScript. There's no build step, framework or `npm install`.

```
├── Home.html / Spells.html / Spell.html / About.html / Checkout.html
├── site.css              # all styles (fonts: Cormorant Garamond, Poppins, Playfair Display, Pinyon Script)
├── site.js               # listings data, header/footer, basket, currency switcher, animations
├── stan-config.js        # shop settings: checkout mode, Stan store URL
├── img/                  # listing photos and Emily's photos
├── netlify/functions/
│   ├── create-checkout.js  # makes one Stripe Checkout for the whole basket (prices locked server-side)
│   └── order-paid.js       # Stripe webhook that emails Emily each order summary
├── netlify.toml          # Netlify config (publish folder, functions, / → Home.html)
├── _headers              # caching and security headers
├── robots.txt
├── .env.example          # every environment variable needed
└── HANDOFF.md            # full setup guide for the tech team
```

## Run it locally

Open `Home.html` in a browser. Checkout won't work locally unless you use the Netlify CLI with your Stripe test key:

```bash
npx netlify-cli dev
```

## Deploy (Netlify + Stripe)

1. In Netlify, choose **Add new site → Import from GitHub** and pick this repo. No build command is needed.
2. Under **Site settings → Environment variables**, add the values from `.env.example`. At minimum this is `STRIPE_SECRET_KEY`.
3. Test with card `4242 4242 4242 4242` (any future date, any CVC).
4. For order emails, add a Stripe webhook pointing to `/.netlify/functions/order-paid` with the event `checkout.session.completed`.
5. To go live, swap in the live Stripe key and live webhook secret, then connect `naturalisticblessing.com` in Netlify.

See **[HANDOFF.md](HANDOFF.md)** for the full step-by-step guide and troubleshooting.

## Common edits

- **Prices:** Essential $15 / Deeper $50 / Full Ritual $150. Change them in **both** `site.js` (`TIERS`) and `netlify/functions/create-checkout.js` (`TIERS`). The server copy is what customers are actually charged.
- **Add a listing:** add an entry to `SPELLS` in `site.js`, add its name to `PRODUCTS` in `create-checkout.js`, and put the photo in `img/`.
- **Checkout mode:** `mode` in `stan-config.js`. `stripe` means one basket (recommended), `stan` sends each item to its own Stan product link, and `demo` is a fake checkout for previews.
- **After changing CSS/JS:** bump the `?v=` number on the `site.css` / `site.js` tags in every HTML file so browsers load the new version.

## Customer reports

Emily cannot reach out to customers first. After ordering, customers message her on TikTok @naturalisticblessingshop to receive their report. Replies are Monday to Friday and slower on weekends.

---

© Naturalistic Blessing Shop LLC. All rights reserved.
