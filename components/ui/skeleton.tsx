import { cn } from '@/lib/utils'

interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text'
}

export function Skeleton({ className, variant = 'default', ...props }: ISkeletonProps) {
  const variants = {
    default: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-surface-hover',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

// Preset skeleton components
export function SkeletonText({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton variant="text" className={cn('w-full', className)} {...props} />
}

export function SkeletonCircle({ className, size = 48, ...props }: React.HTMLAttributes<HTMLDivElement> & { size?: number }) {
  return (
    <Skeleton
      variant="circular"
      className={className}
      style={{ width: size, height: size }}
      {...props}
    />
  )
}

export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <Skeleton className="h-32 w-full" />
      <SkeletonText className="w-3/4" />
      <SkeletonText className="w-1/2" />
    </div>
  )
}

