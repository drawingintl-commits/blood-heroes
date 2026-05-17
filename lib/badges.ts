import type { Badge } from "@/types/database";

export const badges: Badge[] = [
  {
    id: "first-hero",
    threshold: 1,
    title: "First Hero",
    description: "はじめての一歩に、心からありがとう。",
    color: "bg-rose-100 text-hero-deep"
  },
  {
    id: "life-saver",
    threshold: 5,
    title: "Life Saver",
    description: "継続するやさしさが誰かの支えに。",
    color: "bg-red-100 text-red-700"
  },
  {
    id: "red-hero",
    threshold: 10,
    title: "Red Hero",
    description: "献血文化を広げる頼れる存在。",
    color: "bg-hero-red text-white"
  },
  {
    id: "gold-donor",
    threshold: 30,
    title: "Gold Donor",
    description: "地域にあたたかい循環を作る人。",
    color: "bg-amber-100 text-amber-800"
  },
  {
    id: "legend-donor",
    threshold: 50,
    title: "Legend Donor",
    description: "長く続ける善意は、ひとつの文化です。",
    color: "bg-stone-900 text-white"
  },
  {
    id: "blood-master",
    threshold: 100,
    title: "Blood Master",
    description: "称賛と感謝を込めて、最高位のヒーローへ。",
    color: "bg-purple-100 text-purple-800"
  }
];

export function getBadgeForCount(count: number): Badge {
  return badges.reduce((current, badge) => {
    return count >= badge.threshold ? badge : current;
  }, badges[0]);
}
