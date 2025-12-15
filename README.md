# LANEGAP 🎮

> **Midlane Coaching Tool** - Get counters, tips, and power spikes in < 5 seconds

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![Bun](https://img.shields.io/badge/Bun-1.1-F9F1E1?logo=bun)

## ✨ Features

- 🎯 **Instant Counter Lookup** - Find who counters the enemy midlaner
- 💡 **Smart Tips** - Actionable coaching tips for any matchup
- ⚡ **Power Spikes** - Level and item breakpoints visualized
- 🏆 **Scrim Mode** - Ultra-compact view for competitive play
- 🌍 **Bilingual** - English & French support
- 🌙 **Dark Mode** - Easy on the eyes during long sessions

## 🚀 Quick Start

```bash
# Prerequisites: Bun 1.1+
curl -fsSL https://bun.sh/install | bash

# Clone & Install
git clone https://github.com/yourusername/lanegap.git
cd lanegap
bun install

# Sync champion data from Riot API
bun run sync:champions

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server with Turbopack |
| `bun run build` | Production build |
| `bun start` | Start production server |
| `bun run sync:champions` | Download champion icons |
| `bun run sync:items` | Download item icons |
| `bun run validate` | Validate database.json |
| `bun run lint` | Run ESLint |
| `bun run type-check` | TypeScript check |

## 🐳 Docker

```bash
# Build & run
bun run docker:build
bun run docker:up

# View logs
bun run docker:logs

# Stop
bun run docker:down
```

## 📁 Project Structure

```
lanegap/
├── app/                # Next.js App Router
├── components/         # React components
├── lib/               # Utilities & types
├── data/              # Local JSON database
├── hooks/             # Custom React hooks
├── scripts/           # CLI tools
└── docker/            # Docker config
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Runtime**: Bun 1.1+
- **Language**: TypeScript 5.9+ (Strict mode)
- **Styling**: Tailwind CSS 4+
- **State**: Zustand 5+
- **Icons**: React Icons (Lucide)
- **Data**: Riot Data Dragon API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m ':sparkles: feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is a fan-made tool for League of Legends players.
League of Legends and all associated properties are trademarks of Riot Games, Inc.

---

Built with ❤️ for the midlane community
