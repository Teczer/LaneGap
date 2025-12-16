import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated'
}

const Card = forwardRef<HTMLDivElement, ICardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/[0.03] border border-white/[0.06]',
      interactive: cn(
        'border border-white/[0.06] bg-white/[0.03]',
        'cursor-pointer transition-all duration-200',
        'hover:border-white/10 hover:bg-white/[0.06]'
      ),
      elevated: 'bg-white/[0.05] border border-white/[0.08] shadow-lg',
    }

    return (
      <div ref={ref} className={cn('rounded-xl p-4', variants[variant], className)} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header
type TCardHeaderProps = HTMLAttributes<HTMLDivElement>

const CardHeader = forwardRef<HTMLDivElement, TCardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-3 flex flex-col gap-1', className)} {...props} />
))

CardHeader.displayName = 'CardHeader'

// Card Title
type TCardTitleProps = HTMLAttributes<HTMLHeadingElement>

const CardTitle = forwardRef<HTMLHeadingElement, TCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-base font-semibold text-white', className)} {...props} />
  )
)

CardTitle.displayName = 'CardTitle'

// Card Description
type TCardDescriptionProps = HTMLAttributes<HTMLParagraphElement>

const CardDescription = forwardRef<HTMLParagraphElement, TCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-white/60', className)} {...props} />
  )
)

CardDescription.displayName = 'CardDescription'

// Card Content
type TCardContentProps = HTMLAttributes<HTMLDivElement>

const CardContent = forwardRef<HTMLDivElement, TCardContentProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />
)

CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
