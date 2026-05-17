import { createClient } from "@/lib/supabase/server";
import type { Donation } from "@/types/database";

type DonationRow = Omit<Donation, "profile"> & {
  profile:
    | Pick<NonNullable<Donation["profile"]>, "nickname" | "instagram_id" | "avatar_url">
    | Pick<NonNullable<Donation["profile"]>, "nickname" | "instagram_id" | "avatar_url">[]
    | null;
};

export type DonationQueryResult = {
  donations: Donation[];
  error: string | null;
};

export type DonationStats = {
  totalDonations: number;
  totalMembers: number;
  firstTimers: number;
};

export async function getRecentDonations(limit = 30): Promise<DonationQueryResult> {
  if (!hasSupabaseConfig()) {
    return {
      donations: [],
      error: "Supabaseの環境変数が設定されていません。"
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("donations")
    .select("*, profile:users(nickname, instagram_id, avatar_url)")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return {
      donations: [],
      error: error.message
    };
  }

  return {
    donations: (data as DonationRow[]).map(mapDonationRow),
    error: null
  };
}

export async function getDonationStats(): Promise<{ stats: DonationStats; error: string | null }> {
  if (!hasSupabaseConfig()) {
    return {
      stats: emptyStats,
      error: "Supabaseの環境変数が設定されていません。"
    };
  }

  const supabase = await createClient();
  const [donationCount, memberCount, firstTimerCount] = await Promise.all([
    supabase.from("donations").select("count", { count: "exact", head: false }).eq("is_deleted", false),
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase
      .from("donations")
      .select("id", { count: "exact", head: true })
      .eq("is_deleted", false)
      .eq("is_first_donation", true)
  ]);

  const error = donationCount.error ?? memberCount.error ?? firstTimerCount.error;
  if (error) {
    return {
      stats: emptyStats,
      error: error.message
    };
  }

  const totalDonations =
    donationCount.data?.reduce((sum, donation) => {
      const count = typeof donation.count === "number" ? donation.count : 0;
      return sum + count;
    }, 0) ?? 0;

  return {
    stats: {
      totalDonations,
      totalMembers: memberCount.count ?? 0,
      firstTimers: firstTimerCount.count ?? 0
    },
    error: null
  };
}

export async function getCurrentUserProfile() {
  if (!hasSupabaseConfig()) {
    return {
      user: null,
      profile: null,
      error: "Supabaseの環境変数が設定されていません。"
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) {
    return { user: null, profile: null, error: userError.message };
  }

  if (!user) {
    return { user: null, profile: null, error: null };
  }

  const { data, error } = await supabase.from("users").select("*").eq("id", user.id).maybeSingle();

  return {
    user,
    profile: data,
    error: error?.message ?? null
  };
}

export function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function mapDonationRow(row: DonationRow): Donation {
  const profile = Array.isArray(row.profile) ? row.profile[0] : row.profile;
  return {
    ...row,
    profile: profile ?? undefined
  };
}

const emptyStats: DonationStats = {
  totalDonations: 0,
  totalMembers: 0,
  firstTimers: 0
};
