import { HeartHandshake } from "lucide-react";
import { LinkButton } from "@/components/button";

export function EmptyState({
  title,
  message
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="rounded-lg border border-rose-100 bg-white px-5 py-8 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-hero-soft text-hero-red">
        <HeartHandshake size={24} aria-hidden />
      </div>
      <h2 className="mt-4 text-xl font-black">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">{message}</p>
      <LinkButton className="mt-5" href="/donations/new">
        最初の投稿をする
      </LinkButton>
    </div>
  );
}
