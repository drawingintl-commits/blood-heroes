"use client";

import { Download, Instagram, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { getBadgeForCount } from "@/lib/badges";
import { formatDateLabel } from "@/lib/donations";

type StoryCardProps = {
  nickname: string;
  region: string;
  count: number;
  donatedOn: string;
};

export function DonationStoryCard({ nickname, region, count, donatedOn }: StoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const badge = getBadgeForCount(count);

  async function downloadCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const context = canvas.getContext("2d");
    if (!context) return;

    const gradient = context.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, "#df2f3f");
    gradient.addColorStop(0.55, "#fb7185");
    gradient.addColorStop(1, "#fff1f2");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1080, 1920);

    context.fillStyle = "rgba(255,255,255,0.92)";
    roundRect(context, 80, 170, 920, 1420, 48);
    context.fill();

    context.fillStyle = "#df2f3f";
    context.font = "700 54px sans-serif";
    context.fillText("Blood Heroes", 140, 290);

    context.fillStyle = "#2d1f24";
    context.font = "900 138px sans-serif";
    context.fillText(`献血${count}回目`, 140, 530);

    context.fillStyle = "#9f1626";
    context.font = "700 56px sans-serif";
    context.fillText(badge.title, 140, 650);

    context.fillStyle = "#5f5256";
    context.font = "500 42px sans-serif";
    context.fillText(`${nickname} / ${region}`, 140, 790);
    context.fillText(formatDateLabel(donatedOn), 140, 860);

    context.fillStyle = "#df2f3f";
    context.font = "800 52px sans-serif";
    wrapText(context, "あなたの行動が、誰かの命につながる", 140, 1080, 800, 70);

    context.fillStyle = "#2d1f24";
    context.font = "500 34px sans-serif";
    wrapText(context, "今日のやさしさを、次の誰かへ。献血してくれてありがとう。", 140, 1300, 780, 52);

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `blood-heroes-${count}.png`;
    link.href = url;
    link.click();

    setIsCelebrating(true);
    window.setTimeout(() => setIsCelebrating(false), 700);
  }

  return (
    <section className="space-y-4">
      <div
        className={`story-card-gradient mx-auto flex aspect-[9/16] max-h-[680px] w-full max-w-sm flex-col justify-between rounded-[28px] p-7 text-white shadow-glow ${
          isCelebrating ? "celebrate-pop" : ""
        }`}
        ref={cardRef}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">Blood Heroes</p>
          <Sparkles size={22} aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold opacity-90">Thank you for donating</p>
          <h2 className="mt-3 text-5xl font-black leading-tight">献血{count}回目</h2>
          <p className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-hero-deep">
            {badge.title}
          </p>
        </div>
        <div className="rounded-lg bg-white/90 p-5 text-hero-ink">
          <p className="text-lg font-black">あなたの行動が、誰かの命につながる</p>
          <p className="mt-4 text-sm font-semibold text-stone-600">
            {nickname} / {region} / {formatDateLabel(donatedOn)}
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button onClick={downloadCard}>
          <Download size={18} aria-hidden />
          カードをダウンロード
        </Button>
        <Button type="button" variant="secondary">
          <Instagram size={18} aria-hidden />
          Instagramに投稿
        </Button>
      </div>
    </section>
  );
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  let line = "";
  for (const character of text) {
    const testLine = line + character;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, x, y);
      line = character;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}
