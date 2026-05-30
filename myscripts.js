<!-- ===========================================   JAVASCRIPT  =========================================== -->


/* ===================================  ÉTAT GLOBAL DE L'APPLICATION  ====================================== */
/* =========================  Toutes les données dynamiques sont centralisées ici   ======================== */

const APP = {
  cart: [],           // Articles dans le panier
  promoCode: null,    // Code promo actif
  discountRate: 0,    // Taux de réduction (0 à 1)
  deliveryCost: 0,    // Coût de livraison sélectionné
  loyaltyPoints: 3500,// Points fidélité actuels
  currentSlide: 0,    // Index du slide actif
  wheelSpinning: false,
  currentStep: 1,     // Étape du formulaire de commande
  testIndex: 0,       // Index du témoignage actif
};

/* ========================================================================================================== */

/* =====================    DONNÉES — MODIFIER ICI POUR PERSONNALISER LE CONTENU
                            Chaque objet représente un slide, produit, ou service  ============= ============ */

// --- SLIDER DATA ---
// type: "video" — utilise une vidéo locale à la place d'une image
const SLIDER_DATA = [
  {
    type: "video",
    videoSrc: "Videos/Mclaren 750s.mp4",
    tag: "VX MOTORS — L'Excellence en Mouvement",
    title: "VITESSE <em>&</em> LUXE",
    sub: "L'adrénaline au service du raffinement — Découvrez notre univers",
    btnPrimary:   { text: "Voir les Véhicules", href: "#vehicles" },
    btnSecondary: { text: "Prendre RDV",        href: "#contact" },
  },
  {
    tag: "Bienvenue Chez VX MOTORS",
    title: "Bienvenue <em>Chez VX MOTORS</em>",
    sub: "Public · VIP · Stock limité",
    bg: "Images/SCHOW.jpg?w=1600",
    btnPrimary: { text: "Voir le véhicule", href: "#vehicles" },
    btnSecondary: { text: "Bienvenue", href: "#contact" },
  },
  {
    tag: "Nouveauté 2024",
    title: "Mercedes <em>Maybach V12</em>",
    sub: "1 000 ch hybride · 0–100 en 2.5s · Stock limité",
    bg: "Images/MC.jpg?w=1600",
    btnPrimary: { text: "Voir le véhicule", href: "#vehicles" },
    btnSecondary: { text: "Prendre RDV", href: "#contact" },
  },
  {
    tag: "Collection Exclusive",
    title: "Lamborghini <em>Urus</em>",
    sub: "SUV V8 bi-turbo · Performante · Luxueuse",
    bg: "Images/LMURUS.jpg?w=1600",
    btnPrimary: { text: "Découvrir", href: "#vehicles" },
    btnSecondary: { text: "Essai gratuit", href: "#contact" },
  },
  {
    tag: "Service Premium",
    title: "Atelier <em>Expert</em>",
    sub: "Réparation & entretien · Certifiés constructeur · Délai garanti",
    bg: "Images/ATEXPER.jpg?w=1600",
    btnPrimary: { text: "Nos Services", href: "#services" },
    btnSecondary: { text: "Devis gratuit", href: "#contact" },
  },
  {
    tag: "Occasion Certifiée",
    title: "Mercedes elettrica <em>Classe-G </em>",
    sub: "Historique complet · Garantie 2 ans · Financement disponible",
    bg: "Images/CG.jpg?w=1600",
    btnPrimary: { text: "Voir l'offre", href: "#vehicles" },
    btnSecondary: { text: "En savoir plus", href: "#contact" },
  },
];

/* ========================================================================================================== */

