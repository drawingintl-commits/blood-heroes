import type { MetadataRoute } from "next";

const baseUrl = "https://blood-heroes.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/feed",
    "/donations/new",
    "/login",
    "/legal/terms",
    "/legal/privacy",
    "/legal/guidelines",
    "/legal/portrait-consent"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));
}
