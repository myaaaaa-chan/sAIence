# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリについて

sAIence の **Webアプリ**（Next.js）実装リポジトリ。既存のモバイルアプリ（`/Users/yajima/PhpstormProjects/garden-partner`）をWebに移植したもの。詳細な移植計画は `docs/web-migration-plan.md` を参照。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フレームワーク | Next.js (App Router) |
| 状態管理 | Zustand 5.x |
| データベース | Supabase (PostgreSQL + Storage) |
| 認証 | Supabase Auth（Google OAuth / PKCE フロー） |
| スタイリング | Tailwind CSS v4 |
| アイコン | Lucide React |
| 日付操作 | date-fns 4.x |
| デプロイ | Vercel |

## コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run typecheck

# Lint
npm run lint

# テスト実行
npm test

# 単一テストファイルの実行
npm test -- path/to/test.ts
```

## アーキテクチャ

### スタンドアロン Next.js アプリ

このリポジトリ自体がスタンドアロンの Next.js アプリ。既存モノレポ（`/Users/yajima/PhpstormProjects/garden-partner`）のロジックを参照・流用済み:

- **API型定義** — `src/types/api.ts` に `EventType`, `Urgency`, `CultivationQuery`, `AiScheduleResponse` 等を定義済み
- **野菜マスタ** — `src/constants/vegetables.ts` に 87品目を移植済み
- **日付ユーティリティ** — `src/lib/date.ts` に移植済み
- **APIクライアント** — `src/lib/api-client.ts` に移植済み

### ディレクトリ構成

```
├── app/                        # Next.js App Router
│   ├── layout.tsx              # ルートレイアウト（HTML・favicon metadata のみ）
│   ├── globals.css             # グローバルスタイル
│   ├── (app)/                  # 認証必須ページ（Route Group）
│   │   ├── layout.tsx          # Header + StoreProvider + <main>
│   │   ├── page.tsx            # / — ホーム（カレンダー）
│   │   ├── garden/page.tsx     # /garden — マイ菜園
│   │   ├── settings/page.tsx   # /settings — 設定
│   │   ├── add-vegetable/page.tsx  # /add-vegetable — 野菜追加（ステッパー）
│   │   └── vegetable/[id]/
│   │       ├── page.tsx        # /vegetable/:id — 野菜詳細（写真アドバイスはDialog）
│   │       └── advice-history/page.tsx
│   ├── login/page.tsx          # /login — ログイン（認証不要）
│   └── auth/callback/page.tsx  # OAuth コールバック処理
├── middleware.ts               # 認証ガード（未認証→/login リダイレクト）
├── public/                     # 静的アセット
│   ├── app-icon.svg            # アプリアイコン（Header・ログインで使用）
│   ├── logo-vertical-light.svg # 縦型ロゴ（ライト背景用）
│   └── logo-horizontal-dark.svg # 横型ロゴ（ダーク背景用）
└── src/
    ├── features/               # feature-first構成（モバイル版踏襲）
    │   ├── calendar/           # ホーム画面・MonthCalendar・DayEvents
    │   ├── vegetables/         # 野菜管理・ストア・VegetableCard・AiTimelineCard・EventTimeline
    │   ├── photo-advice/       # PhotoAdviceDialog（4状態管理）・AdviceHistoryCard
    │   └── settings/           # 設定ストア
    ├── components/
    │   ├── layout/Header.tsx       # レスポンシブヘッダーナビ（ログアウトボタン付き）
    │   ├── providers/StoreProvider.tsx  # Zustandストア初期化・認証状態連携
    │   └── ui/                 # Button, Card, Dialog, Combobox, Badge
    ├── constants/
    │   ├── vegetables.ts       # 野菜マスタ（87品目）
    │   └── config.ts           # DAILY_ADVICE_LIMIT等
    ├── db/
    │   ├── repositories.ts          # リポジトリインターフェース定義
    │   ├── supabase-client.ts       # ブラウザ用クライアント（createBrowserClient / PKCE対応）
    │   ├── supabase-server.ts       # サーバー用クライアント（Route Handler用）
    │   ├── supabase-middleware.ts   # Middleware用クライアント（認証チェック）
    │   └── supabase-repositories.ts # Supabase実装（user_id 自動付与）
    ├── lib/
    │   ├── api-client.ts       # Cloudflare Workers APIクライアント基底
    │   ├── date.ts             # 日付ユーティリティ
    │   ├── photo.ts            # Canvas API画像処理（リサイズ・Base64変換）
    │   ├── stores.ts           # ストア共通ユーティリティ
    │   └── uuid.ts             # UUID生成
    └── types/
        ├── api.ts              # API型定義（CultivationQuery等）
        ├── database.ts         # Supabase自動生成型（user_id カラム含む）
        └── index.ts            # ドメイン型（Vegetable, Event, Advice等）