// --- PRODUITS DATA ---
// Pour ajouter un produit : copier un objet et modifier les valeurs
const PRODUCTS_DATA = [
  {
    id: 1, name: "Ferrari SF90 Stradale",
    brand: "Ferrari", category: "sport",
    price: 580000, oldPrice: null,
    badge: "new",
    img: "Images/Ferrari.jpg?w=600",
    tag: "Neuf",
  },
  {
    id: 2, name: "Lamborghini Urus S",
    brand: "Lamborghini", category: "suv",
    price: 320000, oldPrice: 360000,
    badge: "sale",
    img: "Images/MERCE.jpg?w=600",
    tag: "Occasion",
  },
  {
    id: 3, name: "Porsche 911 GT3 RS",
    brand: "Porsche", category: "sport",
    price: 285000, oldPrice: null,
    badge: null,
    img: "Images/911.PNG?w=600",
    tag: "Neuf",
  },
  {
    id: 4, name: "Bentley Continental GT",
    brand: "Bentley", category: "vente",
    price: 260000, oldPrice: null,
    badge: "new",
    img: "Images/Bentley Continental GT.PNG?w=600",
    tag: "Neuf",
  },
  {
    id: 5, name: "Rolls-Royce Ghost",
    brand: "Rolls-Royce", category: "vente",
    price: 380000, oldPrice: null,
    badge: null,
    img: "Images/Rolls.PNG?w=600",
    tag: "Neuf",
  },
  {
    id: 6, name: "Tesla Model S Plaid",
    brand: "Tesla", category: "electrique",
    price: 130000, oldPrice: 145000,
    badge: "sale",
    img: "Images/Tesla s.PNG?w=600",
    tag: "Électrique",
  },
  {
    id: 7, name: "McLaren 720S",
    brand: "McLaren", category: "sport",
    price: 295000, oldPrice: 310000,
    badge: "sale",
    img: "Images/mc750.PNG?w=600",
    tag: "Occasion",
  },
  {
    id: 8, name: "Range Rover SV Autobiography",
    brand: "Land Rover", category: "suv",
    price: 185000, oldPrice: null,
    badge: "new",
    img: "Images/Range.PNG?w=600",
    tag: "Neuf",
  },
  {
    id: 9, name: "Aston Martin DB12",
    brand: "Aston Martin", category: "occasion",
    price: 265000, oldPrice: 290000,
    badge: null,
    img: "Images/AS.PNG?w=600",
    tag: "Occasion",
  },
  {
    id: 10, name: "Maruti 800",
    brand: "Maruti 800", category: "Zawali",
    price: 2000, oldPrice: 2900,
    badge: null,
    img: "Images/Maruti800.PNG?w=600",
    tag: "Neuf",
  },
  {
    id: 11, name: "DFSK",
    brand: "DFSK", category: "Naviguateur",
    price: 2500, oldPrice: 3000,
    badge: null,
    img: "Images/DFSK.PNG?w=600",
    tag: "Neuf",
  },
  {
    id: 12, name: "VMS VM12 COMMERCIAL",
    brand: "VMS VM12 COMMERCIAL", category: "COMMERCANT",
    price: 1200, oldPrice: 1500,
    badge: null,
    img: "Images/vms.PNG?w=600",
    tag: "Neuf",
  },
];

/* ========================================================================================================== */

// --- SERVICES DATA ---
const SERVICES_DATA = [
  {
    icon: "🔧", name: "Mécanique Générale",
    desc: "Révision complète, vidange, freins, suspension, embrayage. Techniciens certifiés toutes marques.",
    price: "À partir de 150 €",
  },
  {
    icon: "🎨", name: "Carrosserie & Peinture",
    desc: "Débosselage, peinture teinte constructeur, protection céramique et film PPF.",
    price: "À partir de 500 €",
  },
  {
    icon: "💡", name: "Diagnostic Électronique",
    desc: "Lecture codes erreurs, calibration systèmes ADAS, mise à jour logiciels constructeur.",
    price: "À partir de 80 €",
  },
  {
    icon: "⚡", name: "Tuning & Performance",
    desc: "Reprogrammation moteur, kit turbo, échappement sport, downpipe, suspension sport.",
    price: "Sur devis",
  },
  {
    icon: "✨", name: "Detailing Premium",
    desc: "Nettoyage professionnel intérieur/extérieur, polissage, application céramique 9H.",
    price: "À partir de 250 €",
  },
  {
    icon: "🛡️", name: "Garantie & Expertise",
    desc: "Expertise avant achat, extension de garantie, inspection 150 points certifiée.",
    price: "À partir de 200 €",
  },
];

// --- TÉMOIGNAGES ---
const TESTIMONIALS = [
  {
    stars: "★★★★★",
    quote: "VX MOTORS m'a livré ma Ferrari dans un état parfait. Un service d'une élégance rare, des conseillers passionnés et une expérience client absolument irréprochable.",
    author: "Karim B.",
    car: "Ferrari SF90 Stradale — Client depuis 2021",
  },
  {
    stars: "★★★★★",
    quote: "J'ai confié ma Lamborghini pour une réparation complexe. Résultat : travail parfait, rendu dans les délais, et même une petite attention surprise. Je ne vais nulle part ailleurs.",
    author: "Sophie L.",
    car: "Lamborghini Huracán — Cliente fidèle",
  },
  {
    stars: "★★★★★",
    quote: "Le programme VX Elite est un vrai plus. Mes points s'accumulent à chaque service et les avantages Platinum sont concrets. Merci pour cette relation de confiance.",
    author: "Thomas M.",
    car: "Porsche 911 Turbo S — Membre Platinum",
  },
];

/* ========================================================================================================== */

/* ===================================  ROUE DE LA FORTUNE — CONFIGURATION
                               Modifier les segments : label, couleur et réduction  ========================= */
