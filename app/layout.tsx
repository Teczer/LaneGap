import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { QueryProvider } from '@/lib/providers/query-provider'
import { Footer } from '@/components/layout/footer.component'
import { Header } from '@/components/layout/header.component'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'LANEGAP - Midlane Coaching Tool',
  description:
    'Instant midlane matchup insights for League of Legends. Get coaching in < 5 seconds.',
  keywords: ['League of Legends', 'LoL', 'midlane', 'coaching', 'matchups', 'counters'],
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <html lang={lang} className={inter.variable}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <QueryProvider>
          <Header />
          {children}
          <Footer />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              unstyled: true,
              classNames: {
                toast: 'flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg',
                error: 'bg-red-950/90 border-red-500/40 text-red-100',
                success: 'bg-[#1a1f35] border-white/10 text-white',
                default: 'bg-[#1a1f35] border-white/10 text-white',
                description: 'text-white/60',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}
