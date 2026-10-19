/* Naturalistic Blessing Shop — shared data, header/footer, cart, currency, motion, sea sound */
(() => {
const IG = 'img/';
const SPELLS = [
  {slug:'advice-reading',name:'Single Advice Reading',cat:'Readings',art:true,blurb:'Guidance from what comes through when I work with your energy.',desc:'A reading for advice, from whatever comes through when I work with you. Sometimes my spirit guides show me, sometimes it is the symbols that keep appearing. I write down everything I receive and send it to you as a personal report.'},
  {slug:'confession',name:'Confession Spell',cat:'Love',blurb:'Encourages honesty and the truth to come forward.',desc:'For when something is being held back. This working opens the way for honest words and hidden feelings to be spoken.'},
  {slug:'custom',name:'Cast a Custom Spell',cat:'Custom',blurb:'Tell me what you need and I will build the working around you.',desc:'Your intention, your timing, your circumstances. This is where weather spells for weddings and special days live, along with anything that does not fit a listing.'},
  {slug:'weather-day',name:'Weather Spell',cat:'Custom',img:IG+'weather-day.jpg?v=2',blurb:'Clear, kind skies for your wedding or special day.',desc:'Tell me your date and your place and I will cast for sunshine. My weather spells are some of my most loved work, especially on wedding days and other special days, and they are why I’m known as Jaz’s Etsy Witch! The earlier you book, the more time I can give your skies.'},
  {slug:'contact-me',name:'Contact Me Love Spell',cat:'Love',blurb:'Opens the line of communication with someone on your mind.',desc:'A gentle working to bring a person\u2019s thoughts back toward you and encourage them to reach out.'},
  {slug:'intimate',name:'Intimate Sex Spell',cat:'Love',blurb:'Rekindles passion, closeness and physical connection.',desc:'For couples who want to bring warmth and desire back into their bond.'},
  {slug:'obsession',name:'Powerful Obsession Spell',cat:'Love',blurb:'Places you firmly at the centre of their thoughts.',desc:'A stronger love working for when you want to be the one they cannot stop thinking about.'},
  {slug:'regret',name:'Powerful Regret Spell',cat:'Love',blurb:'Helps someone feel the weight of what they let go.',desc:'For a person who walked away. This working brings their memory of you, and what they lost, to the surface.'},
  {slug:'karmic-soul-binding',name:'Karmic Soul Binding Spell',cat:'Love',blurb:'Strengthens a deep, karmic connection between two souls.',desc:'A binding for two people who feel fated to each other, drawing their paths and energies closer together.'},
  {slug:'negative-energy-cleanse',name:'Negative Energy Cleanse Spell',cat:'Cleanse',blurb:'Clears heavy, stuck or unwanted energy from you and your space.',desc:'A cleansing with moon-gathered seawater, earth and herbs to lift what has been weighing on you.'},
  {slug:'glamour-magick',name:'Glamour Magick Spell',cat:'Self',blurb:'Enhances your natural beauty, charm and presence.',desc:'A glamour working so others notice your light the moment you walk in.'},
  {slug:'make-a-wish',name:'Make a Wish Spell',cat:'Abundance',blurb:'One wish, set with intention and sent out to the universe.',desc:'Tell me your wish in your own words and I will cast it under the right moon.'},
  {slug:'inner-radiance',name:'Inner Radiance Self Love Spell',cat:'Self',blurb:'Restores confidence and a warm relationship with yourself.',desc:'A self-development working for self-worth, softness and confidence.'},
  {slug:'soulmate-attraction',name:'Soulmate Attraction Spell',cat:'Love',blurb:'Draws the right person toward you.',desc:'For when you are ready to meet your person. This working opens you up to aligned, lasting love.'},
  {slug:'road-opener',name:'Road Opener Spell',cat:'Abundance',blurb:'Clears blocks and opens new paths and opportunities.',desc:'For a fresh start, a new job, a move, or any season where you feel stuck.'},
  {slug:'wealthy-prosperity',name:'Wealthy Prosperity Spell',cat:'Abundance',blurb:'Invites abundance, money and steady growth.',desc:'A prosperity working rooted in the earth to ground and grow your finances.'},
  {slug:'cord-cutting',name:'Cord Cutting Ceremony Spell',cat:'Cleanse',blurb:'Releases attachments that no longer serve you.',desc:'A ceremony to cut energetic ties to a person, habit or past chapter so you can move forward lighter.'},
  {slug:'thought-implantation',name:'Thought Implantation Ritual Spell',cat:'Love',blurb:'Plants a chosen thought gently in someone\u2019s mind.',desc:'A ritual to place a specific idea or feeling with someone so it keeps returning to them.'}
];
SPELLS.forEach(s => { if (!s.art && !s.img) s.img = IG + s.slug + '.jpg'; });
const TIERS = [
  {id:'essential',name:'Essential',gbp:15,note:'A focused casting for one clear intention.'},
  {id:'deeper',name:'Deeper',gbp:50,note:'More time at my altar, with moonlit seawater, earth and herbs.'},
  {id:'ritual',name:'Full Ritual',gbp:150,note:'My most devoted casting. The most time I can give to your working.'}
];

const TIKTOK = 'https://www.tiktok.com/@naturalisticblessingshop';

const ls = (k, v) => { try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } };
let cart = ls('nb-cart') || [];
const CUR = {USD:{s:'$',r:1,n:'US dollar'},GBP:{s:'£',r:.75,n:'British pound'},EUR:{s:'€',r:.86,n:'Euro'},CAD:{s:'CA$',r:1.38,n:'Canadian dollar'},AUD:{s:'A$',r:1.52,n:'Australian dollar'},NZD:{s:'NZ$',r:1.68,n:'New Zealand dollar'}};
let cur = ls('nb-cur'); if (!CUR[cur]) cur = 'USD';
const fmt = v => cur === 'USD' ? '$' + v : '≈' + CUR[cur].s + Math.round(v * CUR[cur].r);
const bySlug = s => SPELLS.find(x => x.slug === s);
const ST = () => window.STAN || {mode:'demo', products:{}};
const stanUrl = (slug, t) => { const c = ST(); return ((c.products[slug] || {})[t]) || c.storeUrl || '#'; };
const goStan = (slug, t) => { const u = stanUrl(slug, t); track('begin_checkout', {item: slug, option: t, value: tier(t).gbp, currency: 'USD'}); if (ST().openInNewTab) window.open(u, '_blank', 'noopener'); else location.href = u; };
function track(ev, data) { window.dataLayer = window.dataLayer || []; window.dataLayer.push(Object.assign({event: ev}, data)); }
const tier = id => TIERS.find(t => t.id === id) || TIERS[0];
const RT = {essential:{name:'Essential',note:'A focused reading on one question or situation.'},deeper:{name:'Deeper',note:'More time with your energy and everything that comes through.'},ritual:{name:'Full Reading',note:'My most devoted reading. The most time I can give to you.'}};
const INFO = 'The working is the same at every level. The more you choose, the more time I can give.';
const infoBtn = (name, note) => `<span class="info" role="button" tabindex="0" aria-label="About ${name}" data-tip="${note} ${INFO}">i</span>`;
const tl = (slug, id) => { const t = tier(id); return slug === 'advice-reading' ? Object.assign({}, t, RT[t.id]) : t; };

const SPARK = (x, y, s) => `M${x} ${y-s}C${x+s*.07} ${y-s*.35} ${x+s*.35} ${y-s*.07} ${x+s} ${y}C${x+s*.35} ${y+s*.07} ${x+s*.07} ${y+s*.35} ${x} ${y+s}C${x-s*.07} ${y+s*.35} ${x-s*.35} ${y+s*.07} ${x-s} ${y}C${x-s*.35} ${y-s*.07} ${x-s*.07} ${y-s*.35} ${x} ${y-s}Z`;
const MARK = `<svg viewBox="0 0 60 84" fill="none" aria-hidden="true"><path class="draw" pathLength="1" style="--len:1" d="M30 4C14 4 6 22 6 40s9 36 24 36 24-18 24-36S46 4 30 4Z" stroke="currentColor" stroke-width="1.6"/><path class="twinkle pop" d="${SPARK(30,22,9)}" fill="currentColor"/><path class="pop" style="animation-delay:1.9s" d="M24 52A6 6 0 0 0 36 52A7.5 7.5 0 0 1 24 52Z" fill="currentColor"/><circle class="pop" style="animation-delay:2.1s" cx="30" cy="40" r="1.6" fill="currentColor"/></svg>`;
const ICON = {
  bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 9h16M4 15h16"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4V5Z"/></svg>'
};
const art = (s, sea) => {
  const w = s.name.replace(/ Spell$/, '').toUpperCase().split(' ');
  const mid = Math.ceil(w.length / 2);
  return `<div class="art${sea ? ' sea' : ''}"><svg viewBox="0 0 400 400" fill="none" aria-hidden="true"><text x="200" y="58" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="11" letter-spacing="5" fill="currentColor">NATURALISTIC BLESSING SHOP</text><path d="M200 92c-52 0-84 50-90 92M290 184c-6-42-38-92-90-92M108 236c6 52 44 94 82 102M210 338c38-8 76-50 82-102" stroke="currentColor"/><path d="${SPARK(200,124,14)}" fill="currentColor"/><text x="200" y="200" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="34" font-weight="500" letter-spacing="2" fill="currentColor">${w.slice(0, mid).join(' ')}</text><text x="200" y="232" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="18" letter-spacing="7" fill="currentColor">${w.slice(mid).join(' ')}</text><path d="M168 262h24M208 262h24" stroke="currentColor"/><path d="${SPARK(200,262,6)}" fill="currentColor"/><path d="M191 330A9 9 0 0 0 209 330A11 11 0 0 1 191 330Z" fill="currentColor"/></svg></div>`;
};
const media = s => s.art ? art(s) : `<img src="${s.img}" alt="${s.name} listing" loading="lazy" width="800" height="800">`;

function card(s) {
  return `<article class="pcard grow" data-cat="${s.cat}"><div class="pimg">${media(s)}<button class="qadd" data-add="${s.slug}" aria-label="Quick add ${s.name} to basket">${ICON.plus}</button></div><div class="pbody"><span class="pcat">${s.cat}</span><h3><a href="Spell.html?s=${s.slug}">${s.name}</a></h3><div class="prow"><span class="price">from <b data-gbp="15">${fmt(15)}</b></span><a class="pview" href="Spell.html?s=${s.slug}" tabindex="-1" aria-hidden="true">View ${ICON.arrow}</a></div></div></article>`;
}

/* ---------- chrome ---------- */
function chrome() {
  const page = document.body.dataset.page;
  const cur_ = p => page === p ? ' aria-current="page"' : '';
  document.body.insertAdjacentHTML('afterbegin', `
<header class="hdr" id="hdr"><a class="brand" href="Home.html" aria-label="Naturalistic Blessing Shop home">${MARK}<span><b>Naturalistic</b><small>Blessing Shop</small></span></a>
<nav class="links"><a href="Spells.html"${cur_('spells')}>Spells</a><a href="Spell.html?s=advice-reading"${cur_('reading')}>Advice Reading</a><a href="About.html"${cur_('about')}>About Emily</a></nav>
<div class="tools"><label class="cur-wrap"><span class="sr">Currency</span><select class="cur" id="curSel" aria-label="Currency">${Object.keys(CUR).map(k => '<option value="' + k + '"' + (k === cur ? ' selected' : '') + '>' + k + '</option>').join('')}</select></label><button class="icon-btn" id="cartBtn" aria-label="Open basket">${ICON.bag}<span class="count" id="count"></span></button><button class="icon-btn burger" id="burger" aria-label="Menu">${ICON.menu}</button></div></header>
<nav class="sheet" id="sheet"><button class="icon-btn close" id="sheetX" aria-label="Close menu">${ICON.x}</button><a href="Home.html">Home</a><a href="Spells.html">Spells</a><a href="Spell.html?s=advice-reading">Advice Reading</a><a href="About.html">About Emily</a><a href="Checkout.html">Basket</a><p class="sheet-foot">Message me on TikTok <a href="${TIKTOK}">@naturalisticblessingshop</a></p></nav>`);
  document.body.insertAdjacentHTML('beforeend', `
<footer class="ftr"><div class="wrap"><div class="ftr-top">
<div><p class="big"><span class="ftr-bless">Blessing you, Naturally<br></span><span class="script">Love, Emily</span></p></div>
<div><h4>Contact</h4><ul><li>TikTok <a href="${TIKTOK}">@naturalisticblessingshop</a></li><li><a href="mailto:shop@naturalisticblessing.com">shop@naturalisticblessing.com</a></li></ul><h4 class="ftr-faq-h">FAQ</h4><div class="ftr-faq"><details><summary>What’s the difference between the castings?</summary><p>The working is the same. Essential is a focused casting for one clear intention, Deeper gives more time at my altar with moonlit seawater, earth and herbs, and Full Ritual is my most devoted casting. The more you choose, the more time I can give to your casting.</p></details><details><summary>How do I get my report?</summary><p>I cannot reach out to you, so please message me on TikTok @naturalisticblessingshop after you order.</p></details><details><summary>How quickly is it done?</summary><p>Same day castings are available. I complete every casting as soon as I can.</p></details></div></div>
<div><h4>Hours</h4><p>Monday to Friday I will always try to reply. I am slower on weekends, and when my inbox is very full it can take me a little longer.</p></div>
<div><h4>Shop</h4><ul><li><a href="Spells.html">All spells</a></li><li><a href="Spell.html?s=advice-reading">Advice reading</a></li><li><a href="Spell.html?s=weather-day">Weather spells</a></li><li><a href="Spell.html?s=custom">Custom spells</a></li><li><a href="About.html">About Emily</a></li></ul></div>
</div><div class="ftr-bot"><span>© Naturalistic Blessing Shop · United States LLC</span><span>Charged in USD. Other currencies shown are estimates.</span></div></div></footer>
<div class="drawer" id="drawer" aria-hidden="true"><div class="scrim" data-close></div><aside class="panel" role="dialog" aria-label="Basket"><div class="panel-h"><h2>Your basket</h2><button class="icon-btn" data-close aria-label="Close basket">${ICON.x}</button></div><div class="lines" id="lines"></div><div class="panel-f" id="panelF"></div></aside></div>
<div class="toast" id="toast"></div>`);

  const hdr = $('#hdr');
  const onS = () => hdr.classList.toggle('solid', scrollY > (document.body.classList.contains('has-hero') ? innerHeight * .55 : 10));
  addEventListener('scroll', onS, {passive:true}); onS();
  $('#burger').onclick = () => $('#sheet').classList.add('open');
  $('#sheetX').onclick = () => $('#sheet').classList.remove('open');
  $('#curSel').onchange = e => { cur = e.target.value; ls('nb-cur', cur); refreshPrices(); if (cur !== 'USD') toast('Estimated in ' + CUR[cur].n + '. You\u2019ll be charged in USD.'); };
  $('#cartBtn').onclick = openCart;
  $('#drawer').addEventListener('click', e => { if (e.target.closest('[data-close]')) closeCart(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeCart(); $('#sheet').classList.remove('open'); } });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    e.preventDefault(); addToCart({slug:b.dataset.add, tier:'essential'});
    const lbl = b.classList.contains('qadd') ? '' : 'Add'; b.classList.add('done'); b.innerHTML = ICON.check + (lbl && 'Added'); setTimeout(() => { b.classList.remove('done'); b.innerHTML = ICON.plus + lbl; }, 1600);
  });
  document.addEventListener('click', e => { const i = e.target.closest('.info'); $$('.info.on').forEach(x => x !== i && x.classList.remove('on')); if (i) { e.preventDefault(); e.stopPropagation(); i.classList.toggle('on'); } }, true);
  document.addEventListener('keydown', e => { const i = e.target.closest && e.target.closest('.info'); if (i && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); i.classList.toggle('on'); } });
  $$('.t-name[data-info]').forEach(el => el.insertAdjacentHTML('beforeend', infoBtn(el.textContent, el.dataset.info)));
  renderCart(); refreshPrices();
}
const $ = (q, r = document) => r.querySelector(q);
const $$ = (q, r = document) => [...r.querySelectorAll(q)];

