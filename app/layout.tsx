import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'
import { getLanguage, getTranslations } from '@/lib/i18n'
import { QueryProvider } from '@/lib/providers/query-provider'
import { Footer } from '@/components/layout/footer.component'
import { Header } from '@/components/layout/header.component'
import './globals.css'

// Sans-serif for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Display font for headings (League of Legends style)
const beaufort = localFont({
  src: [
    {
      path: '../fonts/BeaufortforLOL-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BeaufortforLOL-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/BeaufortforLOL-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/BeaufortforLOL-Heavy.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LANEGAP - Laning Phase Coaching Tool',
  description:
    'Master every matchup in League of Legends. Instant insights on counters, power spikes, and tips for all lanes.',
  keywords: [
    'League of Legends',
    'LoL',
    'laning phase',
    'coaching',
    'matchups',
    'counters',
    'tips',
  ],
  openGraph: {
    title: 'LANEGAP - Laning Phase Coaching Tool',
    description:
      'Master every matchup in League of Legends. Instant insights on counters, power spikes, and tips for all lanes.',
    type: 'website',
    siteName: 'LANEGAP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LANEGAP - Laning Phase Coaching Tool',
    description:
      'Master every matchup in League of Legends. Instant insights on counters, power spikes, and tips for all lanes.',
  },
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations()
  const language = await getLanguage()

  return (
    <html lang={language} className={`${inter.variable} ${beaufort.variable}`}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <QueryProvider>
          <Header translations={{ settings: t.settings.title, auth: t.auth }} />
          {children}
          <Footer translations={t.footer} />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              unstyled: true,
              classNames: {
                toast: 'flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg',
                error: 'bg-destructive/90 border-danger/40 text-danger',
                success: 'bg-card border-border text-foreground',
                default: 'bg-card border-border text-foreground',
                description: 'text-white/60',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
