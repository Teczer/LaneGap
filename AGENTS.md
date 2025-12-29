# LANEGAP - Agent Instructions

> **Ce fichier est destiné aux agents/développeurs IA travaillant sur ce projet.**

## 📋 Project Overview

**LANEGAP** est une application web de coaching personnel pour la **midlane** de League of Legends.
Elle permet d'accéder instantanément aux informations critiques d'un matchup en **< 5 secondes**.

### Philosophie Core

```
Think like a pro player building his own tool.
```

- **Clarté** > Exhaustivité
- **Vitesse** > Esthétique fancy
- **Pratique** > Théorique

---

## 🎮 User Flow

```
1. Home Page → User selects the ENEMY champion they are facing
2. Enemy Page → Shows:
   - Best counter picks (champions good AGAINST this enemy)
   - Tips on how to play against this enemy
   - Enemy's power spikes (levels & items)
   - Personal notes (authenticated users)
3. Matchup Page → Shows:
   - Playing as [MY CHAMP] vs [ENEMY]
   - Specific matchup tips
   - General tips vs enemy
   - Enemy power spikes to be aware of
   - Personal notes (authenticated users)
4. Auth Page → Login/Register with OTP email verification
```

---

## 🏗️ Tech Stack

| Catégorie | Technologie | Notes |
|-----------|-------------|-------|
| **Runtime** | Bun 1.1+ | Package manager + runtime |
| **Framework** | Next.js 16+ | App Router + Turbopack |
| **Language** | TypeScript 5.9+ | Strict mode |
| **Styling** | Tailwind CSS 4+ | Dark mode only (DPM-inspired) |
| **State** | Zustand 5+ | Persistance localStorage |
| **Server State** | React Query 5+ | Caching, mutations |
| **Backend** | PocketBase | Auth, Database, Admin UI |
| **Forms** | React Hook Form + Zod | Validation |
| **Icons** | React Icons 5+ | Lucide icons (Lu prefix) |
| **Images** | Local files | Synced from Data Dragon |

---

## 📁 Project Structure

```
lanegap/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home - Select enemy champion
│   ├── auth/page.tsx             # Login/Register with OTP
│   ├── enemy/[id]/page.tsx       # Enemy page - counters & tips
│   ├── matchup/[myChamp]/[enemyChamp]/page.tsx
│   ├── api/                      # API Routes (Next.js)
│   │   └── auth/
│   │       ├── send-otp/route.ts
│   │       └── verify-otp/route.ts
│   ├── store/                    # Zustand stores
│   │   ├── auth.store.ts
│   │   ├── settings.store.ts
│   │   └── favorites.store.ts
│   ├── layout.tsx
│   └── globals.css               # Design system
│
├── components/
│   ├── ui/                       # Design System Primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── input-otp.tsx
│   │   ├── textarea.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── tooltip.tsx
│   │   └── index.ts              # Barrel exports
│   ├── champion/
│   ├── matchup/
│   ├── notes/
│   ├── layout/
│   └── toggles/
│
├── hooks/
│   ├── queries/                  # React Query hooks
│   │   ├── use-auth.query.ts     # Auth mutations (OTP)
│   │   ├── use-champions.query.ts
│   │   ├── use-matchups.query.ts
│   │   ├── use-notes.query.ts
│   │   └── index.ts              # Barrel exports
│   ├── use-translations.hook.ts
│   └── use-settings.hook.ts
│
├── lib/
│   ├── api/                      # API layer (fetch functions)
│   │   ├── auth.api.ts           # sendOTP, verifyOTP
│   │   ├── pocketbase.api.ts     # Champions, matchups
│   │   └── notes.api.ts          # User notes CRUD
│   ├── providers/
│   │   └── query-provider.tsx    # React Query setup
│   ├── validations/
│   │   └── auth.schema.ts        # Zod schemas
│   ├── i18n/
│   │   ├── en.json
│   │   └── fr.json
│   ├── pocketbase.ts             # PocketBase client
│   ├── types.ts
│   ├── utils.ts
│   └── config.ts
│
├── pocketbase/                   # PocketBase directory
│   ├── pocketbase               # Binary (gitignored)
│   └── pb_migrations/           # Auto-generated migrations
│
├── public/
│   ├── champions/icons/
│   └── items/
│
├── scripts/
│   ├── sync-champions.ts
│   ├── sync-items.ts
│   ├── validate-database.ts
│   └── migrate-to-pocketbase.ts
│
└── data/                         # Legacy JSON (kept for reference)
    ├── database.json
    └── schema.ts
```

---

