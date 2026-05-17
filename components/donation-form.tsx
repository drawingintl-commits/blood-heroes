"use client";

import { CalendarHeart, Camera, MapPin, PartyPopper } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/button";
import { DonationStoryCard } from "@/components/donation-story-card";
import { calculateNextAvailableDate, formatDateLabel, getRemainingDays } from "@/lib/donations";
import type { DonationType, PhotoVisibility } from "@/types/database";

export function DonationForm() {
  const [count, setCount] = useState(1);
  const [nickname, setNickname] = useState("あなた");
  const [region, setRegion] = useState("東京都");
  const [donatedOn, setDonatedOn] = useState(new Date().toISOString().slice(0, 10));
  const [donationType, setDonationType] = useState<DonationType>("whole_blood_400");
  const [photoVisibility, setPhotoVisibility] = useState<PhotoVisibility>("count_only");
  const [comment, setComment] = useState("今日の1回が、誰かの未来になりますように。");
  const [posted, setPosted] = useState(false);

  const nextAvailableOn = useMemo(
    () => calculateNextAvailableDate(donatedOn, donationType),
    [donatedOn, donationType]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <form
        className="space-y-5 rounded-lg border border-rose-100 bg-white p-5"
        onSubmit={(event) => {
          event.preventDefault();
          setPosted(true);
        }}
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-hero-soft px-3 py-1 text-xs font-bold text-hero-deep">
            <PartyPopper size={15} aria-hidden />
            投稿すると称賛カードを自動生成
          </p>
          <h1 className="mt-4 text-3xl font-black">献血記録を投稿</h1>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            競争ではなく、あなたの善意を称える場所です。公開範囲は無理のない範囲で選べます。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-bold">ニックネーム</span>
            <input
              className="w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
              onChange={(event) => setNickname(event.target.value)}
              required
              value={nickname}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-bold">今回で何回目</span>
            <input
              className="w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
              min={1}
              onChange={(event) => setCount(Number(event.target.value))}
              required
              type="number"
              value={count}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-bold">献血日</span>
            <input
              className="w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
              onChange={(event) => setDonatedOn(event.target.value)}
              required
              type="date"
              value={donatedOn}
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-bold">地域</span>
            <input
              className="w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
              onChange={(event) => setRegion(event.target.value)}
              required
              value={region}
            />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-bold">献血種別</span>
          <select
            className="w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
            onChange={(event) => setDonationType(event.target.value as DonationType)}
            value={donationType}
          >
            <option value="whole_blood_400">全血400mL</option>
            <option value="whole_blood_200">全血200mL</option>
            <option value="plasma">血漿成分</option>
            <option value="platelet">血小板成分</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold">コメント</span>
          <textarea
            className="min-h-28 w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
            onChange={(event) => setComment(event.target.value)}
            value={comment}
          />
        </label>

        <div className="space-y-3">
          <p className="text-sm font-bold">写真の公開レベル</p>
          <div className="grid gap-2 sm:grid-cols-4">
            {[
              ["count_only", "回数のみ"],
              ["hands", "手元のみ"],
              ["back", "後ろ姿"],
              ["face_ok", "顔出しOK"]
            ].map(([value, label]) => (
              <button
                className={`rounded-lg border px-3 py-3 text-sm font-bold ${
                  photoVisibility === value
                    ? "border-hero-red bg-hero-soft text-hero-deep"
                    : "border-stone-200 bg-white text-stone-600"
                }`}
                key={value}
                onClick={() => setPhotoVisibility(value as PhotoVisibility)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-lg border border-dashed border-rose-200 bg-hero-soft text-sm font-bold text-hero-deep">
          <Camera size={20} aria-hidden />
          写真をアップロード
          <input accept="image/*" className="sr-only" type="file" />
        </label>

        <div className="grid gap-3 rounded-lg bg-mint p-4 text-teal-900 sm:grid-cols-2">
          <p className="inline-flex items-center gap-2 text-sm font-bold">
            <CalendarHeart size={18} aria-hidden />
            次回献血可能日
          </p>
          <p className="text-sm font-black">
            {formatDateLabel(nextAvailableOn)}（あと{getRemainingDays(nextAvailableOn)}日）
          </p>
        </div>

        <Button className="w-full" type="submit">
          <MapPin size={18} aria-hidden />
          投稿して称賛カードを作る
        </Button>
      </form>

      <div className="space-y-4">
        <DonationStoryCard
          count={count}
          donatedOn={donatedOn}
          nickname={nickname || "あなた"}
          region={region || "地域"}
        />
        {posted ? (
          <p className="rounded-lg bg-hero-soft px-4 py-3 text-sm font-bold text-hero-deep">
            ありがとう！このMVPではデモ投稿としてカード生成まで確認できます。Supabase接続後は投稿保存されます。
          </p>
        ) : null}
      </div>
    </div>
  );
}
