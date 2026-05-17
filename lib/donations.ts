import { addDays, differenceInCalendarDays, format } from "date-fns";
import type { DonationType } from "@/types/database";

const intervalByDonationType: Record<DonationType, number> = {
  whole_blood_200: 28,
  whole_blood_400: 84,
  plasma: 14,
  platelet: 14
};

export function calculateNextAvailableDate(
  donatedOn: string | Date,
  donationType: DonationType
) {
  return addDays(new Date(donatedOn), intervalByDonationType[donationType]);
}

export function getRemainingDays(nextAvailableOn: string | Date) {
  return Math.max(0, differenceInCalendarDays(new Date(nextAvailableOn), new Date()));
}

export function formatDateLabel(date: string | Date) {
  return format(new Date(date), "yyyy.MM.dd");
}

export function donationTypeLabel(type: DonationType) {
  const labels: Record<DonationType, string> = {
    whole_blood_200: "全血200mL",
    whole_blood_400: "全血400mL",
    plasma: "血漿成分",
    platelet: "血小板成分"
  };

  return labels[type];
}
