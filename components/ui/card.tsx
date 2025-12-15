import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated'
}

const Card = forwardRef<HTMLDivElement, ICardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/[0.03] border border-white/[0.06]',
      interactive: cn(
        'bg-white/[0.03] border border-white/[0.06]',
        'cursor-pointer transition-all duration-200',
        'hover:bg-white/[0.06] hover:border-white/10'
      ),
      elevated: 'bg-white/[0.05] border border-white/[0.08] shadow-lg',
    }

    return (
      <div
        ref={ref}
        className={cn('rounded-xl p-4', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header
interface ICardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, ICardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-3 flex flex-col gap-1', className)} {...props} />
))

CardHeader.displayName = 'CardHeader'

// Card Title
interface ICardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, ICardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-base font-semibold text-white', className)} {...props} />
))

CardTitle.displayName = 'CardTitle'

// Card Description
interface ICardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, ICardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-white/60', className)} {...props} />
  )
)

CardDescription.displayName = 'CardDescription'

// Card Content
interface ICardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, ICardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))

CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
