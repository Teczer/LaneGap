import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
