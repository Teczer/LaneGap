import type { ReactNode } from 'react'

interface IOnboardingLayoutProps {
  children: ReactNode
}

const OnboardingLayout = ({ children }: IOnboardingLayoutProps) => {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="from-primary/5 to-accent-purple/5 absolute inset-0 bg-linear-to-br via-transparent" />
      <div className="relative z-10 w-full max-w-lg px-6">{children}</div>
    </div>
  )
}

export default OnboardingLayout
