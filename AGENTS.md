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
3. Matchup Page → Shows:
   - Playing as [MY CHAMP] vs [ENEMY]
   - All tips for beating the enemy
   - Enemy power spikes to be aware of
   - General tips for your champion
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
| **Icons** | React Icons 5+ | Lucide icons (Lu prefix) |
| **Images** | Local files | Synced from Data Dragon |

---

## 📁 Project Structure

```
lanegap/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home - Select enemy champion
│   ├── enemy/[id]/        # Enemy page - counters & tips
│   ├── matchup/[myChamp]/[enemyChamp]/  # Matchup details
│   ├── store/             # Zustand stores
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Design system (DPM-inspired)
│
├── components/            # Shared components
│   ├── ui/               # Primitives (button, card, input...)
│   ├── champion/         # Champion-specific
│   ├── matchup/          # Matchup-specific
│   ├── layout/           # Header, Footer, PageContainer
│   └── toggles/          # Language toggle
│
├── lib/                  # Utilities
│   ├── types.ts         # TypeScript types
│   ├── utils.ts         # cn(), helpers
│   ├── config.ts        # App config
│   └── data-dragon.ts   # Local image helpers
│
├── data/                 # Local JSON database
│   ├── database.json    # Champions data (22+ champions)
│   └── schema.ts        # Zod validation schema
│
├── public/              # Static assets
│   ├── champions/icons/ # Champion icons (synced)
│   └── items/           # Item icons (synced)
│
├── hooks/               # Custom React hooks
│   ├── use-database.hook.ts
│   └── use-settings.hook.ts
│
├── scripts/             # CLI scripts
│   ├── sync-champions.ts
│   ├── sync-items.ts
│   └── validate-database.ts
│
└── docker/              # Docker configuration
    └── Dockerfile
```

---

## 🎨 Code Style

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (components) | kebab-case.component.tsx | `champion-icon.component.tsx` |
| Files (hooks) | use-name.hook.ts | `use-database.hook.ts` |
| Files (stores) | name.store.ts | `settings.store.ts` |
| Interfaces | `I` prefix | `IChampion`, `IButtonProps` |
| Types | `T` prefix | `TLanguage`, `TTier` |
| Components | PascalCase | `ChampionCard`, `TierBadge` |
| Functions | camelCase | `getChampionIconUrl` |

### TypeScript Rules

- **Strict mode**: Always enabled
- **No `any`**: Use proper types
- **Explicit return types**: For public functions
- **Named exports only**: No default exports for components

---

## 🔧 Commands

```bash
# Development
bun dev                    # Start dev server (Turbopack)

# Build
bun run build              # Production build
bun start                  # Start production server

# Scripts
bun run sync:champions     # Download champion icons locally
bun run sync:items         # Download item icons locally
bun run validate           # Validate database.json

# Quality
bun run lint               # ESLint
bun run type-check         # TypeScript check
bun run format             # Prettier
```

---

## 📊 Data Model

### Champion

```typescript
interface IChampion {
  id: string                              // "Ahri"
  name: ILocalizedText                    // { en: "Ahri", fr: "Ahri" }
  dateEdited: string                      // "2025-11-05"
  countersWholeGame: Partial<Record<TTier, string[]>>  // Champions GOOD against this one
  tips: { en: string[], fr: string[] }    // How to play AGAINST this champion
  levelSpikes: ILevelSpike[]              // When this champion is strong
  itemSpikes: IItemSpike[]                // Item power spikes
}
```

### Tier System

```
S    → Hard Counter (emerald gradient)
A+   → Strong Counter (cyan gradient)
A    → Counter (blue gradient)
B+   → Slight Advantage (purple gradient)
B    → Even (violet gradient)
B-   → Slight Disadvantage (indigo gradient)
C    → Countered (slate gradient)
```

---

## 🌍 Internationalization

### Guidelines FR

Le français doit être du **coaching français naturel**:

✅ **Faire:**
- "Punish quand son E est down"
- "Trade quand il gaspille son Q"
- "Respect sa zone pre-6"

❌ **Ne pas faire:**
- "Punissez lorsque le E est en temps de recharge"
- Language trop formel

### Usage

```typescript
const language = useSettingsStore((s) => s.language)
const tips = champion.tips[language]
```

---

## ⚠️ Don'ts

- ❌ **Ne pas créer de fichiers .md supplémentaires** (CHANGELOG, MIGRATION, etc.)
- ❌ No unnecessary animations
- ❌ No over-abstraction
- ❌ No backend calls (local JSON only)
- ❌ No auth/users system
- ❌ No database (file-based only)
- ❌ No Scrim Mode (removed)
- ❌ No web checks in development

---

## ✅ Priorities

1. **Readability** > Performance micro-optimizations
2. **Simplicity** > Over-engineering
3. **Keyboard navigation** > Mouse-only UX
4. **Fast iteration** > Perfect architecture

---

## 🚀 Quick Start

```bash
# Install
bun install

# Sync data (downloads icons locally)
bun run sync:champions
bun run sync:items

# Validate data
bun run validate

# Dev
bun dev

# Open http://localhost:3000
```

---

**Last Updated**: December 15, 2025
**Version**: 2.0.0
