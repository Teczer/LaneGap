import { cn } from '@/lib/utils'

interface ISettingsCardProps {
  children: React.ReactNode
  variant?: 'default' | 'danger'
}

export const SettingsCard = ({ children, variant = 'default' }: ISettingsCardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-white/6 bg-transparent',
        variant === 'danger' && 'border-danger/20 bg-danger/5'
      )}
    >
      {children}
    </div>
  )
}

interface ISettingsCardHeaderProps {
  title: string
  description: string
  variant?: 'default' | 'danger'
}

export const SettingsCardHeader = ({
  title,
  description,
  variant = 'default',
}: ISettingsCardHeaderProps) => {
  return (
    <div className="p-4">
      <h3
        className={cn(
          'text-base font-semibold',
          variant === 'danger' ? 'text-danger' : 'text-foreground'
        )}
      >
        {title}
      </h3>
      <p className="mt-1 text-sm text-white/50">{description}</p>
    </div>
  )
}

export const SettingsCardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4">{children}</div>
}

interface ISettingsCardFooterProps {
  hint?: string
  children?: React.ReactNode
  variant?: 'default' | 'danger'
}

export const SettingsCardFooter = ({
  hint,
  children,
  variant = 'default',
}: ISettingsCardFooterProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-b-lg px-4 py-3',
        'border-t',
        variant === 'danger' ? 'border-danger/20 bg-danger/5' : 'border-border-muted bg-muted/50'
      )}
    >
      {hint && <p className="text-xs text-white/40">{hint}</p>}
      {!hint && <div />}
      {children}
    </div>
  )
}