## 🔄 Data Flow Architecture

### Pattern: API Layer → React Query → Components

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐     ┌────────────┐
│ PocketBase  │ ←── │ lib/api/*.ts │ ←── │ hooks/queries/* │ ←── │ Components │
│ (Backend)   │     │ (Fetch fns)  │     │ (React Query)   │     │ (UI)       │
└─────────────┘     └──────────────┘     └─────────────────┘     └────────────┘
```

### Rules

1. **NEVER fetch directly in components** - Always go through React Query hooks
2. **API functions in `lib/api/`** - Pure async functions that return typed data
3. **Query hooks in `hooks/queries/`** - Wrap API functions with useQuery/useMutation
4. **Components consume hooks** - Use `isPending`, `data`, `error` from hooks

### Example Flow

```typescript
// 1. API Layer (lib/api/auth.api.ts)
export async function sendOTP(email: string): Promise<ISendOTPResponse> {
  const response = await fetch('/api/auth/send-otp', { ... })
  return response.json()
}

// 2. Query Hook (hooks/queries/use-auth.query.ts)
export function useSendOTP() {
  return useMutation({
    mutationFn: (email: string) => sendOTP(email),
  })
}

// 3. Component usage
const sendOTPMutation = useSendOTP()
await sendOTPMutation.mutateAsync(email)
```

---

## 🎨 Design System

### UI Components (`components/ui/`)

All primitive components follow this pattern:

```typescript
// Interface with I prefix
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

// forwardRef for ref forwarding
const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    // Component logic
  }
)

// Named export (NO default exports)
export { Button }
```

### Available Components

| Component | Variants | Usage |
|-----------|----------|-------|
| `Button` | primary, secondary, ghost, danger | Actions |
| `Input` | with icon, error state | Form inputs |
| `InputOTP` | 6-digit slots | OTP verification |
| `Textarea` | with error state | Multi-line input |
| `Card` | CardHeader, CardTitle, CardContent | Containers |
| `Badge` | tier colors | Status indicators |

### Import Pattern

```typescript
// ✅ Import from barrel
import { Button, Input, Card, CardContent } from '@/components/ui'

// ❌ Don't import from individual files
import { Button } from '@/components/ui/button'
```

---

## 🎨 Code Style

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (components) | kebab-case.component.tsx | `champion-icon.component.tsx` |
| Files (hooks) | use-name.hook.ts | `use-translations.hook.ts` |
| Files (queries) | use-name.query.ts | `use-champions.query.ts` |
| Files (stores) | name.store.ts | `auth.store.ts` |
| Files (API) | name.api.ts | `auth.api.ts` |
| Files (schemas) | name.schema.ts | `auth.schema.ts` |
| Interfaces | `I` prefix | `IChampion`, `IButtonProps` |
| Types | `T` prefix | `TLanguage`, `TTier` |
| Components | PascalCase | `ChampionCard`, `TierBadge` |
| Functions | camelCase | `getChampionIconUrl` |

### TypeScript Rules

- **Strict mode**: Always enabled
- **No `any`**: Use proper types
- **Explicit return types**: For public API functions
- **Named exports only**: No default exports for components
- **Arrow functions ONLY for components**: Use `export const Component = () => {}` — **NEVER** `export function Component() {}`

```typescript
// ✅ Good - Arrow function (ALWAYS use this)
export const ChampionCard = ({ name, onClick }: IChampionCardProps) => {
  return <div onClick={onClick}>{name}</div>
}

// ❌ Bad - Function declaration (NEVER use this for components)
export function ChampionCard({ name, onClick }: IChampionCardProps) {
  return <div onClick={onClick}>{name}</div>
}

// ✅ Good - Multiple components in same file
export const SettingsCard = ({ children }: ISettingsCardProps) => {
  return <div>{children}</div>
}

export const SettingsCardHeader = ({ title }: ISettingsCardHeaderProps) => {
  return <h3>{title}</h3>
}
```

> ⚠️ **This rule is strictly enforced.** All existing components must use arrow functions.

### Linting & Formatting

```bash
bun run format          # Prettier (auto-sorts imports + Tailwind classes)
bun run lint            # ESLint (removes unused imports)
bun run type-check      # TypeScript strict check
```

---

## 🔧 Commands

```bash
# Development
bun dev                    # Start dev server (Turbopack)
./pocketbase/pocketbase serve  # Start PocketBase

# Build
bun run build              # Production build
bun start                  # Start production server

# Scripts
bun run sync:champions     # Download champion icons locally
bun run sync:items         # Download item icons locally
bun run validate           # Validate database.json

# Quality
bun run lint               # ESLint
bun run lint:fix           # ESLint with auto-fix
bun run type-check         # TypeScript check
bun run format             # Prettier
bun run format:check       # Check formatting
```

---

## 🗄️ PocketBase Collections

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `users` | Auth users | email, username, verified |
| `champions` | Champion data | champion_id, name_en, name_fr, tips_* |
| `level_spikes` | Power spikes | champion, level, text_*, important |
| `item_spikes` | Item spikes | champion, item_id, text_* |
| `counters` | Counter picks | champion, counter_champion, tier |
| `matchups` | Specific matchups | my_champion, enemy_champion, tips_* |
| `user_notes` | Personal notes | user, champion_id, my_champion_id, content |
| `otp_codes` | Email verification | email, code, used |

### API Rules

- All collections have **empty API rules** (public access for now)
- Authentication is handled via Zustand store + PocketBase SDK

---

## 🌍 Internationalization

### Translation Files

- `lib/i18n/en.json` - English strings
- `lib/i18n/fr.json` - French strings
- `lib/i18n/types.ts` - TypeScript types for translations
- `lib/i18n/get-translations.ts` - Server-side translation getter
- `lib/i18n/actions.ts` - Server Actions for language switching

### Architecture (Cookie-based SSR)

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Cookie     │ ──► │ proxy.ts         │ ──► │ Server Component │
│ lanegap-lang│     │ (detect/default) │     │ getTranslations()│
└─────────────┘     └──────────────────┘     └──────────────────┘
                                                      │
                                                      ▼
                                             ┌──────────────────┐
                                             │ Client Component │
                                             │ (receives props) │
                                             └──────────────────┘
```

### Usage Pattern (Server → Client)

```typescript
// ✅ Server Component (page.tsx) - Gets translations, passes to children
import { getTranslations, getLanguage } from '@/lib/i18n'
import { SettingsPageClient } from './settings-page-client'

const SettingsPage = async () => {
  const t = await getTranslations()
  const language = await getLanguage()

  return <SettingsPageClient translations={t.settings} language={language} />
}

export default SettingsPage

// ✅ Client Component (receives translations via props)
// File: settings-page-client.tsx
'use client'

import type { TSettingsTranslations, TLanguage } from '@/lib/i18n'

interface ISettingsPageClientProps {
  translations: TSettingsTranslations
  language: TLanguage
}

export const SettingsPageClient = ({ translations: t, language }: ISettingsPageClientProps) => {
  return (
    <div>
      <h1>{t.title}</h1>
      <button>{t.save}</button>
    </div>
  )
}
```

### Important Rules

- ❌ **NEVER use `useTranslations` hook** - It's deprecated and will be removed
- ✅ **Always pass translations via props** from Server Components
- ✅ **Use `getTranslations()` and `getLanguage()`** in Server Components only
- ✅ **Split pages**: Server wrapper (`page.tsx`) + Client component (`*-page-client.tsx`)

### Language Switching

```typescript
// Use Server Action to change language
import { setLanguage } from '@/lib/i18n/actions'

export const LanguageToggle = () => {
  return (
    <button onClick={() => setLanguage('fr')}>FR</button>
  )
}
```

### Guidelines FR

Le français doit être du **coaching français naturel**:

✅ **Faire:**
- "Punish quand son E est down"
- "Trade quand il gaspille son Q"
- "Respect sa zone pre-6"

❌ **Ne pas faire:**
- "Punissez lorsque le E est en temps de recharge"
- Language trop formel

---

## ⚠️ Don'ts

- ❌ **Ne pas créer de fichiers .md supplémentaires** (sauf AGENTS.md)
- ❌ No unnecessary animations
- ❌ No over-abstraction
- ❌ No direct fetch in components (use React Query)
- ❌ No inline styles (use Tailwind)
- ❌ No default exports for components
- ❌ No `any` types

---

## ✅ Priorities

1. **Consistency** > Personal preferences
2. **React Query** for all data fetching
3. **Design System** components for all UI
4. **TypeScript strict** everywhere
5. **Readability** > Performance micro-optimizations

---

## 🚀 Quick Start

```bash
# Install
bun install

# Start PocketBase (in separate terminal)
cd pocketbase && ./pocketbase serve

# Sync data
bun run sync:champions
bun run sync:items

# Dev
bun dev

# Open http://localhost:3000
# PocketBase Admin: http://127.0.0.1:8090/_/
```

---

**Last Updated**: December 29, 2025
**Version**: 4.0.0 - SSR-first i18n with cookie-based language switching
