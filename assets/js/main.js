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

// Initialize
setLang('fr');

// WhatsApp Float Logic
document.addEventListener('DOMContentLoaded', () => {
  const waBtn = document.createElement('div');
  waBtn.className = 'whatsapp-float';
  waBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  waBtn.onclick = sendDirectWhatsApp;
  document.body.appendChild(waBtn);

  setTimeout(() => {
    waBtn.classList.add('show');
  }, 3000);
});
