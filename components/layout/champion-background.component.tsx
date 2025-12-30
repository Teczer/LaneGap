import { getChampionSplashUrl } from '@/lib/data-dragon'
import { cn } from '@/lib/utils'

interface IChampionBackgroundProps {
  championId: string
  className?: string
}

export const ChampionBackground = ({ championId, className }: IChampionBackgroundProps) => {
  const splashUrl = getChampionSplashUrl(championId)

  return (
    <div
      className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}
      aria-hidden="true"
    >
      {/* Splash Art - subtle opacity */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-35"
        style={{ backgroundImage: `url(${splashUrl})` }}
      />

      {/* Top fade */}
      <div className="from-background/80 absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent" />

      {/* Bottom fade */}
      <div className="from-background absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t to-transparent" />

      {/* Left fade */}
      <div className="from-background/90 absolute inset-y-0 left-0 w-1/3 bg-linear-to-r to-transparent" />

      {/* Right fade */}
      <div className="from-background/90 absolute inset-y-0 right-0 w-1/3 bg-linear-to-l to-transparent" />

      {/* Center vignette */}
      <div className="bg-background/40 absolute inset-0" />

      {/* Bottom content overlay */}
      <div className="from-background via-background/95 absolute inset-x-0 bottom-0 h-[80%] bg-linear-to-t to-transparent" />
    </div>
  )
}
