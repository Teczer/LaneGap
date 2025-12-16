import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({ className, variant = 'default', size = 'md', ...props }: IBadgeProps) {
  const variants = {
    default: 'bg-accent/20 text-accent border-accent/30',
    secondary: 'bg-surface text-text-secondary border-border',
    success: 'bg-success/20 text-success border-success/30',
    warning: 'bg-warning/20 text-warning border-warning/30',
    danger: 'bg-danger/20 text-danger border-danger/30',
    info: 'bg-info/20 text-info border-info/30',
  }

  const sizes = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md border font-medium',
        'transition-colors duration-200',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
