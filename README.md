# Blood Heroes

献血者を称賛するSNS型コミュニティのMVPです。目的は「競争」ではなく「称賛」。献血回数、称号、投稿フィード、Instagramストーリー用カード生成を通じて、善意を可視化します。

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth / Database / Storage
- Vercel
- PWA manifest
- SEO metadata

## MVP Features

- TOPページ
- ログイン画面
- 献血記録投稿
- Instagramストーリー向け献血カード自動生成
- 投稿一覧
- 称号システム
- 次回献血可能日の自動計算
- 管理画面の土台
- 利用規約、プライバシーポリシー、肖像権同意、投稿ガイドライン

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

ローカル開発ではプロジェクトルートに環境変数ファイルを作成し、以下を設定してください。実際の値はSupabaseのProject Settingsから取得します。

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

このリポジトリには機密値を含む環境変数ファイルは同梱していません。

## Supabase Setup

1. Supabaseで新規プロジェクトを作成します。
2. SQL Editorで [supabase/schema.sql](/Users/kakitahiroshi/Documents/Codex/2026-05-16/web-sns-instagram-10-40-instagram/supabase/schema.sql) を実行します。
3. Storage用に [supabase/storage.sql](/Users/kakitahiroshi/Documents/Codex/2026-05-16/web-sns-instagram-10-40-instagram/supabase/storage.sql) を実行します。
4. Auth ProvidersでGoogleログインを有効化します。
5. Emailログインを有効化します。
6. Vercelとローカルの環境変数にSupabase URLとanon keyを設定します。

## Vercel Deploy

1. GitHubにリポジトリを作成してpushします。
2. VercelでNew Projectを作成し、このリポジトリを選択します。
3. Environment Variablesに以下を登録します。
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Build Commandは `npm run build`、OutputはNext.js標準のままでデプロイします。
5. Supabase AuthのSite URLとRedirect URLsにVercel URLを追加します。

## Development Commands

```bash
npm run dev
npm run typecheck
npm run build
```

## Documentation

設計詳細、ER図、画面設計、API設計は [docs/architecture.md](/Users/kakitahiroshi/Documents/Codex/2026-05-16/web-sns-instagram-10-40-instagram/docs/architecture.md) にまとめています。

## Product Principle

Blood Heroes is not a competition product. Rankings and counts must always be framed as gratitude:

- ありがとう
- すごい
- 尊い
- また献血したい
- 誰かを誘いたい

## Legal Notice

Blood Heroesは非公式のコミュニティサービスです。日本赤十字社その他公的機関の公式サービスと誤認されない表現を維持してください。
