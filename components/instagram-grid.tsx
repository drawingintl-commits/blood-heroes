import { BadgePill } from "@/components/badge-pill";
import { demoDonations } from "@/lib/mock-data";

export function InstagramGrid() {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-3">
      {demoDonations.concat(demoDonations).map((post, index) => (
        <div
          className="aspect-square rounded-lg bg-gradient-to-br from-white via-hero-soft to-mint p-2 md:p-4"
          key={`${post.id}-${index}`}
        >
          <div className="flex h-full flex-col justify-between rounded-md bg-white/75 p-2">
            <span className="text-lg font-black text-hero-deep md:text-3xl">{post.count}</span>
            <BadgePill count={post.count} />
          </div>
        </div>
      ))}
    </div>
  );
}
