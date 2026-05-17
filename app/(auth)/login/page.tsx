import { Mail, UserRound } from "lucide-react";
import { Button, LinkButton } from "@/components/button";

export const metadata = {
  title: "ログイン"
};

export default function LoginPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-5xl place-items-center px-4 py-10">
      <section className="grid w-full gap-8 rounded-lg border border-rose-100 bg-white p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="rounded-lg bg-hero-soft p-6">
          <p className="text-sm font-bold text-hero-red">おかえりなさい</p>
          <h1 className="mt-3 text-3xl font-black">献血の記録を、誇れる文化へ。</h1>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            Googleログインとメールログインに対応する設計です。Supabase Authの設定後、そのまま本番ログインに切り替えられます。
          </p>
        </div>
        <form className="space-y-4">
          <Button className="w-full" type="button">
            <UserRound size={18} aria-hidden />
            Googleでログイン
          </Button>
          <div className="relative py-2 text-center text-xs font-bold text-stone-400">
            <span className="bg-white px-3">または</span>
            <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-stone-200" />
          </div>
          <label className="space-y-2">
            <span className="text-sm font-bold">メールアドレス</span>
            <input
              className="w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
              placeholder="hero@example.com"
              type="email"
            />
          </label>
          <Button className="w-full" type="button" variant="secondary">
            <Mail size={18} aria-hidden />
            ログインリンクを送る
          </Button>
          <LinkButton className="w-full" href="/donations/new" variant="ghost">
            デモ投稿を試す
          </LinkButton>
        </form>
      </section>
    </div>
  );
}
