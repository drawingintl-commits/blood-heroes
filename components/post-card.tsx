import { CalendarDays, Heart, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { BadgePill } from "@/components/badge-pill";
import { donationTypeLabel, formatDateLabel, getRemainingDays } from "@/lib/donations";
import type { Donation } from "@/types/database";

export function PostCard({ donation }: { donation: Donation }) {
  const remaining = getRemainingDays(donation.next_available_on);

  return (
    <article className="overflow-hidden rounded-lg border border-rose-100 bg-white">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-hero-soft font-bold text-hero-deep">
          {donation.profile?.nickname?.slice(0, 1).toUpperCase() ?? "H"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{donation.profile?.nickname ?? "献血ヒーロー"}</p>
          <p className="truncate text-xs text-stone-500">
            {donation.profile?.instagram_id ? `@${donation.profile.instagram_id}` : "Instagram未連携"}
          </p>
        </div>
        <BadgePill count={donation.count} />
      </div>
      <div
        className="aspect-square bg-gradient-to-br from-hero-soft via-white to-mint p-5"
        style={
          donation.photo_url && donation.photo_visibility !== "count_only"
            ? {
                backgroundImage: `linear-gradient(rgba(255, 241, 242, 0.6), rgba(233, 251, 247, 0.72)), url(${donation.photo_url})`,
                backgroundPosition: "center",
                backgroundSize: "cover"
              }
            : undefined
        }
      >
        <div className="flex h-full flex-col justify-between rounded-lg border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur-[2px]">
          <div>
            <p className="text-sm font-semibold text-hero-red">献血してくれてありがとう</p>
            <h2 className="mt-2 text-4xl font-black text-hero-ink">献血{donation.count}回目</h2>
            {donation.is_first_donation ? (
              <p className="mt-3 inline-flex rounded-full bg-hero-red px-3 py-1 text-xs font-bold text-white">
                初献血、おめでとう
              </p>
            ) : null}
          </div>
          <p className="text-lg font-semibold leading-relaxed text-stone-700">{donation.comment}</p>
        </div>
      </div>
      <div className="space-y-3 px-4 py-4">
        <div className="flex flex-wrap gap-2 text-xs text-stone-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1">
            <MapPin size={14} aria-hidden />
            {donation.region}・{donation.location}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1">
            <CalendarDays size={14} aria-hidden />
            {formatDateLabel(donation.donated_on)}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1">
            {donationTypeLabel(donation.donation_type)}
          </span>
        </div>
        <p className="rounded-lg bg-mint px-3 py-2 text-sm font-semibold text-teal-900">
          次回献血可能まで あと{remaining}日
        </p>
        <div className="flex gap-5 text-sm font-semibold text-stone-600">
          <span className="inline-flex items-center gap-1">
            <Heart size={18} className="text-hero-red" aria-hidden />
            ありがとう
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle size={18} aria-hidden />
            応援する
          </span>
          <Link className="text-hero-red" href={`/donations/${donation.id}`}>
            共有ページ
          </Link>
        </div>
      </div>
    </article>
  );
}
