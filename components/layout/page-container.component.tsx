import { cn } from '@/lib/utils'

interface IPageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: IPageContainerProps) {
  return (
    <main className={cn('mx-auto min-h-[calc(100vh-8rem)] w-full max-w-5xl px-6 py-8', className)}>
      {children}
    </main>
  )
}