const WHEEL_SEGMENTS = [
  { label: "5% OFF",  color: "#1a1a0a", text: "#C9A84C", code: "VX-GOLD5",  desc: "5% de réduction sur votre prochain achat" },
  { label: "10% OFF", color: "#2a1a00", text: "#E8C97A", code: "VX-GOLD10", desc: "10% de réduction sur votre prochain service" },
  { label: "Réessai", color: "#111111", text: "#666666", code: null,         desc: "Pas de chance… Retentez demain !" },
  { label: "15% OFF", color: "#1a0a00", text: "#C9A84C", code: "VX-VIP15",  desc: "15% de réduction — offre VIP exclusive" },
  { label: "Livraison\nOfferte", color: "#0a0a1a", text: "#6EC6CA", code: "VX-LIVR",  desc: "Livraison à domicile offerte" },
  { label: "30% OFF", color: "#2a1500", text: "#FFD700", code: "VX-LUCKY30",desc: "30% de réduction — JACKPOT !" },
  { label: "Réessai", color: "#111111", text: "#666666", code: null,         desc: "Pas de chance… Retentez demain !" },
  { label: "20% OFF", color: "#1a0800", text: "#E8C97A", code: "VX-ELITE20",desc: "20% de réduction sur tout le catalogue" },
];

/* ========================================================================================================== */

/* ============================================== CURSEUR PERSONNALISÉ ====================================== */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Suivi avec délai pour l'anneau (effet de trainée)
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Agrandir le curseur au survol des éléments interactifs
  document.querySelectorAll('a, button, [onclick]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ========================================================================================================== */

/* ====================  LOADER — Disparaît après 3s (durée barre = 2.5s + fade) ============================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Arrêter la vidéo du loader une fois caché
    const loaderVid = document.getElementById('loader-video');
    if (loaderVid) setTimeout(() => loaderVid.pause(), 900);
    // Lancer les animations d'entrée
    animateCounters();
  }, 3000);
});

/* ========================================================================================================== */

/* ========================================  NAVBAR — Apparition au scroll ================================== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 80);

  // Barre de progression de lecture
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct  = (window.scrollY / docH) * 100;
  document.getElementById('reading-progress').style.width = pct + '%';
});

/* ========================================================================================================== */

/* ============================================= MENU MOBILE ================================================ */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

/* ========================================================================================================== */

/* ============================================= HERO SLIDER ================================================ */

/* ============================== Boucle automatique toutes les 5 secondes
                                 Support type "video" pour les slides vidéo ================================= */
function buildSlider() {
  const hero = document.getElementById('hero');
  const dotsWrap = document.getElementById('slider-dots');

  // Construire les slides
  SLIDER_DATA.forEach((s, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');

    if (s.type === 'video') {
      // Slide avec vidéo en fond
      slide.innerHTML = `
        <video class="slide-video" autoplay muted loop playsinline preload="auto">
          <source src="${s.videoSrc}" type="video/mp4" />
        </video>
        <div class="slide-gradient"></div>
        <div class="slide-video-badge">Live — Vidéo VX</div>
        <div class="slide-content">
          <span class="slide-tag">${s.tag}</span>
          <h1 class="slide-title">${s.title}</h1>
          <p class="slide-sub">${s.sub}</p>
          <div class="slide-actions">
            <a href="${s.btnPrimary.href}" class="btn-primary">${s.btnPrimary.text}</a>
            <a href="${s.btnSecondary.href}" class="btn-secondary">${s.btnSecondary.text}</a>
          </div>
        </div>
      `;
    } else {
      // Slide avec image
      slide.innerHTML = `
        <div class="slide-bg" style="background-image:url('${s.bg}')"></div>
        <div class="slide-gradient"></div>
        <div class="slide-content">
          <span class="slide-tag">${s.tag}</span>
          <h1 class="slide-title">${s.title}</h1>
          <p class="slide-sub">${s.sub}</p>
          <div class="slide-actions">
            <a href="${s.btnPrimary.href}" class="btn-primary">${s.btnPrimary.text}</a>
            <a href="${s.btnSecondary.href}" class="btn-secondary">${s.btnSecondary.text}</a>
          </div>
        </div>
      `;
    }

    // Insérer avant les contrôles
    hero.insertBefore(slide, dotsWrap);

    // Créer le dot correspondant
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    // Ajouter icône vidéo sur le premier dot
    if (s.type === 'video') dot.title = 'Vidéo';
    dotsWrap.appendChild(dot);
  });

  // Auto-play toutes les 6s (un peu plus long pour profiter de la vidéo)
  setInterval(() => {
    goToSlide((APP.currentSlide + 1) % SLIDER_DATA.length);
  }, 9000);
}

function goToSlide(idx) {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slider-dot');
  slides[APP.currentSlide].classList.remove('active');
  dots[APP.currentSlide].classList.remove('active');
  APP.currentSlide = idx;
  slides[APP.currentSlide].classList.add('active');
  dots[APP.currentSlide].classList.add('active');
}

/* ========================================================================================================== */

/* ====================================  CATALOGUE PRODUITS — Rendu + Filtrage  ============================= */
function buildProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = PRODUCTS_DATA.map(p => `
    <div class="product-card reveal" data-category="${p.category}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${
          p.badge === 'new' ? 'Nouveau' : p.badge === 'sale' ? 'Promo' : p.badge
        }</span>` : ''}
        <div class="product-overlay">
          <button class="btn-add-cart" onclick="addToCart(${p.id})">+ Panier</button>
          <button class="btn-wishlist" title="Favoris">♡</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-price-old">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Réattacher les observateurs sur les nouvelles cards
  observeReveal();
}

