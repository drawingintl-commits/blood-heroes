import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/button";
import { ErrorNotice } from "@/components/error-notice";
import { PostCard } from "@/components/post-card";
import { getBadgeForCount } from "@/lib/badges";
import { getDonationById } from "@/lib/supabase/queries";

type DonationDetailProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: DonationDetailProps): Promise<Metadata> {
  const { id } = await params;
  const { donation } = await getDonationById(id);

  if (!donation) {
    return {
      title: "投稿が見つかりません",
      description: "献血ヒーローズの投稿が見つかりませんでした。"
    };
  }

  const badge = getBadgeForCount(donation.count);
  const title = `献血${donation.count}回目 | ${badge.title}`;
  const description = donation.comment || "献血を称え、善意を広げるSNSコミュニティ";
  const imageUrl = `/donations/${id}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ja_JP",
      siteName: "献血ヒーローズ",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export default async function DonationDetailPage({ params }: DonationDetailProps) {
  const { id } = await params;
  const { donation, error } = await getDonationById(id);

  if (!donation && !error) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-bold text-hero-red">献血カード共有ページ</p>
        <h1 className="mt-2 text-3xl font-black">献血ヒーローの記録</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          このページのURLを共有すると、投稿ごとのOGP画像が表示されます。
        </p>
      </div>
      {error ? <ErrorNotice message={error} /> : null}
      {donation ? <PostCard donation={donation} /> : null}
      <div className="mt-6">
        <LinkButton className="w-full" href="/donations/new">
          自分も献血カードを作る
        </LinkButton>
      </div>
    </div>
  );
}
