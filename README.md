My Next.js 15 Project
این پروژه یک سیستم مدیریت محتوا با قابلیت اضافه کردن، ویرایش، و حذف محتوا است که با استفاده از فریم‌ورک Next.js نوشته شده است. همچنین، در صفحه دوم این پروژه، اطلاعات به صورت چارت‌های مختلف نمایش داده می‌شود.

🚀 ویژگی‌ها
مدیریت محتوا : امکان اضافه کردن، ویرایش، و حذف محتوا.
نمایش آماری : نمایش اطلاعات به صورت چارت‌های مختلف با استفاده از کتابخانه Recharts .
استفاده از Context API : برای مدیریت وضعیت بین صفحات و بروزرسانی صفحه اصلی بدون نیاز به بازخوانی.
دیتابیس : استفاده از Prisma برای مدیریت دیتابیس.
UI Components : استفاده از کتابخانه‌هایی مانند Tailwind CSS و Lucide React Icons برای طراحی رابط کاربری.
Toastify : نمایش اعلان‌های کاربری با استفاده از React Toastify .
🛠️ نصب و راه‌اندازی
پیش‌نیازها
Node.js (نسخه 18 یا بالاتر)
npm یا yarn
Database (PostgreSQL توصیه می‌شود)
راه‌اندازی
Clone Repository

git clone https://github.com/your-repo-url.git
cd my-next15-project
نصب وابستگی‌ها

npm install
# یا اگر از Yarn استفاده می‌کنید:
yarn install
پیکربندی دیتابیس
فایل .env را در ریشه پروژه ایجاد کنید و اطلاعات دیتابیس خود را تنظیم کنید:

DATABASE_URL="file:./dev.db"

npx prisma migrate dev
اجرای پروژه

npm run dev
# یا
yarn dev
پروژه در http://localhost:3000 قابل دسترسی خواهد بود.