function refreshPrices() {
  $$('[data-gbp]').forEach(el => el.textContent = fmt(+el.dataset.gbp));
  renderCart();
}

/* ---------- cart ---------- */
const subtotal = () => cart.reduce((a, l) => a + tier(l.tier).gbp, 0);
function addToCart(line) {
  cart.push({...line, id: Date.now() + Math.random()}); ls('nb-cart', cart); renderCart();
  track('add_to_cart', {item: line.slug, option: line.tier, value: tier(line.tier).gbp, currency: 'USD'});
  const c = $('#count'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  toast(`${bySlug(line.slug).name.replace(/ Spell$/, '')} · ${tl(line.slug, line.tier).name} added`);
}
function removeLine(id) { cart = cart.filter(l => l.id !== id); ls('nb-cart', cart); renderCart(); document.dispatchEvent(new Event('cart')); }
function renderCart() {
  const c = $('#count'); if (!c) return;
  c.textContent = cart.length; c.classList.toggle('on', cart.length > 0);
  const L = $('#lines'), F = $('#panelF');
  if (!cart.length) { L.innerHTML = `<div class="empty"><p>Your basket is empty</p><a class="btn btn-gold" href="Spells.html">Browse spells</a></div>`; F.innerHTML = ''; return; }
  L.innerHTML = cart.map(lineHTML).join('');
  F.innerHTML = `<div class="tot"><span>Subtotal</span><b>${fmt(subtotal())}</b></div><a class="btn btn-gold btn-block" href="Checkout.html">Checkout ${ICON.arrow}</a><p class="fine">I cannot reach out to you. Message me on TikTok for your report.</p>`;
  $$('.rm', L).forEach(b => b.onclick = () => removeLine(+b.dataset.id));
}
function lineHTML(l) {
  const s = bySlug(l.slug), t = tl(l.slug, l.tier);
  return `<div class="line"><div class="thumb">${media(s)}</div><div><b>${s.name}</b><small>${t.name}${l.forName ? ' · for ' + esc(l.forName) : ''}</small><button class="rm" data-id="${l.id}">Remove</button></div><span class="lp">${fmt(t.gbp)}</span></div>`;
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function openCart() { $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); }
function closeCart() { const d = $('#drawer'); if (d) { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); } }
let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200); }

