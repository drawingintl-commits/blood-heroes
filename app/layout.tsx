import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://blood-heroes.example.com"),
  title: {
    default: "Blood Heroes | 献血者を称賛するSNSコミュニティ",
    template: "%s | Blood Heroes"
  },
  description:
    "献血回数を可視化し、善意を称賛するSNS型コミュニティ。Instagramでシェアできる献血カードを作成できます。",
  applicationName: "Blood Heroes",
  openGraph: {
    title: "Blood Heroes",
    description: "あなたの1回が、誰かの未来になる。",
    type: "website",
    locale: "ja_JP"
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
    <html lang="ja">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