// Filtrage par catégorie
document.addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');

  const filter = e.target.dataset.filter;
  document.querySelectorAll('.product-card').forEach(card => {
    if (filter === 'all' || card.dataset.category === filter) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
});

/* ========================================================================================================== */

/* =========================================== SERVICES — Rendu ============================================= */
function buildServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = SERVICES_DATA.map((s, i) => `
    <div class="service-card reveal reveal-delay-${i % 4}">
      <span class="service-icon">${s.icon}</span>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
      <span class="service-price-tag">${s.price}</span>
    </div>
  `).join('');
}

/* ========================================================================================================== */

/* ======================================= TÉMOIGNAGES — Slider automatique ================================= */
function buildTestimonials() {
  const track = document.getElementById('test-track');
  const nav   = document.getElementById('test-nav');

  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-stars">${t.stars}</div>
      <div class="testimonial-quote">"${t.quote}"</div>
      <div class="testimonial-author">${t.author}</div>
      <div class="testimonial-car">${t.car}</div>
    </div>
  `).join('');

  TESTIMONIALS.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'test-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToTestimonial(i);
    nav.appendChild(dot);
  });

  // Auto-play
  setInterval(() => {
    goToTestimonial((APP.testIndex + 1) % TESTIMONIALS.length);
  }, 6000);
}

function goToTestimonial(idx) {
  const track = document.getElementById('test-track');
  const dots  = document.querySelectorAll('.test-dot');
  dots[APP.testIndex].classList.remove('active');
  APP.testIndex = idx;
  track.style.transform = `translateX(-${idx * 100}%)`;
  dots[APP.testIndex].classList.add('active');
}

/* ========================================================================================================== */

/* ========================================= PANIER — Logique complète ====================================== */
function addToCart(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = APP.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    APP.cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  animateBadge();
  showToast(`${product.name} ajouté au panier`, 'success');
  // Ouvrir le panier automatiquement
  if (!document.getElementById('cart-drawer').classList.contains('open')) {
    toggleCart();
  }
}

function removeFromCart(productId) {
  APP.cart = APP.cart.filter(item => item.id !== productId);
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = APP.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCartUI();
}

function updateCartUI() {
  const empty    = document.getElementById('cart-empty');
  const itemsEl  = document.getElementById('cart-items');
  const badge    = document.getElementById('cart-badge');
  const totalEl  = document.getElementById('cart-total');

  const totalItems = APP.cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = totalItems;

  if (APP.cart.length === 0) {
    empty.style.display   = 'block';
    itemsEl.style.display = 'none';
  } else {
    empty.style.display   = 'none';
    itemsEl.style.display = 'block';

    itemsEl.innerHTML = APP.cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
        <div>
          <div class="cart-item-brand">${item.brand}</div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)} / unité</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');
  }

  // Calcul total avec réduction et livraison
  const subtotal  = APP.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = Math.round(subtotal * APP.discountRate);
  const total     = subtotal - discount + APP.deliveryCost;

  totalEl.textContent = formatPrice(total);

  const discountRow = document.getElementById('discount-row');
  const discountVal = document.getElementById('discount-val');
  if (APP.discountRate > 0) {
    discountRow.classList.add('show');
    discountVal.textContent = `-${formatPrice(discount)}`;
  } else {
    discountRow.classList.remove('show');
  }
}

function toggleCart() {
  const drawer   = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  drawer.classList.toggle('open');
  backdrop.classList.toggle('open');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}

function animateBadge() {
  const badge = document.getElementById('cart-badge');
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 400);
}

/* ========================================================================================================== */

/* =====================================  CODE PROMO — Validation  ========================================== */


/* ==================================  Ajouter des codes dans PROMO_CODES  ================================== */
const PROMO_CODES = {
  'VX-GOLD5':    0.05,
  'VX-GOLD10':   0.10,
  'VX-VIP15':    0.15,
  'VX-ELITE20':  0.20,
  'VX-LUCKY30':  0.30,
  'WELCOME10':   0.10,
};

function applyPromo() {
  const input = document.getElementById('promo-input').value.trim().toUpperCase();
  if (!input) return;

  if (PROMO_CODES[input] !== undefined) {
    APP.promoCode    = input;
    APP.discountRate = PROMO_CODES[input];
    showToast(`Code ${input} appliqué ! -${APP.discountRate * 100}%`, 'success');
    updateCartUI();
  } else {
    showToast('Code promo invalide', 'error');
  }
}

/* ========================================================================================================== */

/* ===============================  FORMULAIRE DE COMMANDE — Navigation par étapes  ========================= */
function openOrderModal() {
  if (APP.cart.length === 0) {
    showToast('Votre panier est vide', 'error');
    return;
  }
  toggleCart();
  document.getElementById('order-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  document.getElementById('order-modal').classList.remove('open');
  document.getElementById('order-success').classList.remove('show');
  // Réinitialiser le formulaire
  goToStep(1);
  document.getElementById('order-steps').style.display = 'flex';
  // Réinitialiser les form-steps
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`form-step-${i}`);
    if (el) el.classList.remove('active');
    const ind = document.getElementById(`step-ind-${i}`);
    if (ind) { ind.classList.remove('active','done'); if(i===1) ind.classList.add('active'); }
  }
  document.getElementById('form-step-1').classList.add('active');
  APP.currentStep = 1;
  document.body.style.overflow = '';
}

function goToStep(step) {
  // Validation étape 1
  if (step === 2 && APP.currentStep === 1 && !validateStep1()) return;

  // Mise à jour des indicateurs
  for (let i = 1; i <= 3; i++) {
    const ind = document.getElementById(`step-ind-${i}`);
    ind.classList.remove('active','done');
    if (i < step)  ind.classList.add('done');
    if (i === step) ind.classList.add('active');
  }

  // Afficher la bonne étape
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`form-step-${i}`).classList.remove('active');
  }
  document.getElementById(`form-step-${step}`).classList.add('active');

  // Remplir le récap à l'étape 3
  if (step === 3) buildRecap();

  APP.currentStep = step;
}

function validateStep1() {
  let valid = true;
  const fields = [
    { id: 'f-prenom',  err: 'err-prenom',  msg: 'Prénom requis' },
    { id: 'f-nom',     err: 'err-nom',     msg: 'Nom requis' },
    { id: 'f-email',   err: 'err-email',   msg: 'Email invalide', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { id: 'f-tel',     err: 'err-tel',     msg: 'Téléphone requis' },
    { id: 'f-adresse', err: 'err-adresse', msg: 'Adresse requise' },
  ];

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    const err   = document.getElementById(f.err);
    const val   = input.value.trim();
    const ok    = f.regex ? f.regex.test(val) : val.length > 0;

    if (!ok) {
      err.textContent = f.msg;
      input.classList.add('error');
      valid = false;
    } else {
      err.textContent = '';
      input.classList.remove('error');
    }
  });

  return valid;
}

function selectDelivery(el, cost) {
  document.querySelectorAll('.delivery-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  APP.deliveryCost = cost;
  updateCartUI();
}

function buildRecap() {
  const prenom  = document.getElementById('f-prenom').value;
  const nom     = document.getElementById('f-nom').value;
  const email   = document.getElementById('f-email').value;
  const adresse = document.getElementById('f-adresse').value;
  const items   = APP.cart.map(i => `${i.name} × ${i.qty} — ${formatPrice(i.price * i.qty)}`).join('<br>');
  const delivLabel = APP.deliveryCost === 0 ? 'Retrait Showroom (Gratuit)' :
                     APP.deliveryCost === 490 ? 'Livraison à Domicile (+490 €)' :
                     'Livraison Express (+990 €)';
  const subtotal = APP.cart.reduce((s,i) => s + i.price * i.qty, 0);
  const discount = Math.round(subtotal * APP.discountRate);
  const total    = subtotal - discount + APP.deliveryCost;

  document.getElementById('order-recap').innerHTML = `
    <strong style="color:var(--white)">Client :</strong> ${prenom} ${nom}<br>
    <strong style="color:var(--white)">Email :</strong> ${email}<br>
    <strong style="color:var(--white)">Adresse :</strong> ${adresse}<br>
    <hr style="border-color:rgba(255,255,255,0.05);margin:10px 0"><br>
    <strong style="color:var(--white)">Articles :</strong><br>${items}<br><br>
    <strong style="color:var(--white)">Livraison :</strong> ${delivLabel}<br>
    ${APP.discountRate > 0 ? `<strong style="color:var(--green)">Réduction :</strong> -${formatPrice(discount)}<br>` : ''}
    <strong style="color:var(--gold);font-size:1.1rem">Total : ${formatPrice(total)}</strong>
  `;
}

function submitOrder() {
  // Générer un numéro de référence aléatoire
  const ref = 'VX-2024-' + Math.floor(Math.random() * 9000 + 1000);
  document.getElementById('success-ref').textContent = 'Référence : #' + ref;

  // Ajouter des points fidélité (10 pts par tranche de 100€)
  const total = APP.cart.reduce((s,i) => s + i.price * i.qty, 0);
  const earned = Math.floor(total / 100) * 10;
  APP.loyaltyPoints += earned;
  document.getElementById('loyalty-earned').textContent = `🏆 +${earned} points VX Elite ajoutés à votre carte fidélité !`;

  // Masquer les étapes, afficher la confirmation
  document.getElementById('order-steps').style.display = 'none';
  for (let i = 1; i <= 3; i++) document.getElementById(`form-step-${i}`).classList.remove('active');
  document.getElementById('order-success').classList.add('show');

  // Vider le panier
  APP.cart = [];
  APP.promoCode    = null;
  APP.discountRate = 0;
  updateCartUI();
  updateLoyaltyCard();
  showToast('Commande confirmée ! Merci pour votre confiance.', 'success');
}

/* ========================================================================================================== */

/* ==========================================  ROUE DE LA FORTUNE  ========================================== */
function buildWheel() {
  const canvas = document.getElementById('wheel-canvas');
  const ctx    = canvas.getContext('2d');
  const cx = canvas.width / 2, cy = canvas.height / 2;
  const r  = cx - 10;
  const n  = WHEEL_SEGMENTS.length;

  WHEEL_SEGMENTS.forEach((seg, i) => {
    const start = (i / n) * 2 * Math.PI - Math.PI / 2;
    const end   = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    const mid   = (start + end) / 2;

    // Segment
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(201,168,76,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Texte
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(mid);
    ctx.textAlign = 'right';
    ctx.fillStyle = seg.text;
    ctx.font = 'bold 11px Jost, sans-serif';
    const lines = seg.label.split('\n');
    lines.forEach((line, li) => {
      ctx.fillText(line, r - 12, (li - (lines.length - 1) / 2) * 15);
    });
    ctx.restore();
  });

  // Cercle central
  ctx.beginPath();
  ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
  ctx.fillStyle = '#C9A84C';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, 16, 0, 2 * Math.PI);
  ctx.fillStyle = '#080808';
  ctx.fill();
}

function spinWheel() {
  if (APP.wheelSpinning) return;
  APP.wheelSpinning = true;

  const btn = document.getElementById('btn-spin');
  btn.disabled = true;
  btn.textContent = 'EN COURS...';

  const canvas = document.getElementById('wheel-canvas');
  // Choisir un segment gagnant aléatoire
  const winIdx   = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
  const n        = WHEEL_SEGMENTS.length;
  const segAngle = 360 / n;

  // Calculer l'angle final pour pointer sur winIdx
  // Le pointer est en haut (270°), on calcule l'angle du centre du segment gagnant
  const winAngle = winIdx * segAngle + segAngle / 2;
  const finalAngle = 3600 + (270 - winAngle); // Au moins 10 tours complets

  let current = 0, start = null;
  const duration = 4000; // ms

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animate(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    const angle = easeOut(progress) * finalAngle;

    canvas.style.transform = `rotate(${angle}deg)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Animation terminée
      APP.wheelSpinning = false;
      btn.disabled = false;
      btn.textContent = 'REJOUER';

      const seg = WHEEL_SEGMENTS[winIdx];
      const result = document.getElementById('promo-result');
      const codeEl = document.getElementById('promo-code-display');
      const descEl = document.getElementById('promo-desc');

      if (seg.code) {
        codeEl.textContent = seg.code;
        descEl.textContent = seg.desc;
        // Ajouter automatiquement ce code aux promos disponibles
        if (!PROMO_CODES[seg.code]) {
          PROMO_CODES[seg.code] = parseInt(seg.label) / 100 || 0.05;
        }
        showToast('🎉 Félicitations ! Vous avez gagné ' + seg.label, 'success');
      } else {
        codeEl.textContent = '😕 Raté';
        descEl.textContent = seg.desc;
      }
      result.classList.add('show');
    }
  }

  requestAnimationFrame(animate);
}

