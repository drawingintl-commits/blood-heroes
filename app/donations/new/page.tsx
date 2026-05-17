import { DonationForm } from "@/components/donation-form";

export const metadata = {
  title: "献血記録を投稿"
};

export default function NewDonationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <DonationForm />
    </div>
  );
}
