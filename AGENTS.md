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
5. Onboarding Page → Profile setup (pseudo + avatar) for new users
```

### Authentication & Onboarding Flow

```
/auth (Login/Register)
    │
    ├─► Email verified? ──► YES ──► Redirect to /
    │
    └─► NO ──► OTP Verification (full-screen overlay)
                    │
                    ├─► New registration? ──► YES ──► /onboarding
                    │
                    └─► Existing user ──► Redirect to /

/onboarding (Protected route - auth required)
    │
    ├─► Step 1: Pseudo (skip possible)
    │
    └─► Step 2: Avatar (skip possible) ──► Redirect to /
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
│   ├── onboarding/               # Profile setup flow
│   │   ├── page.tsx
│   │   ├── layout.tsx            # Full-screen overlay layout
│   │   └── onboarding-page-client.tsx
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
├── features/                     # Feature-based architecture
│   ├── auth/                     # Auth feature module
│   │   ├── components/
│   │   │   ├── auth-benefits.component.tsx
│   │   │   ├── auth-header.component.tsx
│   │   │   ├── auth-mode-toggle.component.tsx
│   │   │   ├── login-form.component.tsx
│   │   │   ├── register-form.component.tsx
│   │   │   ├── oauth-buttons.component.tsx
│   │   │   ├── otp-step.component.tsx
│   │   │   └── index.ts
│   │   ├── types/index.ts
│   │   └── index.ts              # Barrel export
│   │
│   └── onboarding/               # Onboarding feature module
│       ├── components/
│       │   ├── pseudo-step.component.tsx
│       │   ├── avatar-step.component.tsx
│       │   ├── progress-indicator.component.tsx
│       │   └── index.ts
│       └── index.ts              # Barrel export
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
│   ├── use-require-auth.hook.ts  # Auth state helper
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
│   ├── image-utils.ts            # Image compression utility
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

## 📝 Form Patterns (React Hook Form + Zod)

### Single useForm at Parent Level

Pour les formulaires complexes avec plusieurs étapes ou modes, utiliser **un seul `useForm`** au niveau du parent et passer les props aux enfants.

```typescript
// ✅ Good - Single useForm at parent
const { register, control, getValues, setError, trigger, formState: { errors } } = useForm<TAuthForm>({
  resolver: zodResolver(authFormSchema),
  defaultValues: { email: '', password: '', confirmPassword: '' },
})

// Pass to children
<LoginForm register={register} errors={errors} onSubmit={handleLogin} />
<RegisterForm register={register} errors={errors} onSubmit={handleRegister} />
```

```typescript
// ❌ Bad - Multiple useForm instances
const loginForm = useForm<TLoginForm>({ ... })
const registerForm = useForm<TRegisterForm>({ ... })
```

### useWatch for Reactive Values

Utiliser `useWatch` pour récupérer des valeurs réactives du formulaire sans re-render complet.

```typescript
// ✅ Good - useWatch for reactive values
const email = useWatch({ control, name: 'email' })
const password = useWatch({ control, name: 'password' })

// Use in OTP step display
<p>{email}</p>
```

```typescript
// ❌ Bad - useState sync with form values
const [email, setEmail] = useState('')
useEffect(() => { setEmail(getValues('email')) }, [])
```

### Validation Pattern

```typescript
// ✅ Validate specific fields before action
const handleLogin = async () => {
  const isValid = await trigger(['email', 'password'])
  if (!isValid) return
  
  const values = getValues()
  // proceed...
}

// ✅ Use safeParse for complex validation
const result = registerSchema.safeParse(values)
if (!result.success) {
  result.error.issues.forEach((issue) => {
    setError(issue.path[0] as keyof TAuthForm, { message: issue.message })
  })
  return
}
```

### mode: 'onChange' for Real-time Validation

```typescript
// ✅ For inputs that need real-time feedback
const form = useForm<TProfileSetupForm>({
  resolver: zodResolver(profileSetupSchema),
  defaultValues: { name: '' },
  mode: 'onChange',  // Validate on every change
})

const { isValid, errors } = form.formState
const nameValue = form.watch('name')

// Button disabled until valid
<Button disabled={!isValid || !nameValue.trim()}>
  {t.continueButton}
</Button>
```

---

## 🔒 Route Protection (proxy.ts)

### Pattern

La protection des routes se fait via `proxy.ts` (middleware Next.js 16), **jamais avec `useEffect`**.