function copyPromoCode() {
  const code = document.getElementById('promo-code-display').textContent;
  if (code === '😕 Raté') return;
  navigator.clipboard.writeText(code).then(() => {
    showToast('Code copié : ' + code, 'success');
    // Pré-remplir le champ promo du panier
    document.getElementById('promo-input').value = code;
  });
}

/* ========================================================================================================== */

/* =================================  FIDÉLITÉ — Mise à jour de la carte ==================================== */
function updateLoyaltyCard() {
  const pts = APP.loyaltyPoints;
  document.getElementById('loyalty-points').textContent = pts.toLocaleString('fr-FR');

  // Déterminer le niveau
  let tier, ptsForNext, nextTier, maxPts;
  if (pts < 1000)       { tier = 'Bronze';   ptsForNext = 1000 - pts;  nextTier = 'Gold';     maxPts = 1000;  }
  else if (pts < 5000)  { tier = 'Gold';     ptsForNext = 5000 - pts;  nextTier = 'Platinum'; maxPts = 5000;  }
  else if (pts < 15000) { tier = 'Platinum'; ptsForNext = 15000 - pts; nextTier = 'Diamond';  maxPts = 15000; }
  else                  { tier = 'Diamond';  ptsForNext = 0;           nextTier = 'Diamond';  maxPts = 15000; }

  document.getElementById('loyalty-tier').textContent = tier;
  document.getElementById('loyalty-tier').className   = 'loyalty-tier ' + tier.toLowerCase();
  document.getElementById('tier-current').textContent = tier;
  document.getElementById('pts-needed').textContent   = ptsForNext.toLocaleString('fr-FR') + ' pts';
  document.getElementById('tier-next').innerHTML =
    nextTier === tier ? '🏆 Niveau Maximum !' :
    `${nextTier} — encore <strong id="pts-needed">${ptsForNext.toLocaleString('fr-FR')} pts</strong>`;

  // Barre de progression
  const prevMax = tier === 'Bronze' ? 0 : tier === 'Gold' ? 1000 : tier === 'Platinum' ? 5000 : 0;
  const pct = Math.min(((pts - prevMax) / (maxPts - prevMax)) * 100, 100);
  document.getElementById('loyalty-bar').style.width = pct + '%';
}

