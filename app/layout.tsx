import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://blood-heroes.example.com"),
  title: {
    default: "献血ヒーローズ | 献血者を称賛するSNSコミュニティ",
    template: "%s | 献血ヒーローズ"
  },
  description:
    "献血回数を可視化し、善意を称賛する日本国内向けSNS型コミュニティ。Instagramでシェアできる献血カードを作成できます。",
  applicationName: "献血ヒーローズ",
  openGraph: {
    title: "献血ヒーローズ",
    description: "あなたの1回が、誰かの未来になる。献血者を称賛する日本国内向けSNSコミュニティ。",
    type: "website",
    locale: "ja_JP"
  },
  twitter: {
    card: "summary_large_image",
    title: "献血ヒーローズ",
    description: "あなたの1回が、誰かの未来になる。献血者を称賛する日本国内向けSNSコミュニティ。"
  },
  alternates: {
    canonical: "/",
    languages: {
      ja: "/"
    }
  },
  other: {
    "content-language": "ja",
    google: "notranslate"
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
    <html lang="ja" translate="no">
      <body className="notranslate">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
