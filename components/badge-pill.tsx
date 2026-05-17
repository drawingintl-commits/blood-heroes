import { getBadgeForCount } from "@/lib/badges";
import { cn } from "@/lib/utils";

export function BadgePill({ count }: { count: number }) {
  const badge = getBadgeForCount(count);

  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold", badge.color)}>
      {badge.title}
    </span>
  );
}
