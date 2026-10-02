import type { ReactNode } from 'react'
import { SignatureAccent } from './SignatureAccent'

type SectionIntroProps = { eyebrow: string; heading: string; description?: ReactNode; className?: string }

export function SectionIntro({ eyebrow, heading, description, className }: SectionIntroProps) {
  return <div className={className}>
    <div className="flex items-center gap-2.5"><SignatureAccent /><p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)] sm:text-xs">{eyebrow}</p></div>
    <h2 className="mt-4 max-w-2xl text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:mt-5">{heading}</h2>
    {description && <div className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[var(--color-text-muted)] sm:mt-6 sm:text-lg sm:leading-8">{description}</div>}
  </div>
}