/* ---------- motion ---------- */
function motion() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {rootMargin:'0px 0px -8% 0px'});
  $$('.rise').forEach(el => io.observe(el));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  const tick = () => {
    raf = 0; const vh = innerHeight;
    $$('.grow').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) { if (r.top > vh) el.style.setProperty('--g', .8); return; }
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * .55)));
      el.style.setProperty('--g', (.8 + .2 * (1 - Math.pow(1 - p, 3))).toFixed(4));
    });
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(tick); };
  addEventListener('scroll', req, {passive:true}); addEventListener('resize', req); tick();
  NB.reflow = tick;
}

/* ---------- hero: video + motes + sea sound ---------- */
function hero() {
  const h = $('.hero'); if (!h) return;
  const v = $('video', h);
  const portrait = innerHeight > innerWidth;
  const list = portrait
    ? ['https://videos.pexels.com/video-files/15813178/15813178-hd_1080_1920_30fps.mp4','https://videos.pexels.com/video-files/15813178/15813178-uhd_2160_3840_30fps.mp4','https://videos.pexels.com/video-files/855633/855633-hd_1280_720_25fps.mp4']
    : ['https://videos.pexels.com/video-files/855633/855633-hd_1920_1080_25fps.mp4','https://videos.pexels.com/video-files/855633/855633-hd_1920_1080_50fps.mp4','https://videos.pexels.com/video-files/855633/855633-hd_1280_720_25fps.mp4','https://videos.pexels.com/video-files/15813178/15813178-hd_1080_1920_30fps.mp4'];
  const custom = h.dataset.video; if (custom) list.unshift(custom);
  let i = 0;
  const next = () => { if (i >= list.length) return; v.src = list[i++]; v.play().catch(() => {}); };
  v.addEventListener('error', next);
  v.addEventListener('playing', () => h.classList.add('video-on'));
  next();
  const m = $('.motes', h);
  if (m) m.innerHTML = Array.from({length:16}, () => `<i style="left:${Math.random()*100}%;--dx:${(Math.random()*80-40).toFixed(0)}px;animation-duration:${(9+Math.random()*10).toFixed(1)}s;animation-delay:${(Math.random()*10).toFixed(1)}s;transform:scale(${(.5+Math.random()).toFixed(2)})"></i>`).join('');
  const sf = $('.sifter', h);
  if (sf) {
    const items = SPELLS.filter(s => !s.art);
    sf.innerHTML = '<a class="sf-card" href="#"><span class="sf-img"></span><span class="sf-t"><small class="sf-cat"></small><b class="sf-name"></b><span class="sf-p">from <span data-gbp="15">' + fmt(15) + '</span> · tap to view</span></span></a><div class="sf-dots">' + items.map(() => '<i></i>').join('') + '</div>';
    const a = $('.sf-card', sf), im = $('.sf-img', sf), dots = $$('.sf-dots i', sf);
    items.forEach(s => { const p = new Image(); p.src = s.img; });
    let k = 0;
    const show = () => {
      const s = items[k]; a.classList.remove('in'); void a.offsetWidth;
      a.href = 'Spell.html?s=' + s.slug; im.style.backgroundImage = 'url(' + s.img + ')';
      $('.sf-cat', sf).textContent = s.cat; $('.sf-name', sf).textContent = s.name.replace(/ Spell$/, '');
      a.classList.add('in'); dots.forEach((d, i) => d.classList.toggle('on', i === k));
      k = (k + 1) % items.length;
    };
    show(); setInterval(show, 2600);
  }
}
let actx, master;
function sea() {
  const btns = $$('[data-sound]');
  if (!actx) {
    actx = new (window.AudioContext || window.webkitAudioContext)();
    const len = actx.sampleRate * 6, buf = actx.createBuffer(2, len, actx.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch); let last = 0; for (let k = 0; k < len; k++) { last = (last + .02 * (Math.random() * 2 - 1)) / 1.02; d[k] = last * 3.2; } }
    const src = actx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700;
    const swell = actx.createGain(); swell.gain.value = .55;
    const lfo = actx.createOscillator(); lfo.frequency.value = .11;
    const lg = actx.createGain(); lg.gain.value = .45; lfo.connect(lg).connect(swell.gain);
    const lfo2 = actx.createOscillator(); lfo2.frequency.value = .07; const lg2 = actx.createGain(); lg2.gain.value = 380; lfo2.connect(lg2).connect(lp.frequency);
    master = actx.createGain(); master.gain.value = 0;
    src.connect(lp).connect(swell).connect(master).connect(actx.destination);
    src.start(); lfo.start(); lfo2.start();
  }
  const on = !btns[0].classList.contains('on');
  actx.resume();
  master.gain.cancelScheduledValues(actx.currentTime);
  master.gain.setTargetAtTime(on ? .7 : 0, actx.currentTime, .6);
  btns.forEach(b => { b.classList.toggle('on', on); $('.lbl', b).textContent = on ? 'Sea sound on' : 'Play the sea'; });
}

