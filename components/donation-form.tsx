"use client";

import { CalendarHeart, Camera, Loader2, MapPin, PartyPopper } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { DonationStoryCard } from "@/components/donation-story-card";
import { calculateNextAvailableDate, formatDateLabel, getRemainingDays } from "@/lib/donations";
import { createClient } from "@/lib/supabase/browser";
import type { DonationType, PhotoVisibility } from "@/types/database";

type DonationFormProps = {
  initialNickname?: string;
  initialInstagramId?: string | null;
  initialRegion?: string;
  isLoggedIn: boolean;
};

export function DonationForm({
  initialNickname = "あなた",
  initialInstagramId = "",
  initialRegion = "東京都",
  isLoggedIn
}: DonationFormProps) {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [nickname, setNickname] = useState(initialNickname);
  const [instagramId, setInstagramId] = useState(initialInstagramId ?? "");
  const [region, setRegion] = useState(initialRegion);
  const [location, setLocation] = useState("");
  const [donatedOn, setDonatedOn] = useState(new Date().toISOString().slice(0, 10));
  const [donationType, setDonationType] = useState<DonationType>("whole_blood_400");
  const [photoVisibility, setPhotoVisibility] = useState<PhotoVisibility>("count_only");
  const [comment, setComment] = useState("今日の1回が、誰かの未来になりますように。");
  const [isFirstDonation, setIsFirstDonation] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [savedPhotoUrl, setSavedPhotoUrl] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const nextAvailableOn = useMemo(
    () => calculateNextAvailableDate(donatedOn, donationType),
    [donatedOn, donationType]
  );

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(photoFile);
    setPhotoPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage(null);

    try {
      if (!isLoggedIn) {
        throw new Error("投稿するにはログインが必要です。");
      }

      let photoUrl: string | null = null;
      if (photoFile) {
        photoUrl = await uploadDonationPhoto(photoFile);
      }

      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nickname,
          instagram_id: instagramId || null,
          count,
          donated_on: donatedOn,
          donation_type: donationType,
          location,
          region,
          comment,
          photo_url: photoUrl,
          photo_visibility: photoVisibility,
          is_first_donation: isFirstDonation
        })
      });

      const result = (await response.json()) as { donation?: { id: string; photo_url: string | null }; error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "投稿の保存に失敗しました。");
      }

      setSavedPhotoUrl(result.donation?.photo_url ?? photoUrl);
      setShareUrl(result.donation?.id ? `${window.location.origin}/donations/${result.donation.id}` : null);
      setStatus("success");
      setMessage("投稿を保存しました。画像保存やSNS共有ができます。");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "予期しないエラーが発生しました。");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <form
        className="space-y-5 rounded-lg border border-rose-100 bg-white p-5"
        onSubmit={handleSubmit}
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
            <span className="text-sm font-bold">Instagram ID（任意）</span>
            <input
              className="w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
              onChange={(event) => setInstagramId(event.target.value)}
              placeholder="blood_hero"
              value={instagramId}
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
          <label className="space-y-2">
            <span className="text-sm font-bold">場所</span>
            <input
              className="w-full rounded-lg border border-stone-200 px-3 py-3 outline-none focus:border-hero-red"
              onChange={(event) => setLocation(event.target.value)}
              placeholder="渋谷献血ルーム"
              required
              value={location}
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

        <label className="flex items-center gap-3 rounded-lg bg-hero-soft px-4 py-3 text-sm font-bold text-hero-deep">
          <input
            checked={isFirstDonation}
            className="h-4 w-4 accent-hero-red"
            onChange={(event) => setIsFirstDonation(event.target.checked)}
            type="checkbox"
          />
          初献血として投稿する
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
          {photoFile ? photoFile.name : "写真をアップロード"}
          <input
            accept="image/*"
            className="sr-only"
            onChange={(event) => setPhotoFile(event.target.files?.[0] ?? null)}
            type="file"
          />
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

        {!isLoggedIn ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
            Supabaseログイン後に投稿できます。ログインページからGoogleまたはメールでログインしてください。
          </p>
        ) : null}

        {message ? (
          <p
            className={`rounded-lg px-4 py-3 text-sm font-bold ${
              status === "error" ? "bg-red-50 text-red-800" : "bg-mint text-teal-900"
            }`}
          >
            {message}
          </p>
        ) : null}

        <Button className="w-full" disabled={!isLoggedIn || status === "saving"} type="submit">
          {status === "saving" ? <Loader2 className="animate-spin" size={18} aria-hidden /> : <MapPin size={18} aria-hidden />}
          {status === "saving" ? "保存中..." : "投稿して称賛カードを作る"}
        </Button>
      </form>

      <div className="space-y-4">
        <DonationStoryCard
          comment={comment}
          count={count}
          donatedOn={donatedOn}
          nickname={nickname || "あなた"}
          photoUrl={photoVisibility === "count_only" ? null : photoPreviewUrl ?? savedPhotoUrl}
          region={region || "地域"}
          shareUrl={shareUrl}
        />
      </div>
    </div>
  );
}

async function uploadDonationPhoto(file: File) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("画像をアップロードするにはログインが必要です。");
  }

  const extension = file.name.split(".").pop() ?? "jpg";
  const safeName = `${crypto.randomUUID()}.${extension.toLowerCase()}`;
  const path = `${user.id}/${safeName}`;

  const { error } = await supabase.storage.from("donation-photos").upload(path, file, {
    cacheControl: "3600",
    upsert: false
  });

  if (error) {
    throw new Error(`画像アップロードに失敗しました: ${error.message}`);
  }

  const { data } = supabase.storage.from("donation-photos").getPublicUrl(path);
  return data.publicUrl;
}
