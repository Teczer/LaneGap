import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header.component'
import { Footer } from '@/components/layout/footer.component'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'LANEGAP - Midlane Coaching Tool',
  description: 'Instant midlane matchup insights for League of Legends. Get coaching in < 5 seconds.',
  keywords: ['League of Legends', 'LoL', 'midlane', 'coaching', 'matchups', 'counters'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
