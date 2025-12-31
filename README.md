# 🧩 LANEGAP

> **Personal midlane coaching app for League of Legends**
>
> Access critical matchup information in **< 5 seconds**.

```
Think like a pro player building his own tool.
```

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![PocketBase](https://img.shields.io/badge/PocketBase-0.25-b8dbe4?logo=pocketbase)
![Bun](https://img.shields.io/badge/Bun-1.1-fbf0df?logo=bun)

---

## ✨ Features

- 🎯 **Counter Picks** — Find the best champions to play against any enemy
- 📝 **Matchup Tips** — Coaching tips written in natural language (EN/FR)
- ⚡ **Power Spikes** — Know when enemies are strong (levels & items)
- 🔐 **Authentication** — Login with OTP email, Google, or Discord
- 📓 **Personal Notes** — Save your own notes per matchup (auth required)
- 🌍 **Bilingual** — Full support for English and French (SSR-first)
- ⌨️ **Keyboard First** — Navigate quickly with keyboard shortcuts
- 🌙 **LoL Aesthetic** — Dark mode with official League of Legends gold theme

---

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start PocketBase backend (in separate terminal)
cd pocketbase && ./pocketbase serve

# Sync assets from Data Dragon
bun run sync:champions
bun run sync:items

# Start development server
bun dev

# Or start both at once
bun run dev:full
```

**URLs:**
- Frontend: http://localhost:3000
- PocketBase Admin: http://127.0.0.1:8090/_/

---

## 📖 User Flow

```
1. Home Page     → Select the ENEMY champion you're facing
2. Enemy Page    → View counters, tips, power spikes, and dynamic background
3. Matchup Page  → Detailed tips for YOUR CHAMP vs ENEMY
4. Settings      → Change language, update password, manage account
```

---

## 🏗️ Tech Stack

| Category | Technology | Notes |
|----------|------------|-------|
| **Runtime** | Bun 1.1+ | Package manager + runtime |
| **Framework** | Next.js 16 | App Router + Turbopack |
| **Language** | TypeScript 5.9 | Strict mode |
| **Styling** | Tailwind CSS 4 | LoL gold theme + Beaufort font |
| **State** | Zustand 5 | Client-side persistence |
| **Server State** | React Query 5 | Caching, mutations |
| **Backend** | PocketBase | Auth, Database, Admin UI |
| **Animations** | Framer Motion | Smooth transitions |
| **Forms** | React Hook Form + Zod | Validation |
| **Icons** | React Icons (Lucide) | Lu prefix |

---

## 📁 Project Structure

```
lanegap/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home - Select enemy
│   ├── auth/              # Login/Register with OTP
│   ├── enemy/[id]/        # Enemy details + dynamic background
│   ├── settings/          # User settings
│   ├── store/             # Zustand stores
│   └── api/auth/          # OTP API routes
├── components/
│   ├── ui/                # Design system (Button, Input, Card...)
│   ├── champion/          # Champion cards, icons, search
│   ├── matchup/           # Tips, spikes, tier badges
│   ├── notes/             # Personal notes
│   ├── settings/          # Settings sections
│   └── layout/            # Header, Footer, Background
├── hooks/
│   └── queries/           # React Query hooks
├── lib/
│   ├── api/               # PocketBase API functions
│   ├── i18n/              # SSR translations (EN/FR)
│   └── validations/       # Zod schemas
├── pocketbase/            # PocketBase binary + migrations
├── public/
│   ├── champions/icons/   # Champion icons (synced)
│   └── items/             # Item icons (synced)
├── fonts/                 # BeaufortforLOL font files
└── scripts/               # Sync scripts
```

---

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start Next.js dev server |
| `bun run dev:full` | Start Next.js + PocketBase |
| `bun run build` | Production build |
| `bun start` | Start production server |
| `bun run sync:champions` | Download champion icons |
| `bun run sync:items` | Download item icons |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |
| `bun run type-check` | TypeScript strict check |

---

## 🌍 Internationalization

The app uses **SSR-first i18n** with cookie-based language detection.

Tips should be written in **natural coaching language**:

✅ **Do:**
- "Punish quand son E est down"
- "Trade when he wastes Q on wave"
- "Respect his zone pre-6"

❌ **Don't:**
- "Punissez lorsque le E est en temps de recharge"
- Overly formal language

Language can be changed in **Settings** → **Language**.

---

## 🎨 Design

- **Theme:** Official League of Legends gold (`#C4A15B`, `#EDDC91`)
- **Font:** BeaufortforLOL for headings, Inter for body
- **Mode:** Dark only (gaming aesthetic)
- **Animations:** Framer Motion for smooth transitions

---

## 📜 License

MIT © LaneGap Team

---

**Version**: 2.0.0 • **Last Updated**: December 2025
