import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";
import { getBadgeForCount } from "@/lib/badges";
import { formatDateLabel } from "@/lib/donations";
import type { Donation } from "@/types/database";

type OgImageProps = {
  params: Promise<{ id: string }>;
};

export const runtime = "edge";
export const alt = "献血ヒーローズ";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default async function OgImage({ params }: OgImageProps) {
  const { id } = await params;
  const donation = await getPublicDonationById(id);
  const count = donation?.count ?? 1;
  const badge = getBadgeForCount(count);
  const nickname = donation?.profile?.nickname ?? "献血ヒーロー";
  const region = donation?.region ?? "日本";
  const donatedOn = donation?.donated_on ? formatDateLabel(donation.donated_on) : "";
  const comment = donation?.comment || "あなたの行動が、誰かの命につながる";
  const publicPhotoUrl =
    donation?.photo_url && donation.photo_visibility !== "count_only" ? donation.photo_url : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #df2f3f 0%, #fb7185 48%, #fff1f2 100%)",
          color: "#2d1f24",
          padding: 56,
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            overflow: "hidden",
            borderRadius: 42,
            background: "rgba(255,255,255,0.94)"
          }}
        >
          <div
            style={{
              width: publicPhotoUrl ? "48%" : "0%",
              height: "100%",
              display: publicPhotoUrl ? "flex" : "none",
              background: "#fff1f2"
            }}
          >
            {publicPhotoUrl ? (
              <img
                alt=""
                src={publicPhotoUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 54
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#df2f3f", fontSize: 32, fontWeight: 800 }}>
                献血ヒーローズ
              </div>
              <div
                style={{
                  borderRadius: 999,
                  background: "#fff1f2",
                  color: "#9f1626",
                  padding: "12px 22px",
                  fontSize: 28,
                  fontWeight: 800
                }}
              >
                {badge.title}
              </div>
            </div>
            <div>
              <div style={{ color: "#9f1626", fontSize: 34, fontWeight: 800 }}>
                献血してくれてありがとう
              </div>
              <div style={{ marginTop: 16, fontSize: 86, fontWeight: 950, letterSpacing: 0 }}>
                献血{count}回目
              </div>
              <div style={{ marginTop: 24, fontSize: 34, lineHeight: 1.35, fontWeight: 700 }}>
                {comment}
              </div>
            </div>
            <div style={{ color: "#5f5256", fontSize: 30, fontWeight: 700 }}>
              {nickname} / {region} {donatedOn ? `/ ${donatedOn}` : ""}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

async function getPublicDonationById(id: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data } = await supabase
    .from("donations")
    .select("*, profile:users(nickname, instagram_id, avatar_url)")
    .eq("id", id)
    .eq("is_deleted", false)
    .maybeSingle();

  if (!data) return null;

  const row = data as Omit<Donation, "profile"> & {
    profile: Donation["profile"] | Donation["profile"][] | null;
  };
  const profile = Array.isArray(row.profile) ? row.profile[0] : row.profile;

  return {
    ...row,
    profile: profile ?? undefined
  } satisfies Donation;
}
