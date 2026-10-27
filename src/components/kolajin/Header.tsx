import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const navItems = [
  { id: "home", label: "خانه" },
  { id: "products", label: "محصولات" },
  { id: "about", label: "درباره ما" },
  { id: "club", label: "باشگاه مشتریان" },
];

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const [open, setOpen] = useState(false);
  const go = (id: string) => { setOpen(false); scrollToId(id); };
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button onClick={() => go("home")} className="text-2xl font-black tracking-tight">
          <span className="text-gradient">کلاجین</span>
          <span className="mr-2 text-xs font-medium text-muted-foreground">Kolajin</span>
        </button>
        <nav className="hidden gap-8 md:flex">
          {navItems.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {n.label}
            </button>
          ))}
        </nav>
        <button aria-label="منو" onClick={() => setOpen((o) => !o)} className="relative h-10 w-10 md:hidden">
          <motion.span animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }} className="absolute right-2 left-2 top-1/2 h-0.5 bg-foreground" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="absolute right-2 left-2 top-1/2 h-0.5 bg-foreground" />
          <motion.span animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }} className="absolute right-2 left-2 top-1/2 h-0.5 bg-foreground" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background/90 md:hidden"
          >
            {navItems.map((n, i) => (
              <motion.button
                key={n.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => go(n.id)}
                className="block w-full px-6 py-4 text-right text-lg"
              >
                {n.label}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
