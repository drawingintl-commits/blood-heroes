import Link from "next/link";
import type { ReactNode } from "react";
import { HeartHandshake, Home, PlusCircle, ShieldCheck, UserRound } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/feed", label: "Feed", icon: HeartHandshake },
  { href: "/donations/new", label: "Post", icon: PlusCircle },
  { href: "/login", label: "Login", icon: UserRound }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fffdfa] pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-rose-100/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link className="flex items-center gap-2 font-bold text-hero-ink" href="/">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-hero-red text-white">
              <ShieldCheck size={20} aria-hidden />
            </span>
            <span>Blood Heroes</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 hover:bg-hero-soft"
                href={item.href}
                key={item.href}
              >
                <item.icon size={17} aria-hidden />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-rose-100 bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4">
          {navItems.map((item) => (
            <Link
              className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-stone-700"
              href={item.href}
              key={item.href}
            >
              <item.icon size={21} aria-hidden />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
