## تقرير التعديلات المقترحة لمشروع Peintel-Saif

**المقدمة:**
يهدف هذا التقرير إلى تقديم توجيهات مفصلة لنموذج "كيمي" لتنفيذ تعديلات على مشروع Peintel-Saif، وذلك بناءً على طلب المستخدم. تشمل التعديلات الرئيسية إضافة صور خلفية لبطاقات الخدمات، وإضافة فيديو خلفية متحرك لقسم الهيرو (Hero Section) على الأجهزة المحمولة.

### 1. إضافة صور خلفية لبطاقات الخدمات:

**الهدف:**
إضافة صورة خلفية لكل بطاقة خدمة في قسم "الخدمات" (Services)، مع الحفاظ على النص الحالي باللون الأبيض وطبقة شفافة (overlay) فوق الصورة لضمان وضوح النص.

**الملفات المتأثرة:**
*   `assets/js/main.js`
*   `assets/css/style.css`

**الخطوات المقترحة لـ "كيمي":**

**أ. تعديل `assets/js/main.js`:**
1.  **تعريف مصفوفة صور الخدمات:**
    *   أضف مصفوفة جديدة تحتوي على مسارات الصور لكل خدمة. يجب أن يتطابق ترتيب الصور مع ترتيب الخدمات في ملفات الترجمة (مثل `ar.json`).
    *   مثال:
        ```javascript
        const serviceBackgroundImages = [
          'assets/images/service-interior.jpg', // لـ Peinture intérieure
          'assets/images/service-exterior.jpg', // لـ Peinture extérieure
          'assets/images/service-spray.jpg',    // لـ Peinture au pistolet
          'assets/images/service-insulating.jpg', // لـ Peinture isolante thermique
          'assets/images/service-concrete.jpg', // لـ Béton ciré
          'assets/images/service-floor.jpg',    // لـ Revêtement de sol
          'assets/images/service-facade.jpg'    // لـ Rénovation de façade (إذا كانت موجودة)
        ];
        ```
        **ملاحظة:** يجب على "كيمي" اختيار صور مناسبة لكل خدمة من الصور التي تم البحث عنها أو صور أخرى ذات صلة، وحفظها في المسار `assets/images/`.

2.  **تعديل حلقة إنشاء بطاقات الخدمات:**
    *   داخل الدالة `setLang`، في الجزء الخاص بإنشاء بطاقات الخدمات (`data.services.forEach`), قم بتعديل `card.innerHTML` ليشمل الصورة كخلفية وطبقة شفافة.
    *   ابحث عن الكود التالي (تقريباً السطر 41):
        ```html
        card.innerHTML = `
          <div class="service-icon">${serviceIcons[i] || '🖌️'}</div>
          <div class="service-name">${s}</div>
        `;
        ```
    *   استبدله بالكود التالي:
        ```html
        card.innerHTML = `
          <div class="service-bg-image" style="background-image: url(${serviceBackgroundImages[i] || ''});"></div>
          <div class="service-overlay"></div>
          <div class="service-content">
            <div class="service-icon">${serviceIcons[i] || '🖌️'}</div>
            <div class="service-name">${s}</div>
          </div>
        `;
        ```

**ب. تعديل `assets/css/style.css`:**
1.  **تعديل تنسيق `service-card`:**
    *   ابحث عن `.service-card` (تقريباً السطر 388).
    *   أضف الخصائص التالية لجعله حاوية للصور والطبقات:
        ```css
        .service-card {
          position: relative; /* لتمكين تحديد موضع العناصر الداخلية */
          overflow: hidden; /* لإخفاء أي جزء زائد من الصورة */
          color: var(--white); /* لجعل النص أبيض بشكل افتراضي */
          /* ... احتفظ بالخصائص الأخرى الموجودة ... */
        }
        .service-card:hover {
          /* ... احتفظ بالخصائص الموجودة ... */
          transform: translateY(-4px) scale(1.02); /* إضافة تأثير تكبير بسيط */
        }
        ```

2.  **إضافة تنسيقات `service-bg-image` و `service-overlay` و `service-content`:**
    *   أضف التنسيقات التالية في نهاية ملف `style.css` أو في مكان مناسب ضمن قسم الخدمات:
        ```css
        .service-bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.7); /* لجعل الصورة أغمق قليلاً */
          transition: transform 0.5s ease; /* لتأثير التكبير عند التحويم */
          z-index: 0;
        }
        .service-card:hover .service-bg-image {
          transform: scale(1.1); /* تكبير الصورة عند التحويم */
        }
        .service-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4); /* طبقة شفافة داكنة */
          z-index: 1;
        }
        .service-content {
          position: relative;
          z-index: 2; /* لضمان ظهور المحتوى فوق الصورة والطبقة */
          display: flex;
          flex-direction: column;
          align-items: center; /* توسيط الأيقونة والنص */
          justify-content: center; /* توسيط الأيقونة والنص عمودياً */
          height: 100%; /* لملء البطاقة بالكامل */
          text-align: center;
        }
        .service-icon {
          font-size: 48px; /* تكبير الأيقونة */
          margin-bottom: 16px;
          color: var(--gold-light); /* لون ذهبي للأيقونات */
        }
        .service-name {
          font-weight: 700;
          font-size: 18px;
          color: var(--white); /* لون أبيض للنص */
        }
        ```

