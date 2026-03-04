# Peintel – Landing Page

Landing page احترافية لشركة دهانات وتجديد.

## 🌐 الرابط المباشر (بعد النشر)

```
https://saif.github.io/peintel-Saif/
```

---

## 📁 هيكل المشروع

```
peintel-Saif/
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── locales/
│   ├── fr.json   (الفرنسية – الأساسية)
│   ├── en.json   (الإنجليزية)
│   └── ar.json   (العربية RTL)
└── README.md
```

---

## 🚀 خطوات رفع المشروع على GitHub Pages

### 1. إنشاء Repository

1. اذهب إلى [github.com](https://github.com) وسجّل دخولك
2. اضغط **New repository**
3. اكتب الاسم: `peintel-Saif`
4. اجعله **Public**
5. اضغط **Create repository**

### 2. رفع الملفات

```bash
cd peintel-Saif
git init
git add .
git commit -m "Initial commit - Peintel landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/peintel-Saif.git
git push -u origin main
```

> 💡 بدّل `YOUR_USERNAME` باسم حسابك على GitHub

### 3. تفعيل GitHub Pages

1. افتح المشروع على GitHub
2. اذهب إلى **Settings** → **Pages**
3. في **Source**: اختر `main` وضع المسار `/` (root)
4. اضغط **Save**

⏳ انتظر دقيقة ثم افتح:  
`https://YOUR_USERNAME.github.io/peintel-Saif/`

---

## ⚙️ تخصيص

### تغيير رقم واتساب
افتح `assets/js/main.js` وابحث عن:
```
wa.me/33605537778
```
بدّله برقمك.

### إضافة صورة حقيقية
ضع صورة في `assets/img/hero.jpg`
ثم في `index.html` استبدل `<div class="hero-img-placeholder">` بـ:
```html
<img src="assets/img/hero.jpg" alt="Peintel" class="hero-img-real">
```

---

## ✨ المميزات

- ✅ 3 لغات (FR / EN / AR + RTL)
- ✅ يفتح واتساب تلقائياً بالبيانات
- ✅ Responsive (موبايل + ديسكتوب)
- ✅ Static – يعمل على GitHub Pages مجاناً
- ✅ سريع التحميل (بدون فريمووركس ثقيلة)
