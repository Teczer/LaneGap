# 🎮 LANEGAP

> **Personal midlane coaching app for League of Legends**
>
> Access critical matchup information in **< 5 seconds**.

```
Think like a pro player building his own tool.
```

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Bun](https://img.shields.io/badge/Bun-1.1-fbf0df?logo=bun)

---

## ✨ Features

- 🎯 **Counter Picks** — Find the best champions to play against any enemy
- 📝 **Matchup Tips** — Coaching tips written in natural language (EN/FR)
- ⚡ **Power Spikes** — Know when enemies are strong (levels & items)
- 🌍 **Bilingual** — Full support for English and French
- ⌨️ **Keyboard First** — Navigate quickly with keyboard shortcuts
- 🌙 **Dark Mode Only** — DPM-inspired gaming aesthetic

---

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Sync assets from Data Dragon
bun run sync:champions
bun run sync:items

# Start development server
bun dev

# Open http://localhost:3000
```

---

## 📖 User Flow

```
1. Home Page     → Select the ENEMY champion you're facing
2. Enemy Page    → View counters, tips, and power spikes
3. Matchup Page  → Detailed tips for YOUR CHAMP vs ENEMY
```

---

## 📊 Contributing Data

All champion data is stored in `data/database.json`. Here's how to contribute:

### Adding a Champion

```json
{
  "id": "Orianna",
  "name": { "en": "Orianna", "fr": "Orianna" },
  "dateEdited": "2025-12-16",
  "countersWholeGame": {
    "S": ["Yasuo", "Kassadin"],
    "A+": ["Fizz", "Zed"]
  },
  "tips": {
    "en": ["Punish her level 1 - Q is weak with 6 sec CD"],
    "fr": ["Punish son level 1 - Q est faible avec 6 sec CD"]
  },
  "levelSpikes": [...],
  "itemSpikes": [...]
}
```

### Level Spikes

```json
{
  "level": 1,
  "text": {
    "en": "WEAK LVL 1 - Q does 40 dmg with 6 sec CD, abuse it",
    "fr": "FAIBLE LVL 1 - Q fait 40 dmg avec 6 sec CD, abuse ça"
  },
  "important": true  // Optional: highlights this spike
}
```

### Item Spikes

```json
{
  "item": "2503",
  "text": {
    "en": "Blackfire Torch - Champion comes online",
    "fr": "Blackfire Torch - Le champion devient fort"
  }
}
```

### 🔍 Finding Item IDs

Item icons are synced from Riot's Data Dragon. To find the correct item ID:

```bash
# Search by name in metadata
grep -i "blackfire" public/items/metadata.json

# Output: "id": "2503", "name": "Blackfire Torch"
```

Common items reference:

| Item | ID |
|------|-----|
| Blackfire Torch | `2503` |
| Liandry's Torment | `6653` |
| Rabadon's Deathcap | `3089` |
| Zhonya's Hourglass | `3157` |
| Luden's Companion | `6655` |
| Stormsurge | `6657` |
| Rod of Ages | `3003` |
| Seraph's Embrace | `3040` |

Full list available in `public/items/metadata.json`.

---

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server (Turbopack) |
| `bun run build` | Production build |
| `bun start` | Start production server |
| `bun run sync:champions` | Download champion icons |
| `bun run sync:items` | Download item icons |
| `bun run validate` | Validate database.json |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Bun 1.1+ |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 (strict) |
| Styling | Tailwind CSS 4 |
| State | Zustand 5 |
| Icons | React Icons (Lucide) |
| Validation | Zod 4 |

---

## 📁 Project Structure

```
lanegap/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home - Select enemy
│   ├── enemy/[id]/        # Enemy details
│   └── matchup/[my]/[vs]/ # Matchup details
├── components/            # React components
├── data/                  # JSON database
│   └── database.json      # All champion data
├── public/
│   ├── champions/icons/   # Champion icons
│   └── items/             # Item icons + metadata
├── lib/                   # Utils & types
├── hooks/                 # Custom hooks
└── scripts/               # Sync scripts
```

---

## 🌍 Internationalization

Tips should be written in **natural coaching language**:

✅ **Do:**
- "Punish quand son E est down"
- "Trade when he wastes Q on wave"
- "Respect his zone pre-6"

❌ **Don't:**
- "Punissez lorsque le E est en temps de recharge"
- Overly formal language

---

## 📜 License

MIT © LaneGap Team

---

**Version**: 1.0.0 • **Last Updated**: December 2025
