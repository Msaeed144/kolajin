export const navItems = [
  { id: "home", label: "خانه" },
  { id: "products", label: "محصولات" },
  { id: "about", label: "درباره ما" },
  { id: "club", label: "باشگاه مشتریان" },
];

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
