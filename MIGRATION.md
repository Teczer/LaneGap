# 🚀 Migration Plan - i18n + PocketBase

> Plan de migration pour LANEGAP vers i18n et PocketBase

---

## 📋 Overview

| Migration | Status | Priority |
|-----------|--------|----------|
| i18n (next-intl) | ✅ Done | High |
| PocketBase Setup | ✅ Done | High |
| Data Migration | ⏳ Pending | High |
| Authentication | ⏳ Pending | Medium |
| Frontend Integration | ⏳ Pending | High |

---

## Phase 1: i18n Setup (next-intl)

### 1.1 Installation

```bash
bun add next-intl
```

### 1.2 Create translation files

```
lib/
└── i18n/
    ├── en.json
    ├── fr.json
    └── config.ts
```

### 1.3 Strings to extract (21 occurrences)

| File | Count | Strings |
|------|-------|---------|
| `app/page.tsx` | 5 | search placeholder, favorites, recent, results, no champions |
| `app/enemy/[id]/page.tsx` | 7 | back, facing enemy, updated, favorited, best picks, how to play, power/item spikes |
| `app/matchup/[myChamp]/[enemyChamp]/page.tsx` | 7 | back, playing as, enemy, how to beat, power/item spikes, coming soon |
| `components/toggles/language-toggle.component.tsx` | 1 | EN/FR labels |
| `app/store/settings.store.ts` | 1 | default language |

### 1.4 Implementation Steps

- [ ] Install next-intl
- [ ] Create `lib/i18n/en.json` with all strings
- [ ] Create `lib/i18n/fr.json` with all strings
- [ ] Create `lib/i18n/config.ts` for configuration
- [ ] Create `useTranslation` hook or use next-intl's `useTranslations`
- [ ] Update all 5 files to use translations
- [ ] Test both languages

---

## Phase 2: PocketBase Setup

### 2.1 What is PocketBase?

