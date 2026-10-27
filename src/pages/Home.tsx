import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Club } from "@/components/sections/Club";
import { Products } from "@/components/sections/Products";
import { Showcase } from "@/components/sections/Showcase";

export function Home() {
  return (
    <div dir="rtl">
      <Header />
      <main>
        <Showcase />
        <Products />
        <About />
        <Club />
      </main>
      <Footer />
    </div>
  );
}