function simulatePurchase() {
  const amount = [150, 300, 500, 1000, 2500][Math.floor(Math.random() * 5)];
  const earned = Math.floor(amount / 10);
  APP.loyaltyPoints += earned;
  updateLoyaltyCard();
  showToast(`Achat simulé de ${formatPrice(amount)} — +${earned} points !`, 'success');
}

/* ========================================================================================================== */

/* =============================  ANIMATIONS AU SCROLL (Intersection Observer) ============================== */
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Ne plus observer une fois visible
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ========================================================================================================== */

/* ======================================  COMPTEURS ANIMÉS (Stats band) ==================================== */
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '+';
    const duration = 1800;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  });
}

/* ========================================================================================================== */

/* ===========================================  NEWSLETTER  ================================================= */
function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email').value.trim();
  const re    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    showToast('Veuillez entrer un email valide', 'error');
    return;
  }
  document.getElementById('newsletter-email').value = '';
  showToast('Bienvenue dans le club VX Elite ! Vérifiez vos emails.', 'success');
}

/* ========================================================================================================== */

/* ==========================================  TOAST NOTIFICATIONS  ========================================= */
/* ============================  Type : 'success' | 'error' | '' (default gold) ============================= */
function showToast(msg, type = '') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  container.appendChild(toast);

  // Disparaître après 3.5s
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.35s ease forwards';
    setTimeout(() => toast.remove(), 360);
  }, 3500);
}

