export type BloodType = "A" | "B" | "O" | "AB" | "unknown";
export type PhotoVisibility = "count_only" | "hands" | "back" | "face_ok";
export type DonationType = "whole_blood_200" | "whole_blood_400" | "plasma" | "platelet";
export type ReportStatus = "open" | "reviewing" | "resolved" | "rejected";

export type Profile = {
  id: string;
  nickname: string;
  instagram_id: string | null;
  region: string;
  blood_type: BloodType | null;
  avatar_url: string | null;
  total_donations: number;
  is_admin: boolean;
  created_at: string;
};

export type Donation = {
  id: string;
  user_id: string;
  count: number;
  donated_on: string;
  donation_type: DonationType;
  location: string;
  region: string;
  comment: string;
  photo_url: string | null;
  photo_visibility: PhotoVisibility;
  is_first_donation: boolean;
  next_available_on: string;
  created_at: string;
  profile?: Pick<Profile, "nickname" | "instagram_id" | "avatar_url">;
};

export type Badge = {
  id: string;
  threshold: number;
  title: string;
  description: string;
  color: string;
};
