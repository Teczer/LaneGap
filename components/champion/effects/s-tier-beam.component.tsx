'use client'

/**
 * S-Tier Beam Effect
 * A red beam that rotates around the border, leaving a trail behind.
 * Creates a premium, eye-catching effect for the highest tier.
 */
export const STierBeam = () => (
  <>
    {/* Red beam with trail - outer glow */}
    <span className="absolute -inset-[2px] overflow-hidden rounded-2xl opacity-60 blur-[3px]">
      <span className="absolute -inset-full animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_60%,#ef4444_75%,#ff0000_85%,#ef4444_95%,transparent_100%)]" />
    </span>

    {/* Red beam with trail - sharp border */}
    <span className="absolute -inset-px overflow-hidden rounded-xl">
      <span className="absolute -inset-full animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#7f1d1d_65%,#dc2626_80%,#ef4444_90%,#fca5a5_95%,transparent_100%)]" />
    </span>

    {/* Inner mask to show only the border */}
    <span className="bg-card absolute inset-[2px] rounded-[10px]" />
  </>
)

