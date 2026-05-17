import { BadgePill } from "@/components/badge-pill";
import type { Donation } from "@/types/database";

export function InstagramGrid({ donations }: { donations: Donation[] }) {
  const posts = donations.slice(0, 6);

  if (posts.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-1 md:gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="aspect-square rounded-lg border border-dashed border-rose-200 bg-hero-soft"
            key={index}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-3">
      {posts.map((post) => (
        <div
          className="aspect-square rounded-lg bg-gradient-to-br from-white via-hero-soft to-mint p-2 md:p-4"
          key={post.id}
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
