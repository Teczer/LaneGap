import { motion } from 'framer-motion'

/**
 * A-Tier Glow Effect
 * A pulsing orange/amber glow that creates a warm, premium feel.
 * More subtle than S-tier but still distinctive.
 */
export const ATierGlow = () => (
  <motion.div
    className="absolute -inset-px rounded-xl bg-gradient-to-br from-orange-500/50 to-amber-500/50"
    style={{ filter: 'blur(4px)' }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

