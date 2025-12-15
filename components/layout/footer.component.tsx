import { cn } from '@/lib/utils'

interface IFooterProps {
  className?: string
}

export function Footer({ className }: IFooterProps) {
  return (
    <footer className={cn('border-t border-white/5 bg-[#0a0d17] py-5', className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-2 text-center text-xs text-white/40 sm:flex-row sm:text-left">
          <p>LANEGAP - Midlane Coaching Tool</p>
          <p>Not affiliated with Riot Games.</p>
        </div>
      </div>
    </footer>
  )
}
