import type { TLaneFilter } from '@/lib/data/champion-roles'

// ============================================================================
// Animation Constants
// ============================================================================

// Container stagger animation
export const STAGGER_CHILDREN_DELAY = 0.02
export const STAGGER_CHILDREN_INITIAL_DELAY = 0.1

// Item animation
const ITEM_HIDDEN_SCALE = 0.9
const ITEM_VISIBLE_SCALE = 1
const ITEM_ANIMATION_DURATION = 0.2

// Lane filter button animation
export const LANE_BUTTON_HOVER_SCALE = 1.15
export const LANE_BUTTON_TAP_SCALE = 0.95
export const LANE_BUTTON_SELECTED_SCALE = 1.25
export const LANE_BUTTON_UNSELECTED_SCALE = 1
export const LANE_BUTTON_SELECTED_OPACITY = 1
export const LANE_BUTTON_UNSELECTED_OPACITY = 0.3

// Spring transitions
export const LANE_BUTTON_SPRING_STIFFNESS = 300
export const LANE_BUTTON_SPRING_DAMPING = 20
export const LANE_INDICATOR_SPRING_STIFFNESS = 400
export const LANE_INDICATOR_SPRING_DAMPING = 30

// Section animation delays (ms)
export const SEARCH_ANIMATION_DELAY = '50ms'
export const FAVORITES_ANIMATION_DELAY = '100ms'
export const RECENT_ANIMATION_DELAY = '150ms'
export const GRID_ANIMATION_DELAY = '200ms'

// ============================================================================
// Framer Motion Variants
// ============================================================================

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_CHILDREN_DELAY,
      delayChildren: STAGGER_CHILDREN_INITIAL_DELAY,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, scale: ITEM_HIDDEN_SCALE },
  visible: {
    opacity: 1,
    scale: ITEM_VISIBLE_SCALE,
    transition: { duration: ITEM_ANIMATION_DURATION },
  },
}

// ============================================================================
// Data
// ============================================================================

export const LANE_FILTERS: TLaneFilter[] = ['top', 'mid', 'fill', 'adc', 'support']