/* ========================================================================================================== */

/* ==============================================  UTILITAIRES  ============================================= */

// Formater un nombre en prix français (ex: 580 000 €)
function formatPrice(n) {
  return n.toLocaleString('fr-FR') + ' €';
}

/* ========================================================================================================== */

/* ===================================SÉLECTEUR DE THÈME COULEUR===============================================
                            5 palettes : Gold, Silver, Cyan, Ruby, Emerald
============================================================================================================ */
function initTheme() {
  const saved = localStorage.getItem('vx-theme') || 'gold';
  applyTheme(saved);
}

function setTheme(theme) {
  applyTheme(theme);
  localStorage.setItem('vx-theme', theme);
}

function applyTheme(theme) {
  // Retirer tous les thèmes du body
  document.body.classList.remove('theme-gold','theme-silver','theme-cyan','theme-ruby','theme-emerald');
  document.body.classList.add('theme-' + theme);

  // Mettre à jour les swatches
  document.querySelectorAll('.theme-swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.theme === theme);
  });

  // Toast de confirmation
  const names = { gold:'Or Classique', silver:'Platine', cyan:'Cyan Électrique', ruby:'Rubis Ferrari', emerald:'Émeraude Bentley' };
  showToast('Thème : ' + (names[theme] || theme), '');
}

function toggleThemePanel() {
  document.getElementById('theme-swatches').classList.toggle('open');
}
// Fermer le panneau si on clique ailleurs
document.addEventListener('click', e => {
  if (!e.target.closest('#theme-panel')) {
    document.getElementById('theme-swatches').classList.remove('open');
  }
});

/* =================================SYSTÈME AUDIO — AMBIANCE LUXE V12==========================================
                            Web Audio API : moteur grave + pad harmonique + shimmer
                                   Aucune dépendance externe requise
============================================================================================================ */
let audioCtx = null, masterGain = null, allNodes = [];
let audioPlaying = false;

function toggleAudio() {
  const btn = document.getElementById('audio-fab');
  if (!audioCtx) {
    // Première activation : initialiser le contexte audio
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 1.5);
    masterGain.connect(audioCtx.destination);
    createLuxuryAmbience();
    audioPlaying = true;
  } else if (audioPlaying) {
    // Fade out progressif
    masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.8);
    audioPlaying = false;
  } else {
    // Fade in
    masterGain.gain.setTargetAtTime(0.18, audioCtx.currentTime, 0.8);
    audioPlaying = true;
  }
  btn.innerHTML = audioPlaying
    ? '🔊<span id="audio-label">Ambiance V12</span>'
    : '🔇<span id="audio-label">Ambiance V12</span>';
  btn.classList.toggle('playing', audioPlaying);
}

