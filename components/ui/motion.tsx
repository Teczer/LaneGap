'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode, type ComponentProps } from 'react'

// =============================================================================
// Animation Variants
// =============================================================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

// =============================================================================
// Motion Components
// =============================================================================

interface IMotionContainerProps extends ComponentProps<typeof motion.div> {
  children: ReactNode
  delay?: number
}

/**
 * Fade in container with optional delay
 */
export const FadeIn = ({ children, delay = 0, ...props }: IMotionContainerProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    transition={{ delay }}
    {...props}
  >
    {children}
  </motion.div>
)

/**
 * Slide up animation - great for sections
 */
export const SlideUp = ({ children, delay = 0, ...props }: IMotionContainerProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={slideUp}
    transition={{ delay }}
    {...props}
  >
    {children}
  </motion.div>
)

/**
 * Scale in animation - great for cards/modals
 */
export const ScaleIn = ({ children, delay = 0, ...props }: IMotionContainerProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={scaleIn}
    transition={{ delay }}
    {...props}
  >
    {children}
  </motion.div>
)

/**
 * Staggered grid container - wraps items that animate in sequence
 */
export const StaggerGrid = ({ children, ...props }: IMotionContainerProps) => (
  <motion.div initial="hidden" animate="visible" variants={staggerContainer} {...props}>
    {children}
  </motion.div>
)

/**
 * Staggered item - use inside StaggerGrid
 */
export const StaggerItem = ({ children, ...props }: IMotionContainerProps) => (
  <motion.div variants={staggerItem} {...props}>
    {children}
  </motion.div>
)

// =============================================================================
// Re-export motion for custom usage
// =============================================================================

export { motion }

