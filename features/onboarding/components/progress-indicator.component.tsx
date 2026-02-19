'use client'

import { motion } from 'framer-motion'
import { LuArrowLeft } from 'react-icons/lu'

interface IProgressIndicatorProps {
  currentStep: string
  steps?: string[]
  showBack?: boolean
  onBack?: () => void
}

export const ProgressIndicator = ({
  currentStep,
  steps = ['otp', 'pseudo', 'avatar'],
  showBack = false,
  onBack,
}: IProgressIndicatorProps) => {
  const currentIndex = steps.indexOf(currentStep)

  return (
    <div className="flex items-center justify-center gap-4">
      {showBack && (
        <button
          onClick={onBack}
          className="fixed top-10 left-10 flex h-10 w-10 cursor-pointer items-center justify-center transition-all hover:scale-110"
        >
          <LuArrowLeft className="h-5 w-5" />
        </button>
      )}

      <div className="flex items-center gap-3">
        {steps.map((s, index) => {
          const isActive = index === currentIndex
          const isCompleted = index < currentIndex

          return (
            <div key={s} className="flex items-center gap-3">
              <motion.div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  isActive || isCompleted ? 'bg-primary' : 'bg-white/20'
                }`}
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />

              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 rounded-full ${isCompleted ? 'bg-primary' : 'bg-white/10'}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
