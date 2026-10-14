# 🎉 Code Party — موقع تعليم البرمجة

موقع عربي بسيط (HTML / CSS / JavaScript بدون أي build) لتعلم البرمجة بـ **١٢ لغة**:

Python · JavaScript · TypeScript · Java · C · C++ · C# · Go · Rust · PHP · Kotlin · Swift

## المميزات
- ٧ دروس لكل لغة: Hello World، المتغيرات، الشروط، التكرار، الدوال، القوائم، الكلاسات (OOP)
- أمثلة كود جاهزة بتلوين بسيط وزرار نسخ + أمر التشغيل
- اختبار سريع (٣ أسئلة) لكل لغة
- حفظ التقدم والنتائج في المتصفح (localStorage)
- وضع فاتح / داكن، وبحث في اللغات، ومتجاوب مع الموبايل

## التشغيل محلياً
افتح `index.html` في المتصفح مباشرة، أو:

```bash
python -m http.server 8000
# ثم افتح http://localhost:8000
```

## النشر على GitHub Pages
1. ارفع الملفات على الـ repo (branch `main`).
2. من **Settings → Pages** اختار `Deploy from a branch` ثم `main` / `root`.
3. الموقع هيشتغل على `https://<username>.github.io/<repo>/`.

## هيكل المشروع
```
index.html   الصفحة الرئيسية
style.css    التصميم
data.js      الدروس + أكواد اللغات + الأسئلة
app.js       المنطق (التنقل، التقدم، الاختبارات)
```

## إضافة لغة جديدة
أضف كائن جديد في مصفوفة `LANGS` داخل `data.js` بنفس الشكل (name, color, ext, about, uses, run, code, quiz).
