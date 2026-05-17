import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  tone?: "red" | "mint" | "cream";
};

export function StatCard({ label, value, tone = "red" }: StatCardProps) {
  const toneClass = {
    red: "bg-hero-soft text-hero-deep",
    mint: "bg-mint text-teal-800",
    cream: "bg-cream text-amber-900"
  }[tone];

  return (
    <div className={cn("rounded-lg px-4 py-4", toneClass)}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
