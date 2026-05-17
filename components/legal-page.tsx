import type { ReactNode } from "react";

export function LegalPage({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-bold text-hero-red">Safety</p>
      <h1 className="mt-2 text-3xl font-black">{title}</h1>
      <div className="mt-6 space-y-5 text-sm leading-8 text-stone-700">{children}</div>
    </article>
  );
}
