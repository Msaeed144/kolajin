import { motion } from "framer-motion";
import { useState } from "react";
import { reveal } from "@/lib/motion";

export function Club() {
  const [done, setDone] = useState(false);
  return (
    <section id="club" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <motion.div
        {...reveal}
        className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 md:p-14"
      >
        <div className="bg-spot absolute -left-20 -top-20 h-80 w-80" />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">باشگاه مشتریان</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              عضو شوید تا از تخفیف‌ها، منوی فصلی و آش‌های نذری باخبر شوید.
            </p>
          </div>
          {done ? (
            <p className="text-lg font-bold text-primary">
              ممنون! به زودی با شما در تماس خواهیم بود.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="flex flex-col gap-3"
            >
              <input
                required
                placeholder="نام"
                className="rounded-xl border border-input bg-background/60 px-4 py-3 outline-none focus:border-primary"
              />
              <input
                required
                placeholder="ایمیل یا شماره موبایل"
                className="rounded-xl border border-input bg-background/60 px-4 py-3 outline-none focus:border-primary"
              />
              <button className="bg-saffron-gradient shadow-glow rounded-xl py-3 font-bold text-primary-foreground">
                عضویت
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