```typescript
// proxy.ts
const PROTECTED_ROUTES = ['/settings', '/onboarding']
const AUTH_ROUTES = ['/auth']

// Redirect to /auth if protected route and not authenticated
if (isProtectedRoute && !isAuthenticated) {
  return NextResponse.redirect(new URL('/auth', request.url))
}

// Redirect to home if auth route and already authenticated
if (isAuthRoute && isAuthenticated) {
  return NextResponse.redirect(new URL('/', request.url))
}
```

### Rules

- ❌ **NEVER use `useEffect` for auth redirects** — C'est un anti-pattern
- ✅ **Use `proxy.ts`** for server-side route protection
- ✅ **Protected routes** are checked before page render

```typescript
// ❌ Bad - useEffect redirect anti-pattern
useEffect(() => {
  if (!user) {
    router.push('/auth')
  }
}, [user])

// ✅ Good - Server-side protection in proxy.ts
// User never sees the protected page if not authenticated
```

---

## 🖼️ Image Upload Pattern

### Compression avec browser-image-compression

Toujours compresser les images côté client avant upload.

```typescript
// lib/image-utils.ts
import imageCompression from 'browser-image-compression'

const MAX_SIZE_MB = 1
const MAX_WIDTH_OR_HEIGHT = 1024
const MAX_INPUT_SIZE_MB = 10

export const compressImage = async (file: File): Promise<ICompressResult> => {
  if (!file.type.startsWith('image/')) {
    throw new Error('invalid_file_type')
  }

  if (file.size > MAX_INPUT_SIZE_MB * 1024 * 1024) {
    throw new Error('file_too_large')
  }

  const compressedFile = await imageCompression(file, {
    maxSizeMB: MAX_SIZE_MB,
    maxWidthOrHeight: MAX_WIDTH_OR_HEIGHT,
    useWebWorker: true,
    fileType: 'image/jpeg',
  })

  const preview = await imageCompression.getDataUrlFromFile(compressedFile)
  return { file: compressedFile, preview }
}
```

### Usage in Components

```typescript
const [isCompressing, setIsCompressing] = useState(false)
const [error, setError] = useState<string | null>(null)

const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  setError(null)
  setIsCompressing(true)

  try {
    const { file: compressedFile, preview } = await compressImage(file)
    setAvatarFile(compressedFile)
    setPreview(preview)
  } catch (err) {
    const errorCode = err instanceof Error ? err.message : 'unknown_error'
    setError(errorMessages[errorCode] || "Erreur lors du chargement")
  } finally {
    setIsCompressing(false)
    // Reset input to allow re-selecting same file
    if (fileInputRef.current) fileInputRef.current.value = ''
  }
}
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
| Files (hooks) | use-name.hook.ts | `use-settings.hook.ts` |
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

### Git Commit Messages

Tous les commits doivent être préfixés par un **gitmoji** adapté :

```bash
# Format
:gitmoji: Message concis en anglais

# Exemples
:lipstick: Update button primary styles with gold theme
:sparkles: Add dynamic champion background on enemy page
:bug: Fix OTP email sending in production
:recycle: Refactor header component to use Shadcn DropdownMenu
:fire: Remove deprecated useTranslations hook
:wrench: Add cascade delete for user_notes collection
:globe_with_meridians: Add French translations for settings page
:art: Improve code structure in auth store
```

**Gitmojis fréquents :**

| Emoji | Code | Usage |
|-------|------|-------|
| 💄 | `:lipstick:` | UI/style changes |
| ✨ | `:sparkles:` | New feature |
| 🐛 | `:bug:` | Bug fix |
| ♻️ | `:recycle:` | Refactor |
| 🔥 | `:fire:` | Remove code/files |
| 🔧 | `:wrench:` | Config changes |
| 🌐 | `:globe_with_meridians:` | i18n/translations |
| 🎨 | `:art:` | Code structure |
| ⚡ | `:zap:` | Performance |
| 🚀 | `:rocket:` | Deploy/release |
| 📝 | `:memo:` | Documentation |
| ✅ | `:white_check_mark:` | Tests |

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

## 🎭 Full-Screen Overlay Pattern

### For Focused Flows (OTP, Onboarding)

Utiliser un layout dédié ou un overlay pour les flows qui nécessitent une attention totale.

```typescript
// app/onboarding/layout.tsx
const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background fixed inset-0 z-50 flex min-h-screen items-center justify-center p-4">
      {children}
    </div>
  )
}

export default OnboardingLayout
```

### OTP Overlay in Auth Page

```typescript
// Dans auth-page-client.tsx
if (step === 'otp') {
  return (
    <OTPStep
      translations={t}
      email={email}
      onVerify={handleVerifyOTP}
      onBack={handleBackToForm}
    />
  )
}

