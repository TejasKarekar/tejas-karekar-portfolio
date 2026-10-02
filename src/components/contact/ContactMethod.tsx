import type { ReactNode } from 'react'

type ContactMethodProps = { label: string; href: string; icon: ReactNode }

export function ContactMethod({ label, href, icon }: ContactMethodProps) {
  const isExternal = href.startsWith('http')
  return <a href={href} {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})} className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white/[0.02] p-3.5 transition-colors hover:border-[var(--color-border-strong)] hover:bg-white/[0.04]"><span className="grid size-9 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-accent)]">{icon}</span><span className="text-sm font-medium text-[var(--color-text-muted)] transition-colors group-hover:text-white">{label}</span></a>
}
