import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Blood Heroes",
    short_name: "BloodHeroes",
    description: "献血者を称賛するSNS型コミュニティ",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdfa",
    theme_color: "#df2f3f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
