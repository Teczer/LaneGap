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
          <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/40">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-11 w-full rounded-lg border px-4 py-2 pr-11 text-sm',
            'bg-white/5 text-white placeholder:text-white/40',
            'border-white/10 focus:border-violet-500',
            'transition-all duration-200',
            'focus-visible:ring-2 focus-visible:ring-violet-500/20 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus-visible:ring-red-500/20',
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white/40 transition-colors hover:text-white/70"
          tabIndex={-1}
        >
          {showPassword ? <LuEyeOff className="h-5 w-5" /> : <LuEye className="h-5 w-5" />}
        </button>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
