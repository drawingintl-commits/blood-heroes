import { calculateNextAvailableDate } from "@/lib/donations";
import type { Donation } from "@/types/database";

export const demoDonations: Donation[] = [
  {
    id: "demo-1",
    user_id: "demo-user-1",
    count: 12,
    donated_on: "2026-05-12",
    donation_type: "whole_blood_400",
    location: "渋谷献血ルーム",
    region: "東京都",
    comment: "少し緊張したけど、スタッフさんが優しくて安心できました。",
    photo_url: null,
    photo_visibility: "hands",
    is_first_donation: false,
    next_available_on: calculateNextAvailableDate("2026-05-12", "whole_blood_400").toISOString(),
    created_at: "2026-05-12T10:00:00Z",
    profile: {
      nickname: "haru",
      instagram_id: "haru_blood",
      avatar_url: null
    }
  },
  {
    id: "demo-2",
    user_id: "demo-user-2",
    count: 1,
    donated_on: "2026-05-10",
    donation_type: "plasma",
    location: "横浜駅東口",
    region: "神奈川県",
    comment: "初献血。自分にもできた、という感覚がうれしい。",
    photo_url: null,
    photo_visibility: "count_only",
    is_first_donation: true,
    next_available_on: calculateNextAvailableDate("2026-05-10", "plasma").toISOString(),
    created_at: "2026-05-10T10:00:00Z",
    profile: {
      nickname: "mika",
      instagram_id: null,
      avatar_url: null
    }
  },
  {
    id: "demo-3",
    user_id: "demo-user-3",
    count: 31,
    donated_on: "2026-05-08",
    donation_type: "whole_blood_400",
    location: "名古屋栄",
    region: "愛知県",
    comment: "今日も無事に。次の誰かへつながりますように。",
    photo_url: null,
    photo_visibility: "back",
    is_first_donation: false,
    next_available_on: calculateNextAvailableDate("2026-05-08", "whole_blood_400").toISOString(),
    created_at: "2026-05-08T10:00:00Z",
    profile: {
      nickname: "sora",
      instagram_id: "sora_donor",
      avatar_url: null
    }
  }
];

export const stats = {
  totalDonations: 24818,
  totalMembers: 3812,
  firstTimers: 694
};
