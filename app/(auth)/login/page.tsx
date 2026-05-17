import { ErrorNotice } from "@/components/error-notice";
import { LoginForm } from "@/components/login-form";
import { getCurrentUserProfile } from "@/lib/supabase/queries";

export const metadata = {
  title: "ログイン"
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const { user, error } = await getCurrentUserProfile();

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
        <div>
          {error ? <ErrorNotice message={error} /> : null}
          <LoginForm email={user?.email} isLoggedIn={Boolean(user)} />
        </div>
      </section>
    </div>
  );
}