- Open source backend in 1 file
- Embedded SQLite database
- Built-in admin dashboard (http://localhost:8090/_/)
- REST API auto-generated
- Realtime subscriptions
- Authentication (email/password + OAuth2)
- File storage

### 2.2 Installation

```bash
# Download PocketBase (macOS ARM)
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.24.4/pocketbase_0.24.4_darwin_arm64.zip -o pocketbase.zip
unzip pocketbase.zip -d pocketbase
rm pocketbase.zip

# Or via Homebrew
brew install pocketbase
```

### 2.3 Collections Schema

#### `champions` collection
| Field | Type | Required |
|-------|------|----------|
| id | text (auto) | ✅ |
| champion_id | text | ✅ |
| name_en | text | ✅ |
| name_fr | text | ✅ |
| date_edited | date | ✅ |
| tips_en | json (string[]) | ✅ |
| tips_fr | json (string[]) | ✅ |

#### `counters` collection
| Field | Type | Required |
|-------|------|----------|
| id | text (auto) | ✅ |
| champion | relation (champions) | ✅ |
| counter_champion | relation (champions) | ✅ |
| tier | select (S, A+, A, B+, B, B-, C) | ✅ |

#### `level_spikes` collection
| Field | Type | Required |
|-------|------|----------|
| id | text (auto) | ✅ |
| champion | relation (champions) | ✅ |
| level | number (1-18) | ✅ |
| text_en | text | ✅ |
| text_fr | text | ✅ |
| important | bool | ❌ |

#### `item_spikes` collection
| Field | Type | Required |
|-------|------|----------|
| id | text (auto) | ✅ |
| champion | relation (champions) | ✅ |
| item_id | text | ✅ |
| text_en | text | ✅ |
| text_fr | text | ✅ |

#### `matchups` collection
| Field | Type | Required |
|-------|------|----------|
| id | text (auto) | ✅ |
| my_champion | relation (champions) | ✅ |
| enemy_champion | relation (champions) | ✅ |
| tips_en | json (string[]) | ✅ |
| tips_fr | json (string[]) | ✅ |

#### `users` collection (built-in)
- email/password authentication
- Optional: OAuth2 (Google, Discord, etc.)

### 2.4 Implementation Steps

- [x] Download/install PocketBase
- [x] Create `pocketbase/` directory in project
- [x] Add to `.gitignore`: `pocketbase/pb_data/`
- [x] Install PocketBase SDK: `bun add pocketbase`
- [x] Create `lib/pocketbase.ts` client
- [ ] Start PocketBase: `cd pocketbase && ./pocketbase serve`
- [ ] Access admin: http://127.0.0.1:8090/_/
- [ ] Create admin account
- [ ] Create all collections with schema above
- [ ] Configure API rules (public read, authenticated write)

### 2.5 Creating Collections (Admin Dashboard)

After starting PocketBase and creating an admin account:

1. Go to http://127.0.0.1:8090/_/
2. Click "New collection" for each:

#### Collection: `champions`
```
Fields:
- champion_id (text, required, unique)
- name_en (text, required)
- name_fr (text, required)
- date_edited (date, required)
- tips_en (json, required, default: [])
- tips_fr (json, required, default: [])

API Rules:
- List/Search: (public)
- View: (public)
- Create: @request.auth.id != ""
- Update: @request.auth.id != ""
- Delete: @request.auth.id != ""
```

#### Collection: `level_spikes`
```
Fields:
- champion (relation -> champions, required)
- level (number, required, min: 1, max: 18)
- text_en (text, required)
- text_fr (text, required)
- important (bool, default: false)

API Rules: Same as champions
```

#### Collection: `item_spikes`
```
Fields:
- champion (relation -> champions, required)
- item_id (text, required)
- text_en (text, required)
- text_fr (text, required)

API Rules: Same as champions
```

#### Collection: `counters`
```
Fields:
- champion (relation -> champions, required)
- counter_champion (relation -> champions, required)
- tier (select: S, A+, A, B+, B, B-, C, required)

API Rules: Same as champions
```

#### Collection: `matchups`
```
Fields:
- my_champion (relation -> champions, required)
- enemy_champion (relation -> champions, required)
- tips_en (json, required, default: [])
- tips_fr (json, required, default: [])

API Rules: Same as champions
```

---

## Phase 3: Data Migration

### 3.1 Migration Script

Create `scripts/migrate-to-pocketbase.ts`:

```typescript
// Reads database.json
// Creates records in PocketBase via SDK
// Handles relationships (champions -> level_spikes, etc.)
```

### 3.2 Run Migration

```bash
# Make sure PocketBase is running
cd pocketbase && ./pocketbase serve

# In another terminal, run migration
POCKETBASE_EMAIL=your@email.com POCKETBASE_PASSWORD=yourpassword bun run scripts/migrate-to-pocketbase.ts
```

### 3.3 Implementation Steps

- [x] Install PocketBase SDK: `bun add pocketbase`
- [x] Create migration script
- [ ] Start PocketBase and create admin account
- [ ] Create collections in admin dashboard
- [ ] Run migration script
- [ ] Verify data in admin dashboard
- [ ] Test API endpoints

---

## Phase 4: Authentication

### 4.1 Features

- Email/password login
- Optional: OAuth2 (Discord for gamers?)
- Protected routes for admin features
- Public access for reading data

### 4.2 Implementation Steps

- [ ] Configure auth rules in PocketBase
- [ ] Create login page `/login`
- [ ] Create auth store (Zustand)
- [ ] Add auth middleware for protected routes
- [ ] Add logout functionality

---

## Phase 5: Frontend Integration

### 5.1 PocketBase SDK Setup

```typescript
// lib/pocketbase.ts
import PocketBase from 'pocketbase'

export const pb = new PocketBase('http://127.0.0.1:8090')
```

### 5.2 Update Hooks

Replace `use-database.hook.ts` with PocketBase queries:

```typescript
// Before
const database = databaseJson as IDatabase

// After
const champions = await pb.collection('champions').getFullList()
```

### 5.3 Implementation Steps

- [ ] Install SDK: `bun add pocketbase`
- [ ] Create `lib/pocketbase.ts`
- [ ] Create new hooks:
  - `useChampions()` - fetch all champions
  - `useChampion(id)` - fetch single champion with relations
  - `useMatchup(my, enemy)` - fetch matchup data
  - `useAuth()` - authentication state
- [ ] Update all pages to use new hooks
- [ ] Remove `data/database.json` dependency
- [ ] Test all features

---

## 📁 New Project Structure

```
lanegap/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   └── ...
├── lib/
│   ├── i18n/
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── config.ts
│   ├── pocketbase.ts
│   └── ...
├── hooks/
│   ├── use-champions.hook.ts
│   ├── use-matchup.hook.ts
│   ├── use-auth.hook.ts
│   └── use-translations.hook.ts
├── pocketbase/
│   ├── pocketbase (binary)
│   └── pb_data/ (gitignored)
└── scripts/
    └── migrate-to-pocketbase.ts
```

---

## 🎯 Execution Order

1. **Phase 1**: i18n (can be done independently)
2. **Phase 2**: PocketBase setup (parallel with Phase 1)
3. **Phase 3**: Data migration (after Phase 2)
4. **Phase 4**: Authentication (after Phase 2)
5. **Phase 5**: Frontend integration (after Phase 3)

---

## 📝 Notes

- PocketBase runs on port 8090 by default
- Admin dashboard: http://127.0.0.1:8090/_/
- API base: http://127.0.0.1:8090/api/
- Keep `database.json` as backup until migration is verified
- Consider Docker deployment for production

---

**Created**: December 16, 2025
**Status**: Planning Phase