/* ---------- page renderers ---------- */
function grid(el, items) { el.innerHTML = items.map(card).join(''); NB.reflow && NB.reflow(); }

function spellPage(root) {
  const slug = new URLSearchParams(location.search).get('s') || 'confession';
  const s = bySlug(slug) || SPELLS[1];
  document.title = s.name + ' — Naturalistic Blessing Shop';
  if (s.slug === 'advice-reading') document.body.dataset.page = 'reading';
  const isReading = s.slug === 'advice-reading';
  root.innerHTML = `
<div class="wrap pd">
 <div class="pd-left"><div class="pd-media">${media(s)}</div>
 <div class="pd-desc"><span class="eyebrow">About this ${isReading ? 'reading' : 'spell'}</span><p class="lede">${s.desc}</p>
  <ol class="steps"><li><i>1</i><span>Choose your ${isReading ? 'reading' : 'casting'} and check out.</span></li><li><i>2</i><span>I complete every ${isReading ? 'reading' : 'casting'} as soon as I can, working with earth, sea and herbs.</span></li><li><i>3</i><span>Message me on TikTok and I’ll send your report.</span></li></ol>
  <details class="more"><summary>How the three ${isReading ? 'readings' : 'castings'} differ</summary><p>${isReading ? 'Every option is the same reading. The price reflects how much time I can give to you, from a focused Essential to my most devoted Full Reading.' : 'Every option is the same working. The price reflects how much time I can give to your casting, from a focused Essential to my most devoted Full Ritual.'}</p></details>
  <details class="more"><summary>Timing</summary><p>Same day castings are available. Replies are Monday to Friday and a little slower on weekends.</p></details>
 </div></div>
 <form class="pd-info" id="buy">
  <div class="crumb"><a href="Spells.html">Spells</a> / ${s.cat}</div>
  <h1>${s.name}</h1>
  <fieldset class="opts" style="border:0;padding:0;margin:0"><legend class="eyebrow" style="margin-bottom:10px">Choose your ${isReading ? 'reading' : 'casting'}</legend>
   ${TIERS.map(t => tl(s.slug, t.id)).map((t, i) => `<label class="opt"><input type="radio" name="tier" value="${t.id}"${i === 0 ? ' checked' : ''}><span class="dot"></span><b>${t.name}${infoBtn(t.name, t.note)}</b><span class="op" data-gbp="${t.gbp}">${fmt(t.gbp)}</span><small>${t.note}</small></label>`).join('')}
  </fieldset>
  <div class="fields two">
   <div class="field"><label for="f1">Your full name</label><input class="input" id="f1" name="you" autocomplete="name" required></div>
   <div class="field"><label for="f2">Your TikTok handle</label><input class="input" id="f2" name="tiktok" placeholder="@" required><small>So I can match your report when you message me.</small></div>
  </div>
  ${s.slug === 'weather-day' ? `<div class="field"><label for="f5">Date and place of your day</label><input class="input" id="f5" name="forName" placeholder="e.g. 14 June, Charleston SC" required></div>` : isReading ? '' : `<div class="field"><label for="f3">Who is this for? (optional)</label><input class="input" id="f3" name="forName" placeholder="Name of the person, or 'myself'"></div>`}
  <div class="field"><label for="f4">${isReading ? 'What would you like guidance on?' : 'Your intention'}</label><textarea class="input" id="f4" name="intent" placeholder="${isReading ? 'A situation, a decision, or simply what you need to hear right now' : 'Tell me what you want this working to bring'}"></textarea></div>
  <button class="btn btn-gold btn-block" type="submit" id="addBtn">Add to basket · <span id="addPrice" data-gbp="15">${fmt(15)}</span></button>
  <div class="notice">${ICON.chat}<div><b>I can\u2019t reach out to you</b>Once you\u2019ve ordered, please message me on TikTok <a href="${TIKTOK}">@naturalisticblessingshop</a> for your report.</div></div>
 </form>
</div>
<section><div class="wrap"><div class="sec-head"><div><span class="eyebrow">You may also love</span><h2>Kindred spells</h2></div><a class="btn btn-line" href="Spells.html">See all</a></div><div class="rail" id="related"></div></div></section>
<div class="buybar" id="buybar"><div class="bb-t"><b>${s.name}</b><span id="bbTier">Essential · <span data-gbp="15">${fmt(15)}</span></span></div><button class="btn btn-gold" type="button" id="bbBtn">Add</button></div>`;
  if (ST().mode === 'stan' && !ST().intakeOnSite) { $$('.fields, .field', root).forEach(el => el.remove()); }
  const f = $('#buy');
  f.addEventListener('change', () => {
    const t = tl(s.slug, f.tier.value);
    $('#addPrice').dataset.gbp = t.gbp; $('#addPrice').textContent = fmt(t.gbp);
    $('#bbTier').innerHTML = `${t.name} · <span data-gbp="${t.gbp}">${fmt(t.gbp)}</span>`;
  });
  f.addEventListener('submit', e => {
    e.preventDefault();
    addToCart({slug:s.slug, tier:f.tier.value, you:f.you ? f.you.value : '', tiktok:f.tiktok ? f.tiktok.value : '', forName:f.forName ? f.forName.value : '', intent:f.intent ? f.intent.value : ''});
    openCart();
  });
  $('#bbBtn').onclick = () => { if (f.reportValidity()) f.requestSubmit(); else if (f.you) f.you.focus(); };
  const bb = $('#buybar'), ab = $('#addBtn');
  new IntersectionObserver(([e]) => bb.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top > 0)).observe(ab);
  const rel = SPELLS.filter(x => x.slug !== s.slug && (x.cat === s.cat || x.slug === 'custom')).slice(0, 4);
  grid($('#related'), rel.length >= 4 ? rel : rel.concat(SPELLS.filter(x => !rel.includes(x) && x !== s)).slice(0, 4));
}

