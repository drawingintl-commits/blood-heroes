import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "献血ヒーローズ",
    short_name: "献血ヒーローズ",
    description: "献血を称え、善意を広げるSNSコミュニティ",
    lang: "ja",
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
