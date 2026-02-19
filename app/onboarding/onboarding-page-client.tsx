'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import type { TOnboardingTranslations } from '@/lib/i18n'
import { AvatarStep, ProgressIndicator, PseudoStep } from '@/features/onboarding'

type TStep = 'pseudo' | 'avatar'

interface IOnboardingPageClientProps {
  translations: TOnboardingTranslations
}

export const OnboardingPageClient = ({ translations: t }: IOnboardingPageClientProps) => {
  const router = useRouter()
  const [step, setStep] = useState<TStep>('pseudo')

  const handlePseudoNext = () => {
    setStep('avatar')
  }

  const handlePseudoSkip = () => {
    setStep('avatar')
  }

  const handleAvatarFinish = () => {
    router.push('/')
  }

  const handleBack = () => {
    if (step === 'avatar') {
      setStep('pseudo')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-10">
        <ProgressIndicator
          currentStep={step}
          steps={['pseudo', 'avatar']}
          showBack={step === 'avatar'}
          onBack={handleBack}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 'pseudo' && (
          <PseudoStep
            key="pseudo"
            translations={t}
            onNext={handlePseudoNext}
            onSkip={handlePseudoSkip}
          />
        )}
        {step === 'avatar' && (
          <AvatarStep
            key="avatar"
            translations={t}
            onFinish={handleAvatarFinish}
            onSkip={handleAvatarFinish}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