// otp-step.component.tsx
return (
  <div className="bg-background fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Full-screen OTP UI */}
  </div>
)
```

### Multi-Step Progress Indicator

```typescript
<ProgressIndicator
  currentStep={step}
  steps={['pseudo', 'avatar']}
  showBack={step === 'avatar'}
  onBack={handleBack}
/>
```

---

## 🏗️ Feature-Based Architecture

### When to Use `features/`

Pour les flows complexes avec plusieurs composants interconnectés, créer un module dans `features/`.

```
features/
├── auth/                     # Auth feature
│   ├── components/           # Feature-specific components
│   │   ├── login-form.component.tsx
│   │   ├── otp-step.component.tsx
│   │   └── index.ts          # Barrel export
│   ├── types/index.ts        # Feature types
│   └── index.ts              # Main barrel export
│
└── onboarding/               # Onboarding feature
    ├── components/
    └── index.ts
```

### Import Pattern

```typescript
// ✅ Import from feature barrel
import { LoginForm, OTPStep, AuthHeader } from '@/features/auth'
import type { TAuthMode } from '@/features/auth'

// ✅ Import from onboarding feature
import { PseudoStep, AvatarStep, ProgressIndicator } from '@/features/onboarding'
```

### Rules

- ✅ **Group related components** in feature folders
- ✅ **Barrel exports** (`index.ts`) for clean imports
- ✅ **Feature types** in `types/index.ts`
- ❌ **Don't over-engineer** — Only create features for complex flows

---

## 🚫 State Management Anti-Patterns

### Don't Over-Engineer with Context

```typescript
// ❌ Bad - Context for simple local state
const AuthContext = createContext<IAuthContext | null>(null)
const AuthProvider = ({ children }) => {
  const [mode, setMode] = useState('login')
  const [step, setStep] = useState('form')
  // ...
}

// ✅ Good - Local state is simpler
const AuthPageClient = () => {
  const [mode, setMode] = useState<TAuthMode>('login')
  const [step, setStep] = useState<TFlowStep>('form')
  // Pass handlers to children as props
}
```

### Use Context Only When

1. State is needed **deep in the tree** (3+ levels)
2. Many components need the **same state**
3. **Avoiding prop drilling** is a real problem

### useRef for Non-Reactive Data

```typescript
// ✅ Good - useRef for data that shouldn't trigger re-renders
const pendingAuthRef = useRef<IPendingAuth | null>(null)

// Set without re-render
pendingAuthRef.current = { email, password }

// Read in callbacks
const handleVerify = async () => {
  const { email, password } = pendingAuthRef.current!
  await login({ email, password })
}
```

---

## 🔐 Security Patterns

### Never Store Credentials in URLs

```typescript
// ❌ Bad - Password in URL params
router.push(`/onboarding?email=${email}&p=${password}`)

// ❌ Bad - Password in sessionStorage
sessionStorage.setItem('credentials', JSON.stringify({ email, password }))

// ✅ Good - Keep credentials in memory (useRef) during flow
const pendingAuthRef = useRef<{ email: string; password: string } | null>(null)
```

### Multi-Step Flow Pattern

Pour les flows multi-étapes (auth → OTP → onboarding), garder les credentials en mémoire uniquement le temps nécessaire.

```typescript
// auth-page-client.tsx
const [step, setStep] = useState<'form' | 'otp'>('form')

// Credentials stay in form state via useWatch
const email = useWatch({ control, name: 'email' })
const password = useWatch({ control, name: 'password' })

const handleVerifyOTP = async (code: string) => {
  await verifyOTPMutation.mutateAsync({ email, code })
  await login({ email, password })  // Use form values directly
  router.push(isNewRegistration ? '/onboarding' : '/')
}
```

---

## ⚠️ Don'ts

- ❌ **Ne pas créer de fichiers .md supplémentaires** (sauf AGENTS.md)
- ❌ No unnecessary animations
- ❌ No over-abstraction (especially Context)
- ❌ No direct fetch in components (use React Query)
- ❌ No inline styles (use Tailwind)
- ❌ No default exports for components
- ❌ No `any` types
- ❌ No `useEffect` for auth redirects (use proxy.ts)
- ❌ No credentials in URLs or sessionStorage
- ❌ No multiple `useForm` instances when one suffices

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

**Last Updated**: January 26, 2026
**Version**: 5.0.0 - Feature-based architecture, form patterns, route protection, image compression
