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
      'focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      'active:scale-[0.98]',
      'whitespace-nowrap'
    )

    const variants = {
      primary: cn(
        'bg-gradient-to-r from-violet-600 to-violet-500 text-white',
        'hover:from-violet-500 hover:to-violet-400',
        'shadow-lg shadow-violet-500/20'
      ),
      secondary: cn(
        'border border-white/10 bg-white/5 text-white',
        'hover:border-white/20 hover:bg-white/10'
      ),
      ghost: cn('bg-transparent text-white/70', 'hover:bg-white/5 hover:text-white'),
      danger: cn('bg-red-600 text-white', 'hover:bg-red-500'),
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
