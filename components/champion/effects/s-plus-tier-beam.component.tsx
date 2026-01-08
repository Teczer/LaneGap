/**
 * S+ Tier Iridescent Beam Effect
 * Multiple beams with halo reflections and pearl iridescent colors.
 * Creates the most premium, eye-catching effect for the absolute best counter.
 */
export const SPlusTierBeam = () => (
  <>
    {/* Outer halo glow - iridescent pearl */}
    <span className="absolute -inset-[4px] overflow-hidden rounded-2xl opacity-50 blur-[6px]">
      <span className="absolute -inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,rgba(255,255,255,0.8)_10%,rgba(200,220,255,0.6)_20%,transparent_30%,transparent_50%,rgba(255,230,250,0.7)_60%,rgba(180,200,255,0.5)_70%,transparent_80%)]" />
    </span>

    {/* Secondary beam - offset rotation for multi-beam effect */}
    <span className="absolute -inset-[3px] overflow-hidden rounded-2xl opacity-70 blur-[3px]">
      <span className="absolute -inset-full animate-[spin_3s_linear_infinite_reverse] bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0%,transparent_40%,rgba(220,230,255,0.9)_50%,rgba(255,255,255,1)_55%,rgba(200,210,255,0.8)_60%,transparent_70%)]" />
    </span>

    {/* Primary beam - sharp iridescent white trail */}
    <span className="absolute -inset-px overflow-hidden rounded-xl">
      <span className="absolute -inset-full animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_45%,rgba(180,190,220,0.3)_55%,rgba(200,210,240,0.6)_65%,rgba(230,235,255,0.9)_75%,rgba(255,255,255,1)_82%,rgba(255,250,255,0.9)_88%,rgba(220,230,255,0.5)_92%,transparent_100%)]" />
    </span>

    {/* Third beam - faster, subtle accent */}
    <span className="absolute -inset-px overflow-hidden rounded-xl opacity-60">
      <span className="absolute -inset-full animate-[spin_1.8s_linear_infinite] bg-[conic-gradient(from_270deg_at_50%_50%,transparent_0%,transparent_70%,rgba(240,220,255,0.4)_80%,rgba(255,255,255,0.7)_87%,rgba(220,240,255,0.4)_94%,transparent_100%)]" />
    </span>

    {/* Inner mask to show only the border */}
    <span className="bg-card absolute inset-[2px] rounded-[10px]" />

    {/* Subtle inner reflection glow */}
    <span className="pointer-events-none absolute inset-[3px] rounded-[9px] bg-gradient-to-br from-white/5 via-transparent to-blue-100/5" />
  </>
)
