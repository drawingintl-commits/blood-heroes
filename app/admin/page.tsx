import { ShieldAlert, Trash2, UserCog } from "lucide-react";
import type { ReactNode } from "react";
import { ErrorNotice } from "@/components/error-notice";
import { getDonationStats, getRecentDonations } from "@/lib/supabase/queries";

export const metadata = {
  title: "管理画面"
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [{ donations, error: donationsError }, { stats, error: statsError }] = await Promise.all([
    getRecentDonations(20),
    getDonationStats()
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-bold text-hero-red">管理</p>
        <h1 className="mt-2 text-3xl font-black">管理画面</h1>
        <p className="mt-3 text-sm text-stone-600">
          RLSと管理者フラグで保護する想定の管理ビューです。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <AdminTile icon={<Trash2 size={22} />} label="投稿管理" value={`${donations.length}件の投稿`} />
        <AdminTile icon={<UserCog size={22} />} label="ユーザー管理" value={`${stats.totalMembers}人`} />
        <AdminTile icon={<ShieldAlert size={22} />} label="通報管理" value="Supabaseで確認" />
      </div>
      {donationsError ? <div className="mt-6"><ErrorNotice message={donationsError} /></div> : null}
      {statsError ? <div className="mt-6"><ErrorNotice message={statsError} title="統計の読み込みに失敗しました" /></div> : null}
      <div className="mt-8 overflow-hidden rounded-lg border border-rose-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-hero-soft text-hero-deep">
            <tr>
              <th className="px-4 py-3">投稿者</th>
              <th className="px-4 py-3">回数</th>
              <th className="px-4 py-3">地域</th>
              <th className="px-4 py-3">状態</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr className="border-t border-rose-50" key={donation.id}>
                <td className="px-4 py-3 font-bold">{donation.profile?.nickname ?? "献血ヒーロー"}</td>
                <td className="px-4 py-3">{donation.count}回目</td>
                <td className="px-4 py-3">{donation.region}</td>
                <td className="px-4 py-3 text-teal-700">公開中</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminTile({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-rose-100 bg-white p-5">
      <div className="text-hero-red">{icon}</div>
      <p className="mt-3 text-sm font-bold text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}