### 2. إضافة فيديو خلفية لقسم الهيرو (Hero Section) على الأجهزة المحمولة:

**الهدف:**
إضافة فيديو خلفية متحرك لقسم الهيرو (Hero Section) يظهر فقط على الأجهزة المحمولة، مع طبقة شفافة داكنة فوق الفيديو لضمان وضوح النص الأبيض.

**الملفات المتأثرة:**
*   `index.html`
*   `assets/css/style.css`

**الخطوات المقترحة لـ "كيمي":**

**أ. تعديل `index.html`:**
1.  **إضافة عنصر الفيديو والطبقة الشفافة:**
    *   ابحث عن `div` ذو الفئة `hero-bg` (تقريباً السطر 36).
    *   داخل هذا الـ `div`، أضف كود الفيديو والطبقة الشفافة. يجب أن يكون الفيديو قبل الأشكال (`hero-shape`) لضمان ظهوره كخلفية.
    *   مثال:
        ```html
        <div class="hero-bg">
          <video autoplay loop muted playsinline class="hero-video-bg">
            <source src="assets/videos/hero-background.mp4" type="video/mp4">
            <source src="assets/videos/hero-background.webm" type="video/webm">
            <!-- يمكنك إضافة صورة بديلة هنا إذا لم يتم تشغيل الفيديو -->
          </video>
          <div class="hero-video-overlay"></div>
          <div class="hero-shape shape1"></div>
          <div class="hero-shape shape2"></div>
          <div class="hero-shape shape3"></div>
        </div>
        ```
        **ملاحظة:** يجب على "كيمي" اختيار فيديو مناسب (مثل الفيديو رقم 1 أو 2 من نتائج البحث) وحفظه في المسار `assets/videos/` بتنسيقات متعددة (`.mp4`, `.webm`) لضمان التوافقية.

**ب. تعديل `assets/css/style.css`:**
1.  **تنسيق الفيديو والطبقة الشفافة:**
    *   أضف التنسيقات التالية في نهاية ملف `style.css` أو في مكان مناسب ضمن قسم الهيرو:
        ```css
        .hero-video-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          z-index: -1; /* ليكون خلف المحتوى */
          transform: translate(-50%, -50%);
          background-size: cover;
          filter: brightness(0.6); /* لجعل الفيديو أغمق قليلاً */
          display: none; /* إخفاء الفيديو افتراضياً */
        }
        .hero-video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4); /* طبقة شفافة داكنة */
          z-index: 0; /* فوق الفيديو وتحت المحتوى */
          display: none; /* إخفاء الطبقة افتراضياً */
        }
        ```

2.  **تطبيق الفيديو والطبقة الشفافة على الأجهزة المحمولة فقط:**
    *   ابحث عن استعلام الوسائط (`@media (max-width: 768px)`) (تقريباً السطر 635).
    *   داخل هذا الاستعلام، أضف التنسيقات التالية لإظهار الفيديو والطبقة الشفافة على الأجهزة المحمولة:
        ```css
        @media (max-width: 768px) {
          .hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .hero-visual { display: none; }
          .hero-video-bg, .hero-video-overlay {
            display: block; /* إظهار الفيديو والطبقة الشفافة */
          }
          .hero-content h1, .hero-sub, .hero-tag, .stat-num, .stat-label {
            color: var(--white); /* جعل النص أبيض ليتناسب مع الخلفية الداكنة */
          }
          .hero-tag {
            border-color: rgba(255,255,255,0.4);
          }
          .stat-divider {
            background: rgba(255,255,255,0.2);
          }
          /* ... احتفظ بالخصائص الأخرى الموجودة ... */
        }
        ```

**ملاحظات إضافية لـ "كيمي":**
*   تأكد من إنشاء مجلدات `assets/images` و `assets/videos` إذا لم تكن موجودة. 
*   اختبر التغييرات على متصفحات وأجهزة مختلفة لضمان التوافقية والاستجابة الجيدة.
*   قم بتحسين حجم الصور والفيديوهات لضمان أداء موقع سريع.

**المراجع:**
لا يوجد مراجع خارجية في هذا التقرير.
