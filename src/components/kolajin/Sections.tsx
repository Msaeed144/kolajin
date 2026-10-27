import { motion } from "framer-motion";
import { useState } from "react";
import { dishes } from "@/lib/dishes";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <motion.h2 {...reveal} className="text-4xl font-black md:text-5xl">منوی <span className="text-gradient">کلاجین</span></motion.h2>
      <p className="mt-3 text-muted-foreground">هر روز تازه، با دستور پخت خانگی.</p>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {dishes.map((d, i) => (
          <motion.article key={d.id} {...reveal} transition={{ duration: 0.7, delay: i * 0.1 }} className="group rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40">
            <div className="relative">
              <div className="bg-spot absolute inset-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <img src={d.image} alt={d.name} width={1024} height={1024} loading="lazy" className="relative mx-auto w-4/5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105" />
            </div>
            <h3 className="mt-4 text-2xl font-bold">{d.name}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{d.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-bold text-primary">{d.price}</span>
              <button className="bg-saffron-gradient rounded-full px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105">سفارش</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-y border-border bg-card/30 py-28">
      <motion.div {...reveal} className="mx-auto max-w-3xl px-5 text-center">
        <p className="text-sm tracking-widest text-primary">درباره ما</p>
        <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">طعمی که از آشپزخانه‌ی مادربزرگ آمده</h2>
        <p className="mt-6 text-lg leading-9 text-muted-foreground">
          کلاجین با یک دیگ آش و یک دفتر دستور پخت قدیمی شروع شد. ما هنوز همان‌طور می‌پزیم: آرام، با سبزی تازه‌ی روز و مواد اولیه‌ی دست‌چین. (این متن نمونه است و قابل ویرایش.)
        </p>
      </motion.div>
    </section>
  );
}

export function Club() {
  const [done, setDone] = useState(false);
  return (
    <section id="club" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <motion.div {...reveal} className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 md:p-14">
        <div className="bg-spot absolute -left-20 -top-20 h-80 w-80" />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">باشگاه مشتریان</h2>
            <p className="mt-4 leading-8 text-muted-foreground">عضو شوید تا از تخفیف‌ها، منوی فصلی و آش‌های نذری باخبر شوید.</p>
          </div>
          {done ? (
            <p className="text-lg font-bold text-primary">ممنون! به زودی با شما در تماس خواهیم بود.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex flex-col gap-3">
              <input required placeholder="نام" className="rounded-xl border border-input bg-background/60 px-4 py-3 outline-none focus:border-primary" />
              <input required placeholder="ایمیل یا شماره موبایل" className="rounded-xl border border-input bg-background/60 px-4 py-3 outline-none focus:border-primary" />
              <button className="bg-saffron-gradient shadow-glow rounded-xl py-3 font-bold text-primary-foreground">عضویت</button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="text-gradient text-2xl font-black">کلاجین</p>
          <p className="mt-2 text-sm text-muted-foreground">آش، حلیم و شله قلمکار</p>
        </div>
        <div className="text-sm leading-8 text-muted-foreground">
          <p>تهران، خیابان نمونه، پلاک ۱۲</p>
          <p>۰۲۱-۰۰۰۰۰۰۰۰</p>
        </div>
        <div className="flex gap-4 text-sm md:justify-end">
          <a href="#" className="text-muted-foreground hover:text-primary">اینستاگرام</a>
          <a href="#" className="text-muted-foreground hover:text-primary">تلگرام</a>
          <a href="#" className="text-muted-foreground hover:text-primary">واتس‌اپ</a>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">© ۱۴۰۵ کلاجین. تمامی حقوق محفوظ است.</p>
    </footer>
  );
}
