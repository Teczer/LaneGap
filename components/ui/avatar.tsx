'use client'

import Image from 'next/image'
import { LuLoader, LuUser } from 'react-icons/lu'
import { cn } from '@/lib/utils'

export interface IAvatarProps {
  /** Pre-computed avatar URL (alternative to userId + avatarFilename) */
  src?: string | null
  /** Alt text for the image */
  alt?: string
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Additional classes */
  className?: string
  /** Show ring around avatar */
  showRing?: boolean
  /** Show loading overlay */
  isLoading?: boolean
}

const sizes = {
  xs: 'h-6 w-6',
  sm: 'h-7 w-7',
  md: 'h-10 w-10',
  lg: 'h-16 w-16',
  xl: 'h-20 w-20',
}

const iconSizes = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
  xl: 'h-8 w-8',
}

const ringSizes = {
  xs: 'ring-1 ring-border-muted',
  sm: 'ring-1 ring-border-muted',
  md: 'ring-2 ring-border-muted',
  lg: 'ring-2 ring-border-muted ring-offset-2 ring-offset-background',
  xl: 'ring-2 ring-border-muted ring-offset-2 ring-offset-background',
}

const loaderSizes = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-6 w-6',
}

export const Avatar = ({
  src,
  alt = 'User avatar',
  size = 'md',
  className,
  showRing = true,
  isLoading = false,
}: IAvatarProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full',
        'bg-gradient-to-br from-primary/30 to-accent-purple/30',
        sizes[size],
        showRing && ringSizes[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <LuUser className={cn('text-white/60', iconSizes[size])} />
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <LuLoader className={cn('animate-spin text-white', loaderSizes[size])} />
        </div>
      )}
    </div>
  )
}
