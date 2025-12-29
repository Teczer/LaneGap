'use client'

import { type InputHTMLAttributes, forwardRef, useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { cn } from '@/lib/utils'

export interface IPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
  icon?: React.ReactNode
}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  ({ className, error, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative w-full">
        {icon && (
          <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-foreground-subtle">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-11 w-full rounded-lg border px-4 py-2 pr-11 text-sm',
            'bg-input text-foreground placeholder:text-foreground-subtle',
            'border-border-muted focus:border-border',
            'transition-all duration-200',
            'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            error && 'border-danger focus:border-danger focus-visible:ring-danger/20',
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-foreground-subtle transition-colors hover:text-foreground-muted"
          tabIndex={-1}
        >
          {showPassword ? <LuEyeOff className="h-5 w-5" /> : <LuEye className="h-5 w-5" />}
        </button>
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
