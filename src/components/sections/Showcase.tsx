import { ClientOnly } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { dishes } from "@/lib/dishes";
import { scrollToId } from "@/lib/navigation";
import { showcaseState } from "@/lib/scroll-state";

const BowlScene = lazy(() => import("@/components/three/BowlScene"));

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px)");
    const f = () => setM(q.matches);
    f();
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  return m;
}

function StaticBowl({ active }: { active: number }) {
  return (
    <div className="relative flex h-full items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={active}
          src={dishes[active]!.image}
          alt={dishes[active]!.name}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="w-[78%] max-w-sm drop-shadow-2xl"
        />
      </AnimatePresence>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-steam absolute top-1/3 h-16 w-16 rounded-full bg-foreground/20 blur-xl"
          style={{ animationDelay: `${i * 1.1}s`, right: `${40 + i * 8}%` }}
        />
      ))}
    </div>
  );
}

export function Showcase() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const mobile = useIsMobile();

  useEffect(() => {
    let kill: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const proxy = { p: 0 };
      const st = ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          gsap.to(proxy, {
            p: self.progress * (dishes.length - 1),
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => {
              showcaseState.progress = proxy.p;
              setProgress(self.progress);
              setActive(Math.round(proxy.p));
            },
          });
        },
      });
      kill = () => st.kill();
    })();
    return () => kill?.();
  }, []);

  const d = dishes[active] ?? dishes[0]!;

  return (
    <section
      id="home"
      ref={section}
      className="relative"
      style={{ height: `${dishes.length * 100 + 40}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="bg-spot pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative mx-auto grid h-full max-w-6xl grid-rows-[1fr_auto] items-center px-5 pt-16 md:grid-cols-2 md:grid-rows-1">
          <div className="order-2 pb-10 md:order-1 md:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45 }}
              >
                <h1 className="text-5xl font-black leading-tight md:text-7xl">
                  {d.name}
                </h1>
                <p className="mt-3 text-lg text-primary">{d.tagline}</p>
                <p className="mt-4 max-w-md leading-8 text-muted-foreground">
                  {d.description}
                </p>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={() => scrollToId("products")}
              className="bg-[#ffa318] shadow-glow mt-8 rounded-full px-7 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              سفارش دهید
            </button>
            <div className="mt-8 h-0.5 w-40 overflow-hidden rounded bg-muted">
              <div
                className="h-full bg-primary"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
          <div className="order-1 h-full min-h-[45vh] md:order-2">
            <ClientOnly fallback={<StaticBowl active={0} />}>
              {mobile ? (
                <StaticBowl active={active} />
              ) : (
                <Suspense fallback={<StaticBowl active={active} />}>
                  <BowlScene mobile={mobile} />
                </Suspense>
              )}
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
  );
}
