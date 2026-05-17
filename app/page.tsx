import { ArrowRight, HeartHandshake, Instagram, ShieldCheck, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/button";
import { InstagramGrid } from "@/components/instagram-grid";
import { PostCard } from "@/components/post-card";
import { StatCard } from "@/components/stat-card";
import { demoDonations, stats } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[1fr_0.85fr] md:py-14">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-hero-soft px-3 py-1 text-xs font-bold text-hero-deep">
              <HeartHandshake size={15} aria-hidden />
              献血者を称賛するSNSコミュニティ
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-hero-ink md:text-6xl">
              あなたの1回が、誰かの未来になる。
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">
              Blood Heroesは、献血回数を誇れるカードに変え、善意を地域へ広げる場所です。
              競争ではなく、ありがとうが集まるコミュニティを目指します。
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/donations/new">
                あなたも参加する
                <ArrowRight size={18} aria-hidden />
              </LinkButton>
              <LinkButton href="/feed" variant="secondary">
                最近の投稿を見る
              </LinkButton>
            </div>
          </div>
          <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-gradient-to-br from-hero-red via-rose-400 to-hero-soft p-5 text-white shadow-glow">
            <div className="absolute inset-x-6 top-6 flex items-center justify-between">
              <span className="text-sm font-bold">Blood Heroes</span>
              <ShieldCheck size={24} aria-hidden />
            </div>
            <div className="flex h-full flex-col justify-end rounded-[22px] border border-white/30 bg-white/15 p-6 backdrop-blur-sm">
              <p className="text-sm font-bold opacity-90">Today&apos;s Hero</p>
              <h2 className="mt-3 text-5xl font-black">献血12回目</h2>
              <p className="mt-4 rounded-lg bg-white px-4 py-3 text-lg font-black text-hero-deep">
                あなたの行動が、誰かの命につながる
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="累計献血回数" value={stats.totalDonations.toLocaleString()} />
          <StatCard label="累計参加人数" value={stats.totalMembers.toLocaleString()} tone="mint" />
          <StatCard label="初献血人数" value={stats.firstTimers.toLocaleString()} tone="cream" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold text-hero-red">
                <Sparkles size={17} aria-hidden />
                最近の投稿
              </p>
              <h2 className="mt-2 text-2xl font-black">ありがとうが流れるフィード</h2>
            </div>
            <LinkButton href="/feed" variant="ghost">
              もっと見る
            </LinkButton>
          </div>
          <div className="grid gap-5">
            {demoDonations.slice(0, 2).map((donation) => (
              <PostCard donation={donation} key={donation.id} />
            ))}
          </div>
        </div>
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold text-hero-red">
            <Instagram size={17} aria-hidden />
            Instagram投稿一覧
          </p>
          <h2 className="mt-2 text-2xl font-black">シェアしたくなる献血カード</h2>
          <div className="mt-4">
            <InstagramGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
