import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "利用規約"
};

export default function TermsPage() {
  return (
    <LegalPage title="利用規約">
      <p>
        Blood Heroesは献血者を称賛し、献血文化を広げるための非公式コミュニティサービスです。
        日本赤十字社その他公的機関の公式サービスではありません。
      </p>
      <p>
        ユーザーは、事実に基づく投稿を行い、他者を傷つける表現、誤解を招く医療情報、個人情報の無断掲載を行わないものとします。
      </p>
    </LegalPage>
  );
}
