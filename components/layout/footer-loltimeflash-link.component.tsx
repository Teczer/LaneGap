interface IFooterLolTimeFlashLinkProps {
  label: string
}

export const FooterLolTimeFlashLink = ({ label }: IFooterLolTimeFlashLinkProps) => {
  return (
    <a
      href="https://loltimeflash.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-1 rounded-lg border border-accent-gold/20 bg-accent-gold/5 px-3 py-2 transition-all hover:border-accent-gold/40 hover:bg-accent-gold/10"
    >
      <span className="text-white/60 transition-colors group-hover:text-white/80">{label}</span>
      <span className="font-medium text-accent-gold">LolTimeFlash</span>
    </a>
  )
}
