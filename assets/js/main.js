// ===== PEINTEL MAIN JS =====

let currentLang = 'fr';
let translationCache = {}; // تخزين مؤقت للترجمات

// const serviceIcons = ['🎨', '🏠', '💨', '🌡️', '⬜', '🪵', '🧱'];
const serviceIcons = [];

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

  // Force Portfolio Carousel to always stay LTR as per requirements
  const portfolioSection = document.getElementById('portfolio');
  if (portfolioSection) {
    portfolioSection.dir = 'ltr';
  }

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

    // Update Logo Text
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
      if (lang === 'ar') {
        logoText.innerHTML = 'بينتل';
      } else {
        logoText.innerHTML = '<span class="logo-p">P</span>eintel';
      }
    }

    // Update Footer Logo Text
    const footerLogoText = document.querySelector('.footer-logo span');
    if (footerLogoText) {
      footerLogoText.textContent = (lang === 'ar') ? 'بينتل' : 'Peintel';
    }

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
  const serviceSelect = document.getElementById('serviceSelect');
  const addressInput = document.getElementById('address');
  const phoneInput = document.getElementById('phone');
  const detailsInput = document.getElementById('details');

  const service = serviceSelect.value.trim();
  const address = addressInput.value.trim();
  const phone = phoneInput.value.trim();
  const details = detailsInput.value.trim();

  // Validation messages
  const validationMsgs = {
    fr: {
      service: 'Veuillez sélectionner un service',
      address: 'Veuillez entrer votre adresse',
      phone: 'Veuillez entrer un numéro de téléphone valide (au moins 8 chiffres)',
    },
    en: {
      service: 'Please select a service',
      address: 'Please enter your address',
      phone: 'Please enter a valid phone number (at least 8 digits)',
    },
    ar: {
      service: 'يرجى اختيار خدمة',
      address: 'يرجى إدخال عنوانك',
      phone: 'يرجى إدخال رقم هاتف صحيح (8 أرقام على الأقل)',
    },
  };

  const msgs = validationMsgs[currentLang] || validationMsgs.fr;

  // Validate service
  if (!service) {
    alert(msgs.service);
    serviceSelect.focus();
    return;
  }

  // Validate address
  if (!address) {
    alert(msgs.address);
    addressInput.focus();
    return;
  }

  // Validate phone (basic check: at least 8 digits)
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 8) {
    alert(msgs.phone);
    phoneInput.focus();
    return;
  }

  // Build WhatsApp message
  const whatsappMsgs = {
    fr: `Bonjour Peintel 👋%0AService: ${service}%0AAdresse: ${address}%0ATéléphone: ${phone}${details ? '%0ADétails: ' + details : ''}`,
    en: `Hello Peintel 👋%0AService: ${service}%0AAddress: ${address}%0APhone: ${phone}${details ? '%0ADetails: ' + details : ''}`,
    ar: `مرحبا Peintel 👋%0Aالخدمة: ${service}%0Aالعنوان: ${address}%0Aالهاتف: ${phone}${details ? '%0Aتفاصيل: ' + details : ''}`,
  };

  const msg = whatsappMsgs[currentLang] || whatsappMsgs.fr;
  window.open(`https://wa.me/33605537778?text=${msg}`, '_blank');
  closeModal();
}

function sendDirectWhatsApp() {
  const msgs = {
    fr: 'Bonjour Peintel 👋, je souhaite en savoir plus sur vos services.',
    en: 'Hello Peintel 👋, I would like to know more about your services.',
    ar: 'مرحبا Peintel 👋، أريد الاستفسار عن خدماتكم.',
  };
  window.open(`https://wa.me/33605537778?text=${encodeURIComponent(msgs[currentLang] || msgs.fr)}`, '_blank');
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

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    button:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible {
      outline: 3px solid var(--blue-light);
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
});

// Initialize
setLang('fr');