function checkoutPage(root) {
  const draw = () => {
    if (new URLSearchParams(location.search).get('paid')) return drawPaid();
    if (cart.length && ST().mode === 'stan') return drawStan();
    if (cart.length && ST().mode === 'stripe') return drawStripe();
    if (!cart.length) { root.innerHTML = `<div class="box done-card"><h2>Your basket is empty</h2><p class="muted">Find the working that feels right for you.</p><a class="btn btn-gold" href="Spells.html">Browse spells</a></div>`; return; }
    root.innerHTML = `<div class="co"><form class="box" id="co"><h2>Your details</h2>
<div class="fields two"><div class="field"><label for="c1">Full name</label><input class="input" id="c1" autocomplete="name" required></div><div class="field"><label for="c2">Email</label><input class="input" id="c2" type="email" autocomplete="email" required></div></div>
<div class="field"><label for="c3">TikTok handle</label><input class="input" id="c3" placeholder="@" required><small>I can\u2019t reach out to you, so please message me on TikTok for your report.</small></div>
<div class="field"><label for="c4">Country</label><select class="input" id="c4"><option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option><option>Ireland</option><option>Other</option></select></div>
<button class="btn btn-gold btn-block" type="submit">Continue to secure payment · <span data-gbp="${subtotal()}">${fmt(subtotal())}</span></button><p class="fine">Payment provider connects here (Stripe, Shopify or PayPal). Charged in USD.</p></form>
<aside class="box"><h2>Order</h2><div>${cart.map(lineHTML).join('')}</div><div class="tot"><span>Total</span><b>${fmt(subtotal())}</b></div></aside></div>`;
    $$('.rm', root).forEach(b => b.onclick = () => removeLine(+b.dataset.id));
    $('#co').onsubmit = e => { e.preventDefault(); cart = []; ls('nb-cart', cart); renderCart(); root.innerHTML = `<div class="box done-card"><span class="eyebrow">Thank you</span><h2>Your casting is in my hands</h2><p class="muted" style="max-width:44ch">I complete every casting as soon as I can. I can\u2019t reach out to you, so please message me on TikTok for your report.</p><a class="btn btn-gold" href="${TIKTOK}">Message @naturalisticblessingshop</a><p class="script" style="font-size:40px;color:var(--gold)">Love, Emily</p></div>`; scrollTo(0, 0); };
  };
  const drawStan = () => {
    const paid = ls('nb-paid') || [];
    root.innerHTML = '<div class="co"><div class="box"><h2>Secure checkout</h2><p class="muted">' + (cart.length > 1 ? 'Each casting has its own secure checkout. Complete them one at a time below. ' : '') + 'Card payments are processed securely by Stripe. Charged in USD.</p><div class="stan-list">' + cart.map(l => { const s = bySlug(l.slug), t = tl(l.slug, l.tier), done = paid.includes(l.id); return '<div class="stan-row' + (done ? ' paid' : '') + '"><div class="thumb">' + media(s) + '</div><div><b>' + s.name + '</b><small>' + t.name + ' · <span data-gbp="' + t.gbp + '">' + fmt(t.gbp) + '</span></small></div><button class="btn ' + (done ? 'btn-line' : 'btn-gold') + '" data-pay="' + l.id + '">' + (done ? 'Opened ✓' : 'Checkout') + '</button></div>'; }).join('') + '</div><div class="notice">' + ICON.chat + '<div><b>After you pay</b>I can\u2019t reach out to you, so please message me on TikTok <a href="' + TIKTOK + '">@naturalisticblessingshop</a> for your report.</div></div></div><aside class="box"><h2>Order</h2><div>' + cart.map(lineHTML).join('') + '</div><div class="tot"><span>Total</span><b>' + fmt(subtotal()) + '</b></div><button class="btn btn-line btn-block" id="clearCart" type="button">I\u2019ve paid for everything, clear my basket</button></aside></div>';
    $$('.rm', root).forEach(b => b.onclick = () => removeLine(+b.dataset.id));
    $$('[data-pay]', root).forEach(b => b.onclick = () => { const l = cart.find(x => x.id === +b.dataset.pay); ls('nb-paid', (ls('nb-paid') || []).concat(l.id)); if (ST().openInNewTab) draw(); goStan(l.slug, l.tier); });
    $('#clearCart').onclick = () => { cart = []; ls('nb-cart', cart); ls('nb-paid', []); renderCart(); draw(); };
  };
  const drawPaid = () => {
    cart = []; ls('nb-cart', cart); ls('nb-paid', []); renderCart();
    track('purchase', {currency: 'USD'});
    root.innerHTML = '<div class="box done-card"><span class="eyebrow">Payment received</span><h2>Your castings are in my hands</h2><p class="muted" style="max-width:44ch">Thank you. A receipt is on its way to your email. I can\u2019t reach out to you, so please message me on TikTok for your report.</p><a class="btn btn-gold" href="' + TIKTOK + '">Message @naturalisticblessingshop</a><p class="script" style="font-size:40px;color:var(--gold)">Love, Emily</p></div>';
  };
  const drawStripe = () => {
    root.innerHTML = '<div class="co"><form class="box" id="co"><h2>Your details</h2><div class="fields two"><div class="field"><label for="c1">Full name</label><input class="input" id="c1" name="name" autocomplete="name" required></div><div class="field"><label for="c2">Email</label><input class="input" id="c2" name="email" type="email" autocomplete="email" required></div></div><div class="field"><label for="c3">TikTok handle</label><input class="input" id="c3" name="tiktok" placeholder="@" required><small>I can\u2019t reach out to you, so please message me on TikTok for your report.</small></div><div class="field"><label for="c4">Country</label><select class="input" id="c4" name="country"><option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option><option>Ireland</option><option>Other</option></select></div><button class="btn btn-gold btn-block" type="submit" id="payBtn">Checkout \u00b7 <span data-gbp="' + subtotal() + '">' + fmt(subtotal()) + '</span></button><p class="fine" id="coMsg">One secure payment for everything in your basket, processed by Stripe. Charged in USD.</p></form><aside class="box"><h2>Order</h2><div>' + cart.map(lineHTML).join('') + '</div><div class="tot"><span>Total</span><b>' + fmt(subtotal()) + '</b></div></aside></div>';
    $$('.rm', root).forEach(b => b.onclick = () => removeLine(+b.dataset.id));
    const f = $('#co'), btn = $('#payBtn'), msg = $('#coMsg');
    const saved = ls('nb-details') || {}; ['name','email','tiktok','country'].forEach(k => { if (saved[k] && f[k]) f[k].value = saved[k]; });
    if (!saved.tiktok) { const t = cart.find(l => l.tiktok); if (t) f.tiktok.value = t.tiktok; }
    f.onsubmit = async e => {
      e.preventDefault();
      const det = {name: f.name.value, email: f.email.value, tiktok: f.tiktok.value, country: f.country.value}; ls('nb-details', det);
      btn.disabled = true; btn.textContent = 'Opening secure checkout\u2026';
      track('begin_checkout', {value: subtotal(), currency: 'USD', items: cart.length});
      try {
        const r = await fetch(ST().checkoutEndpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(Object.assign({}, det, {items: cart.map(l => ({slug: l.slug, tier: l.tier, forName: l.forName || '', intent: l.intent || ''}))}))});
        const d = await r.json(); if (!r.ok || !d.url) throw new Error(d.error || 'Checkout unavailable');
        location.href = d.url;
      } catch (err) {
        btn.disabled = false; btn.innerHTML = 'Checkout \u00b7 ' + fmt(subtotal());
        msg.textContent = 'Checkout isn\u2019t connected yet on this preview. Once the site is live with Stripe, this opens a secure payment for your whole basket.';
      }
    };
  };
  document.addEventListener('cart', draw); draw();
}

