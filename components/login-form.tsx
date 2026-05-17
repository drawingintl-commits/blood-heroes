"use client";

import { Mail, UserRound, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button, LinkButton } from "@/components/button";
import { createClient } from "@/lib/supabase/browser";

export function LoginForm({
  isLoggedIn,
  email
}: {
  isLoggedIn: boolean;
  email?: string | null;
}) {
  const [mailAddress, setMailAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function signInWithGoogle() {
    setStatus("loading");
    setMessage(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  async function sendMagicLink() {
    setStatus("loading");
    setMessage(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: mailAddress,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("ログインリンクを送信しました。メールを確認してください。");
  }

  async function signOut() {
    setStatus("loading");
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (isLoggedIn) {
    return (
      <div className="space-y-4">
        <p className="rounded-lg bg-mint px-4 py-3 text-sm font-bold text-teal-900">
          ログイン中です{email ? `: ${email}` : "。"}
        </p>
        <LinkButton className="w-full" href="/donations/new">
          献血記録を投稿する
        </LinkButton>
        <Button className="w-full" onClick={signOut} type="button" variant="secondary">
          <LogOut size={18} aria-hidden />
          ログアウト
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        void sendMagicLink();
      }}
    >
      <Button className="w-full" onClick={signInWithGoogle} type="button">
        {status === "loading" ? <Loader2 className="animate-spin" size={18} aria-hidden /> : <UserRound size={18} aria-hidden />}
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
          onChange={(event) => setMailAddress(event.target.value)}
          placeholder="hero@example.com"
          required
          type="email"
          value={mailAddress}
        />
      </label>
      <Button className="w-full" disabled={status === "loading"} type="submit" variant="secondary">
        {status === "loading" ? <Loader2 className="animate-spin" size={18} aria-hidden /> : <Mail size={18} aria-hidden />}
        ログインリンクを送る
      </Button>
      {message ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm font-bold ${
            status === "error" ? "bg-red-50 text-red-800" : "bg-mint text-teal-900"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
