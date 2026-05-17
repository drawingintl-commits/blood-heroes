import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "プライバシーポリシー"
};

export default function PrivacyPage() {
  return (
    <LegalPage title="プライバシーポリシー">
      <p>
        ニックネーム、地域、Instagram ID、投稿内容、画像など、サービス提供に必要な情報を取得します。
        血液型は任意入力であり、公開範囲を明示したうえで扱います。
      </p>
      <p>
        投稿画像に顔や第三者が含まれる場合は、投稿者が必要な同意を得たものとして扱います。
        通報対応、安全確保、法令遵守のため、必要最小限の範囲で情報を確認する場合があります。
      </p>
    </LegalPage>
  );
}
