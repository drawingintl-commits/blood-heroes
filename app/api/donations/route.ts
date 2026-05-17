import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateNextAvailableDate } from "@/lib/donations";
import { hasSupabaseConfig } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

const donationSchema = z.object({
  nickname: z.string().min(1).max(40),
  instagram_id: z.string().max(40).nullable().optional(),
  count: z.number().int().positive(),
  donated_on: z.string().date(),
  donation_type: z.enum(["whole_blood_200", "whole_blood_400", "plasma", "platelet"]),
  location: z.string().min(1).max(120),
  region: z.string().min(1).max(60),
  comment: z.string().max(500),
  photo_url: z.string().url().nullable().optional(),
  photo_visibility: z.enum(["count_only", "hands", "back", "face_ok"]),
  is_first_donation: z.boolean()
});

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: "Supabaseの環境変数が設定されていません" }, { status: 500 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("donations")
    .select("*, profile:users(nickname, instagram_id, avatar_url)")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ donations: data });
}

export async function POST(request: Request) {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({ error: "Supabaseの環境変数が設定されていません" }, { status: 500 });
  }

  const payload = donationSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const nextAvailableOn = calculateNextAvailableDate(
    payload.data.donated_on,
    payload.data.donation_type
  )
    .toISOString()
    .slice(0, 10);

  const { nickname, instagram_id, ...donationPayload } = payload.data;
  const { error: profileError } = await supabase.from("users").upsert(
    {
      id: user.id,
      nickname,
      instagram_id: instagram_id || null,
      region: donationPayload.region,
      total_donations: donationPayload.count
    },
    { onConflict: "id" }
  );

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("donations")
    .insert({
      ...donationPayload,
      user_id: user.id,
      next_available_on: nextAvailableOn
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ donation: data }, { status: 201 });
}
