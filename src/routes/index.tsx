import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "کلاجین | آش، حلیم و شله قلمکار" },
      {
        name: "description",
        content:
          "کلاجین؛ آش رشته، آش شله قلمکار و حلیم تازه با دستور پخت خانگی.",
      },
      { property: "og:title", content: "کلاجین | آش، حلیم و شله قلمکار" },
      {
        property: "og:description",
        content: "آش رشته، شله قلمکار و حلیم تازه، هر روز.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
