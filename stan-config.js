/* Shop settings — the only file the tech team needs to edit.
   mode:
     'stripe' — one basket, one payment for everything via Stripe Checkout (recommended).
                Needs netlify/functions/create-checkout.js deployed + STRIPE_SECRET_KEY set in Netlify.
     'stan'   — each item checks out separately on its own Stan product link (fallback).
     'demo'   — fake on-site checkout for design previews only. */
window.STAN = {
  mode: 'stripe',
  checkoutEndpoint: '/.netlify/functions/create-checkout',
  storeUrl: 'https://stan.store/naturalisticblessing',
  intakeOnSite: true,
  openInNewTab: false,
  products: {}
};
