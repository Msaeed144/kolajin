import ash from "@/assets/ash.png";
import shole from "@/assets/shole.png";
import halim from "@/assets/halim.png";

export type Dish = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
};

// Replace images in src/assets/ (ash.png, shole.png, halim.png) to swap the bowls.
export const dishes: Dish[] = [
  {
    id: "ash",
    name: "آش رشته",
    tagline: "سبزی تازه، کشک و نعناداغ",
    description: "رشته، حبوبات و سبزی معطر، با کشک محلی، پیاز داغ طلایی و نعناداغ.",
    image: ash,
    price: "۱۸۵٬۰۰۰ تومان",
  },
  {
    id: "shole",
    name: "آش شله قلمکار",
    tagline: "زعفران، دارچین و پیاز داغ",
    description: "برنج، حبوبات و سبزی که ساعت‌ها آرام پخته شده؛ با رگه‌های زعفران و دارچین.",
    image: shole,
    price: "۲۲۰٬۰۰۰ تومان",
  },
  {
    id: "halim",
    name: "حلیم",
    tagline: "کره، دارچین و شکر",
    description: "گندم و گوشت ریش‌ریش، کشیده و مخملی؛ با کره‌ی آب‌شده، دارچین و شکر.",
    image: halim,
    price: "۱۹۵٬۰۰۰ تومان",
  },
];