```

### 認証フロー

- **クライアント**: `createBrowserClient`（@supabase/ssr）— PKCE verifier を Cookie に保存
- **Middleware**: 全ルートで `auth.getUser()` → 未認証は `/login` にリダイレクト
- **除外パス**: `/login`, `/auth` は認証チェックをスキップ
- **コールバック**: `app/auth/callback/page.tsx` が `onAuthStateChange` でセッションを検出 → `/` にリダイレクト
- **ログアウト**: Header の LogOut ボタン → `auth.signOut()` → `/login` に遷移

### DB スキーマ（RLS）

すべてのテーブル（`vegetables`, `events`, `advices`）に `user_id UUID NOT NULL REFERENCES auth.users(id)` が追加済み。RLS ポリシーにより `auth.uid() = user_id` のデータのみアクセス可能。

### ナビゲーション設計

ヘッダーナビ一本。サイドバー・ボトムナビは使わない。

- **構成**: `[アイコン+ロゴ] [ホーム] [マイ菜園] [設定] ... [+ 野菜を追加] [ログアウト]`
- **モバイル（< sm）**: ロゴテキスト非表示、ナビリンクはアイコンのみ
- **レスポンシブ**: ブレークポイントは `md（768px）` 1つだけ
- **写真アドバイス**: 独立ルートなし。野菜詳細ページ上の Dialog で4状態（撮影→プレビュー→解析中→結果）を管理
- **野菜追加フロー**: `/add-vegetable` 単一ページ内のステッパー。カテゴリ選択は検索付きCombobox

### データフロー

1. **UIコンポーネント** → Zustand ストアのアクションを呼ぶ
2. **Zustand ストア** → リポジトリ層（`VegetableRepository` 等のインターフェース）を通じてSupabaseに読み書き
3. **AIスケジュール生成・写真アドバイス** → Cloudflare Workers API（`/api/schedule`, `/api/advice`）に直接fetch

### 主要ストア

| ストア | 役割 |
|-------|------|
| `useVegetableStore` | 野菜CRUD、ステータス管理 |
| `useEventStore` | 栽培イベントCRUD、日付・野菜IDによるフィルタ（メモ化セレクタ） |
| `useAdviceStore` | AIアドバイス記録、日次呼び出し回数カウント（`DAILY_ADVICE_LIMIT=10`） |
| `useSettingsStore` | アプリ設定（地域・栽培方法） |

### 外部API（Cloudflare Workers）

既存の `apps/server/` をそのまま利用。Webアプリのドメインを `CORS_ORIGIN` 環境変数に追加するだけでよい（コード変更不要）。

| エンドポイント | 用途 |
|-------------|------|
| `POST /api/schedule` | AI栽培スケジュール生成（`CultivationQuery` → `AiScheduleResponse`） |
| `POST /api/advice` | 写真AIアドバイス（`PhotoAdviceRequest` → `PhotoAdviceResponse`） |

### 写真処理（Web版）

`src/lib/photo.ts` で Canvas API を使い、モバイル版（expo-image-manipulator）と同等の処理を実現:
- 長辺1280px にリサイズ
- JPEG 0.8 で圧縮
- Base64エンコードしてAPIに送信
- 写真ファイル自体は Supabase Storage の `photos` バケットに保存

### イベント種別と色

```
fertilizing（施肥）  #4CAF50（緑）
pinching（摘心）     #FF9800（オレンジ）
harvesting（収穫）   #F44336（赤）
watering（水やり）   #2196F3（青）
other               #9E9E9E（グレー）
```

### 緊急度（写真アドバイス）

```
normal    #E8F5E9（薄緑）
attention #FFF3E0（薄オレンジ）
urgent    #FFEBEE（薄赤）
```

## 参照すべき既存コード

追加機能を実装する際は、既存モバイルアプリのコードを参照してロジックを流用すること。

| 参照先（モバイル版） | パス |
|---------------------|------|
| 野菜マスタ（87品目） | `/Users/yajima/PhpstormProjects/garden-partner/apps/mobile/src/constants/vegetables.ts` |
| 日付ユーティリティ | `/Users/yajima/PhpstormProjects/garden-partner/apps/mobile/src/lib/date.ts` |
| APIクライアント | `/Users/yajima/PhpstormProjects/garden-partner/apps/mobile/src/services/api-client.ts` |
| スケジュールAPI | `/Users/yajima/PhpstormProjects/garden-partner/apps/mobile/src/features/vegetables/api/schedule-api.ts` |
| 写真アドバイスAPI | `/Users/yajima/PhpstormProjects/garden-partner/apps/mobile/src/features/photo-advice/api/advice-api.ts` |
| ストアロジック | `/Users/yajima/PhpstormProjects/garden-partner/apps/mobile/src/features/*/store/*.ts` |
| 共有型定義 | `/Users/yajima/PhpstormProjects/garden-partner/packages/shared/src/types.ts` |

## 実装状況（2026-04-12 時点）

Phase 1・2・認証（Phase 3一部）実装完了。`npm run build` 成功済み（TypeScriptエラー 0）。

**実装済み:**
- ホーム（月カレンダー）、マイ菜園、野菜詳細、写真AIアドバイス、設定
- 野菜追加フロー（ステッパー + AI栽培スケジュール生成）
- Supabase Auth（Google OAuth / PKCE）+ Middleware 認証ガード
- RLS によるユーザーごとのデータ分離
- アプリアイコン・favicon（`public/app-icon.svg`）

**未実装（Phase 3・4 残り）:**
- E2Eテスト（Playwright）
- Vercel デプロイ設定
- パフォーマンス最適化
