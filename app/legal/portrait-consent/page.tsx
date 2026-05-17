import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "肖像権同意"
};

export default function PortraitConsentPage() {
  return (
    <LegalPage title="肖像権同意">
      <p>
        写真に自分以外の人物、施設スタッフ、他の来場者が写る場合は、公開前に必要な同意を得てください。
      </p>
      <p>
        顔出し投稿は任意です。回数のみ、手元のみ、後ろ姿など、安心できる公開レベルを選べる設計にしています。
      </p>
    </LegalPage>
  );
}
