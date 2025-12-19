import Link from 'next/link'
import { LuHouse } from 'react-icons/lu'

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
      <p className="mb-8 text-lg text-white/60">Page not found</p>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 font-medium text-white transition-colors hover:bg-violet-500"
      >
        <LuHouse className="h-4 w-4" />
        Back to home
      </Link>
    </main>
  )
}

