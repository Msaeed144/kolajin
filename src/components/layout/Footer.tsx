export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="text-gradient text-2xl font-black">کلاجین</p>
          <p className="mt-2 text-sm text-muted-foreground">
            آش، حلیم و شله قلمکار
          </p>
        </div>
        <div className="text-sm leading-8 text-muted-foreground">
          <p>تهران، خیابان نمونه، پلاک ۱۲</p>
          <p>۰۲۱-۰۰۰۰۰۰۰۰</p>
        </div>
        <div className="flex gap-4 text-sm md:justify-end">
          <a href="#" className="text-muted-foreground hover:text-primary">
            اینستاگرام
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            تلگرام
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary">
            واتس‌اپ
          </a>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">
        © ۱۴۰۵ کلاجین. تمامی حقوق محفوظ است.
      </p>
    </footer>
  );
}