function shopPage() {
  const g = $('#shopGrid'), chips = $$('.chip');
  const show = c => { chips.forEach(x => x.setAttribute('aria-pressed', x.dataset.c === c)); grid(g, SPELLS.filter(s => c === 'All' || s.cat === c)); };
  chips.forEach(x => x.onclick = () => show(x.dataset.c));
  const q = new URLSearchParams(location.search).get('c'); show(q && chips.some(x => x.dataset.c === q) ? q : 'All');
  if (q === 'Under20') { chips.forEach(x => x.setAttribute('aria-pressed', x.dataset.c === 'Under20')); grid(g, SPELLS); }
  const u = chips.find(x => x.dataset.c === 'Under20'); if (u) u.onclick = () => { chips.forEach(x => x.setAttribute('aria-pressed', x === u)); grid(g, SPELLS); };
}

function reviews() {
  const el = $('.reviews'); if (!el) return;
  const cards = $$('.review', el);
  el.classList.add('car'); el.innerHTML = '<div class="rtrack"></div>';
  const tr = $('.rtrack', el); cards.forEach(c => tr.appendChild(c));
  const dots = document.createElement('div'); dots.className = 'rdots'; el.after(dots);
  let i = 0, n = 1, timer, paused = false;
  const layout = () => {
    const W = el.clientWidth; n = W >= 1050 ? 3 : W >= 640 ? 2 : 1;
    el.style.setProperty('--rw', ((W - 9 * (n - 1)) / n) + 'px');
    const pages = cards.length - n + 1;
    dots.innerHTML = Array.from({length: pages}, (_, k) => '<button aria-label="Show review ' + (k + 1) + '"></button>').join('');
    $$('button', dots).forEach((b, k) => b.onclick = () => { go(k); restart(); });
    go(Math.min(i, pages - 1));
  };
  const go = k => {
    const pages = cards.length - n + 1; i = (k + pages) % pages;
    const step = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
    tr.style.transform = 'translateX(' + (-i * step) + 'px)';
    $$('button', dots).forEach((b, x) => b.classList.toggle('on', x === i));
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => { if (!paused) go(i + 1); }, 4200); };
  el.addEventListener('mouseenter', () => paused = true); el.addEventListener('mouseleave', () => paused = false);
  let sx = null;
  el.addEventListener('pointerdown', e => sx = e.clientX);
  el.addEventListener('pointerup', e => { if (sx === null) return; const d = e.clientX - sx; sx = null; if (Math.abs(d) > 40) { go(i + (d < 0 ? 1 : -1)); restart(); } });
  addEventListener('resize', layout); layout(); restart();
}
window.NB = {SPELLS, TIERS, card, grid, art, fmt, bySlug};
document.addEventListener('DOMContentLoaded', () => {
  chrome();
  $$('[data-grid]').forEach(el => grid(el, el.dataset.grid.split(',').map(bySlug).filter(Boolean)));
  if ($('#shopGrid')) shopPage();
  if ($('#spell')) spellPage($('#spell'));
  if ($('#checkout')) checkoutPage($('#checkout'));
  $$('[data-art]').forEach(el => el.outerHTML = art(bySlug(el.dataset.art), el.hasAttribute('data-sea')));
  hero(); motion(); reviews();
});
})();
