import { EmptyState } from "@/components/empty-state";
import { ErrorNotice } from "@/components/error-notice";
import { PostCard } from "@/components/post-card";
import { getRecentDonations } from "@/lib/supabase/queries";

export const metadata = {
  title: "投稿一覧"
};

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const { donations, error } = await getRecentDonations(30);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-bold text-hero-red">コミュニティ投稿</p>
        <h1 className="mt-2 text-3xl font-black">献血ヒーローの投稿</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          回数の多さだけでなく、はじめての1回も同じように称えます。
        </p>
      </div>
      {error ? <ErrorNotice message={error} /> : null}
      {!error && donations.length === 0 ? (
        <EmptyState
          title="まだ投稿がありません"
          message="最初の献血記録が投稿されると、ここに称賛のフィードが流れます。"
        />
      ) : null}
      {donations.length > 0 ? (
        <div className="grid gap-5">
          {donations.map((donation) => (
            <PostCard donation={donation} key={donation.id} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
