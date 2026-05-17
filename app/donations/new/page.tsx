import { DonationForm } from "@/components/donation-form";
import { ErrorNotice } from "@/components/error-notice";
import { getCurrentUserProfile } from "@/lib/supabase/queries";

export const metadata = {
  title: "献血記録を投稿"
};

export const dynamic = "force-dynamic";

export default async function NewDonationPage() {
  const { user, profile, error } = await getCurrentUserProfile();
  const fallbackName =
    profile?.nickname ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "あなた";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {error ? <ErrorNotice message={error} /> : null}
      <DonationForm
        initialInstagramId={profile?.instagram_id ?? ""}
        initialNickname={fallbackName}
        initialRegion={profile?.region ?? "東京都"}
        isLoggedIn={Boolean(user)}
      />
    </div>
  );
}
