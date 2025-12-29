import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, error, icon, type = 'text', ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="text-foreground-subtle pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'flex h-11 w-full rounded-lg border px-4 py-2 text-sm',
            'bg-input text-foreground placeholder:text-foreground-subtle',
            'border-border-muted focus:border-border',
            'transition-all duration-200',
            'focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            error && 'border-danger focus:border-danger focus-visible:ring-danger/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-danger mt-1 text-xs">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
