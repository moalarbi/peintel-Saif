// ===== PEINTEL MAIN JS =====

let currentLang = 'fr';
let translationCache = {}; // تخزين مؤقت للترجمات

const serviceIcons = ['🎨', '🏠', '💨', '🌡️', '⬜', '🪵', '🧱'];

const serviceBackgroundImages = [
  'assets/images/service-interior.jpg', // Peinture intérieure
  'assets/images/service-exterior.jpg', // Peinture extérieure
  'assets/images/service-spray.jpg',    // Peinture au pistolet
  'assets/images/service-insulating.jpg', // Peinture isolante thermique
  'assets/images/service-concrete.jpg', // Béton ciré
  'assets/images/service-floor.jpg',    // Revêtement de sol
  'assets/images/service-facade.jpg'    // Rénovation de façade
];

async function setLang(lang) {
  currentLang = lang;

  // Update HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  // Update active button
  document.querySelectorAll('.lang-switch button').forEach(btn => btn.classList.remove('lang-active'));
  const activeBtn = document.getElementById('btn-' + lang);
  if (activeBtn) activeBtn.classList.add('lang-active');

  try {
    // تحقق من التخزين المؤقت أولاً
    let data;
    if (translationCache[lang]) {
      data = translationCache[lang];
    } else {
      // إذا لم تكن موجودة في الذاكرة المؤقتة، حمّلها من الملف
      const res = await fetch(`locales/${lang}.json`);
      data = await res.json();
      // احفظها في الذاكرة المؤقتة للاستخدام المستقبلي
      translationCache[lang] = data;
    }

    // Translate elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (data[key]) el.textContent = data[key];
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (data[key]) el.placeholder = data[key];
    });

    // Build services grid
    const grid = document.getElementById('servicesList');
    grid.innerHTML = '';
    data.services.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="service-bg-image" style="background-image: url(${serviceBackgroundImages[i] || ''});"></div>
        <div class="service-overlay"></div>
        <div class="service-content">
          <div class="service-icon">${serviceIcons[i] || '🖌️'}</div>
          <div class="service-name">${s}</div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Build modal select
    const select = document.getElementById('serviceSelect');
    select.innerHTML = '';
    data.services.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      select.appendChild(opt);
    });

  } catch (err) {
    console.error('Lang load error:', err);
  }
}

function openModal() {
  document.getElementById('devisModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('devisModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('devisModal')) closeModal();
}

function sendWhatsApp() {
  const service = document.getElementById('serviceSelect').value || '';
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const details = document.getElementById('details').value.trim();

  if (!address || !phone) {
    alert(currentLang === 'ar' ? 'يرجى ملء العنوان والهاتف' : 'Veuillez remplir l\'adresse et le téléphone');
    return;
  }

  const msgs = {
    fr: `Bonjour Peintel 👋%0AService: ${service}%0AAdresse: ${address}%0ATéléphone: ${phone}${details ? '%0ADétails: ' + details : ''}`,
    en: `Hello Peintel 👋%0AService: ${service}%0AAddress: ${address}%0APhone: ${phone}${details ? '%0ADetails: ' + details : ''}`,
    ar: `مرحبا Peintel 👋%0Aالخدمة: ${service}%0Aالعنوان: ${address}%0Aالهاتف: ${phone}${details ? '%0Aتفاصيل: ' + details : ''}`,
  };

  const msg = msgs[currentLang] || msgs['fr'];
  window.open(`https://wa.me/33774555311?text=${msg}`, '_blank');
  closeModal();
}

function sendDirectWhatsApp() {
  const msgs = {
    fr: 'Bonjour Peintel, je souhaite obtenir un devis.',
    en: 'Hello Peintel, I would like to get a quote.',
    ar: 'مرحبا Peintel، أريد الحصول على عرض سعر.',
  };
  window.open(`https://wa.me/33774555311?text=${encodeURIComponent(msgs[currentLang] || msgs.fr)}`, '_blank');
}

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Keyboard ESC to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Initialize
setLang('fr');
