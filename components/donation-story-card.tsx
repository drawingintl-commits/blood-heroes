"use client";

import { Download, Instagram, MessageCircle, Send, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/button";
import { getBadgeForCount } from "@/lib/badges";
import { formatDateLabel } from "@/lib/donations";

type StoryCardProps = {
  nickname: string;
  region: string;
  count: number;
  donatedOn: string;
  comment: string;
  photoUrl?: string | null;
  shareUrl?: string | null;
};

export function DonationStoryCard({
  nickname,
  region,
  count,
  donatedOn,
  comment,
  photoUrl,
  shareUrl
}: StoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const badge = getBadgeForCount(count);

  async function downloadCard() {
    const blob = await createStoryCardBlob({
      nickname,
      region,
      count,
      donatedOn,
      comment,
      photoUrl
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `kenketsu-heroes-${count}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);

    setIsCelebrating(true);
    window.setTimeout(() => setIsCelebrating(false), 700);
  }

  async function shareNative(target: "Instagram" | "LINE") {
    setShareMessage(null);
    const blob = await createStoryCardBlob({
      nickname,
      region,
      count,
      donatedOn,
      comment,
      photoUrl
    });
    const file = new File([blob], `kenketsu-heroes-${count}.png`, { type: "image/png" });
    const text = `献血${count}回目。${badge.title}になりました。`;

    if (navigator.canShare?.({ files: [file] }) && navigator.share) {
      await navigator.share({
        title: "献血ヒーローズ",
        text,
        url: shareUrl ?? window.location.origin,
        files: [file]
      });
      return;
    }

    if (target === "LINE") {
      window.open(
        `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
          shareUrl ?? window.location.href
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    setShareMessage("画像保存後、Instagramアプリのストーリーズから画像を選んで共有してください。");
  }

  function shareToX() {
    const text = `献血${count}回目。${badge.title}になりました。あなたの1回が、誰かの未来になる。`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
        shareUrl ?? window.location.href
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section className="space-y-4">
      <div
        className={`story-card-gradient mx-auto flex aspect-[9/16] max-h-[680px] w-full max-w-sm flex-col justify-between overflow-hidden rounded-[28px] p-7 text-white shadow-glow ${
          isCelebrating ? "celebrate-pop" : ""
        }`}
        ref={cardRef}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">献血ヒーローズ</p>
          <Sparkles size={22} aria-hidden />
        </div>
        {photoUrl ? (
          <div
            className="my-5 min-h-0 flex-1 rounded-[22px] border border-white/45 bg-white/20 bg-cover bg-center shadow-sm"
            style={{ backgroundImage: `url(${photoUrl})` }}
          />
        ) : (
          <div className="my-5 min-h-0 flex-1 rounded-[22px] border border-white/45 bg-white/20" />
        )}
        <div>
          <p className="text-sm font-semibold opacity-90">献血してくれてありがとう</p>
          <h2 className="mt-3 text-5xl font-black leading-tight">献血{count}回目</h2>
          <p className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-hero-deep">
            {badge.title}
          </p>
        </div>
        <div className="mt-5 rounded-lg bg-white/92 p-5 text-hero-ink">
          <p className="line-clamp-3 text-base font-black leading-7">{comment}</p>
          <p className="mt-4 text-sm font-semibold text-stone-600">
            {nickname} / {region} / {formatDateLabel(donatedOn)}
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button onClick={downloadCard}>
          <Download size={18} aria-hidden />
          画像保存
        </Button>
        <Button onClick={() => void shareNative("Instagram")} type="button" variant="secondary">
          <Instagram size={18} aria-hidden />
          Instagramで共有
        </Button>
        <Button onClick={() => void shareNative("LINE")} type="button" variant="secondary">
          <MessageCircle size={18} aria-hidden />
          LINEで共有
        </Button>
        <Button onClick={shareToX} type="button" variant="secondary">
          <Send size={18} aria-hidden />
          Xで共有
        </Button>
      </div>
      {shareMessage ? (
        <p className="rounded-lg bg-hero-soft px-4 py-3 text-sm font-bold text-hero-deep">
          {shareMessage}
        </p>
      ) : null}
      <p className="text-xs leading-6 text-stone-500">
        スマホでは共有ボタンから画像付き共有を試せます。対応していないブラウザでは画像保存後に各アプリで共有してください。
      </p>
    </section>
  );
}

async function createStoryCardBlob({
  nickname,
  region,
  count,
  donatedOn,
  comment,
  photoUrl
}: Required<Pick<StoryCardProps, "nickname" | "region" | "count" | "donatedOn" | "comment">> &
  Pick<StoryCardProps, "photoUrl">) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("画像生成に失敗しました。");
    const badge = getBadgeForCount(count);

    const gradient = context.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, "#df2f3f");
    gradient.addColorStop(0.55, "#fb7185");
    gradient.addColorStop(1, "#fff1f2");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1080, 1920);

    context.fillStyle = "rgba(255,255,255,0.92)";
    roundRect(context, 80, 150, 920, 1590, 48);
    context.fill();

    context.fillStyle = "#df2f3f";
    context.font = "700 54px sans-serif";
    context.fillText("献血ヒーローズ", 140, 265);

    if (photoUrl) {
      const image = await loadImage(photoUrl).catch(() => null);
      if (image) {
        context.save();
        roundRect(context, 140, 330, 800, 680, 40);
        context.clip();
        drawCoverImage(context, image, 140, 330, 800, 680);
        context.restore();
      }
    }

    context.fillStyle = "#2d1f24";
    context.font = "900 128px sans-serif";
    context.fillText(`献血${count}回目`, 140, photoUrl ? 1165 : 560);

    context.fillStyle = "#9f1626";
    context.font = "700 56px sans-serif";
    context.fillText(badge.title, 140, photoUrl ? 1265 : 670);

    context.fillStyle = "#5f5256";
    context.font = "500 42px sans-serif";
    context.fillText(`${nickname} / ${region}`, 140, photoUrl ? 1365 : 810);
    context.fillText(formatDateLabel(donatedOn), 140, photoUrl ? 1435 : 880);

    context.fillStyle = "#df2f3f";
    context.font = "800 48px sans-serif";
    wrapText(context, "あなたの行動が、誰かの命につながる", 140, photoUrl ? 1550 : 1080, 800, 66);

    context.fillStyle = "#2d1f24";
    context.font = "500 34px sans-serif";
    wrapText(context, comment || "今日のやさしさを、次の誰かへ。献血してくれてありがとう。", 140, photoUrl ? 1660 : 1300, 780, 52);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("画像生成に失敗しました。"));
      }, "image/png");
    });
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

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const offsetX = x + (width - drawWidth) / 2;
  const offsetY = y + (height - drawHeight) / 2;
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}
