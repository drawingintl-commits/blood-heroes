import { PostCard } from "@/components/post-card";
import { demoDonations } from "@/lib/mock-data";

export const metadata = {
  title: "投稿一覧"
};

export default function FeedPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-bold text-hero-red">Community Feed</p>
        <h1 className="mt-2 text-3xl font-black">献血ヒーローの投稿</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          回数の多さだけでなく、はじめての1回も同じように称えます。
        </p>
      </div>
      <div className="grid gap-5">
        {demoDonations.map((donation) => (
          <PostCard donation={donation} key={donation.id} />
        ))}
      </div>
    </div>
  );
}
