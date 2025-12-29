import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'rounded-lg font-medium transition-all duration-200',
      'focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      'active:scale-[0.98]',
      'whitespace-nowrap',
      'cursor-pointer'
    )

    const variants = {
      primary: cn(
        'bg-[oklch(45%_0.15_240)] font-semibold text-white',
        'border border-[oklch(60%_0.12_240/0.4)]',
        'hover:bg-[oklch(52%_0.16_240)]',
        'shadow-[0_0_16px_oklch(50%_0.15_240/0.3)]',
        'hover:shadow-[0_0_24px_oklch(55%_0.18_240/0.5)]'
      ),
      secondary: cn(
        'bg-muted text-foreground border-border-muted border',
        'hover:bg-secondary hover:border-border'
      ),
      ghost: cn('text-foreground-muted bg-transparent', 'hover:bg-muted hover:text-foreground'),
      danger: cn('bg-danger text-white', 'hover:bg-danger/80'),
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-5 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
