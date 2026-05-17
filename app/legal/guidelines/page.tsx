import { LegalPage } from "@/components/legal-page";

export const metadata = {
  title: "投稿ガイドライン"
};

export default function GuidelinesPage() {
  return (
    <LegalPage title="投稿ガイドライン">
      <p>
        献血者への感謝と称賛を中心にした投稿を歓迎します。競争を煽る表現、他者の回数を下げる表現、
        献血を強要する表現は避けてください。
      </p>
      <p>
        医療判断に関わる情報は公的機関の案内を確認してください。本サービスは献血予約や医療助言を代替するものではありません。
      </p>
    </LegalPage>
  );
}
