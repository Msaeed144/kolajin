import { motion } from "framer-motion";
import { dishes } from "@/lib/dishes";
import { reveal } from "@/lib/motion";

export function Products() {
  return (
    <section
      id="products"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28"
    >
      <motion.h2 {...reveal} className="text-4xl font-black md:text-5xl">
        منوی <span className="text-gradient">کلاجین</span>
      </motion.h2>
      <p className="mt-3 text-muted-foreground">
        هر روز تازه، با دستور پخت خانگی.
      </p>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {dishes.map((d, i) => (
          <motion.article
            key={d.id}
            {...reveal}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
          >
            <div className="relative">
              <div className="bg-spot absolute inset-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <img
                src={d.image}
                alt={d.name}
                width={1024}
                height={1024}
                loading="lazy"
                className="relative mx-auto w-4/5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 text-2xl font-bold">{d.name}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {d.description}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-bold text-primary">{d.price}</span>
              <button className="bg-saffron-gradient rounded-full px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105">
                سفارش
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
