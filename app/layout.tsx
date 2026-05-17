import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://blood-heroes.example.com"),
  title: {
    default: "献血ヒーローズ",
    template: "%s | 献血ヒーローズ"
  },
  description: "献血を称え、善意を広げるSNSコミュニティ",
  applicationName: "献血ヒーローズ",
  openGraph: {
    title: "献血ヒーローズ",
    description: "献血を称え、善意を広げるSNSコミュニティ",
    siteName: "献血ヒーローズ",
    type: "website",
    locale: "ja_JP"
  },
  twitter: {
    card: "summary_large_image",
    title: "献血ヒーローズ",
    description: "献血を称え、善意を広げるSNSコミュニティ"
  },
  alternates: {
    canonical: "/",
    languages: {
      ja: "/"
    }
  },
  other: {
    "content-language": "ja",
    google: "notranslate",
    language: "Japanese"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#df2f3f",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" dir="ltr" translate="no">
      <body className="notranslate">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
