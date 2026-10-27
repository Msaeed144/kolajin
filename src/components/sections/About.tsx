import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-y border-border bg-card/30 py-28"
    >
      <motion.div {...reveal} className="mx-auto max-w-3xl px-5 text-center">
        <p className="text-sm tracking-widest text-primary">درباره ما</p>
        <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
          طعمی که از آشپزخانه‌ی مادربزرگ آمده
        </h2>
        <p className="mt-6 text-lg leading-9 text-muted-foreground">
          کلاجین با یک دیگ آش و یک دفتر دستور پخت قدیمی شروع شد. ما هنوز
          همان‌طور می‌پزیم: آرام، با سبزی تازه‌ی روز و مواد اولیه‌ی دست‌چین.
          (این متن نمونه است و قابل ویرایش.)
        </p>
      </motion.div>
    </section>
  );
}