function createLuxuryAmbience() {
  const ctx = audioCtx;

  // ── 1. Grondement grave (moteur en veille) ──────────────────
  [30, 45, 60].forEach((hz, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = hz;
    gain.gain.value = 0.06 / (i + 1);
    // LFO pour animer légèrement le gain
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.15 + i * 0.05;
    lfoGain.gain.value = 0.012;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();
    osc.connect(gain); gain.connect(masterGain);
    osc.start();
    allNodes.push(osc, lfo);
  });

  // ── 2. Pad harmonique luxueux (cordes synthétiques) ─────────
  const padFreqs = [110, 138.6, 165, 220, 277.2, 330];
  padFreqs.forEach((hz, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz;
    osc.detune.value = (i % 2 === 0 ? 4 : -4); // légère désaccordation
    gain.gain.value = 0.018 / (i * 0.35 + 1);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    osc.connect(filter); filter.connect(gain); gain.connect(masterGain);
    osc.start();
    allNodes.push(osc);
  });

  // ── 3. Shimmer haute fréquence (brillance) ──────────────────
  const shimmer = ctx.createOscillator();
  const shimGain = ctx.createGain();
  shimmer.type = 'sine';
  shimmer.frequency.value = 2200;
  shimGain.gain.value = 0.004;
  // Modulation en amplitude
  const shimLFO = ctx.createOscillator();
  const shimLFOGain = ctx.createGain();
  shimLFO.frequency.value = 3.5;
  shimLFOGain.gain.value = 0.003;
  shimLFO.connect(shimLFOGain); shimLFOGain.connect(shimGain.gain);
  shimLFO.start();
  shimmer.connect(shimGain); shimGain.connect(masterGain);
  shimmer.start();
  allNodes.push(shimmer, shimLFO);

  // ── 4. Bruit de fond filtré (souffle climatisation / route) ─
  const bufLen = ctx.sampleRate * 3;
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buf; noise.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass'; noiseFilter.frequency.value = 300; noiseFilter.Q.value = 0.3;
  const noiseGain = ctx.createGain(); noiseGain.gain.value = 0.008;
  noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(masterGain);
  noise.start();
  allNodes.push(noise);
}

/* ========================================================================================================= */

/* =================================  VIDEO GALLERY — Lecture preview au hover ============================== */

function initVideoGallery() {
  document.querySelectorAll('.video-card').forEach(card => {
    const preview = card.querySelector('.video-card-preview');
    if (!preview) return;

    card.addEventListener('mouseenter', () => {
      preview.currentTime = 0;
      preview.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
      preview.pause();
    });
  });
}

/* ========================================================================================================== */

/* ==========================NEON BUTTONS — Injection automatique des 4 spans animés========================= */
/* ========================= Ajoute les traits lumineux à tous les boutons de la page  ====================== */
function injectNeonSpans() {
  const selectors = [
    '.btn-primary', '.btn-secondary', '.btn-add-cart',
    '.btn-spin', '.btn-checkout', '.btn-next',
    '.btn-apply-promo', '.btn-cart', '.btn-wishlist'
  ];
  document.querySelectorAll(selectors.join(',')).forEach(btn => {
    // Éviter la double injection
    if (btn.querySelector('.btn-neon-span-1')) return;
    for (let i = 1; i <= 4; i++) {
      const s = document.createElement('span');
      s.className = 'btn-neon-span-' + i;
      btn.prepend(s);
    }
  });
}

/* ========================================================================================================== */

/* ==================================== INITIALISATION — Ordre important ==================================== */

document.addEventListener('DOMContentLoaded', () => {
  buildSlider();
  buildProducts();
  buildServices();
  buildTestimonials();
  buildWheel();
  updateLoyaltyCard();
  observeReveal();
  initVideoGallery();
  // Injecter les traits neon sur tous les boutons (y compris générés dynamiquement)
  injectNeonSpans();

  // Observer le panier pour ré-injecter sur les nouveaux boutons ajoutés dynamiquement
  const cartObserver = new MutationObserver(() => injectNeonSpans());
  const cartBody = document.getElementById('cart-body');
  if (cartBody) cartObserver.observe(cartBody, { childList: true, subtree: true });

  // Lancer l'animation de la barre fidélité au scroll
  const loyaltyObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        updateLoyaltyCard();
        loyaltyObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const loyaltySection = document.getElementById('loyalty');
  if (loyaltySection) loyaltyObserver.observe(loyaltySection);
});

/* ========================================================================================================== */







