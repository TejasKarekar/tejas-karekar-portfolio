import { motion, useReducedMotion } from 'framer-motion'
import { Braces } from 'lucide-react'
import { aboutContent, personalInfo } from '../../data/portfolio'

export function IdentityCard() {
  const reduceMotion = useReducedMotion()
  return (
    <motion.aside initial={reduceMotion ? false : { opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))] p-5 shadow-[var(--shadow-glass)] sm:p-7">
      <div className="absolute -right-14 -top-14 size-52 rounded-full bg-[var(--color-accent)]/10 blur-3xl" aria-hidden="true" />
      <div className="relative flex min-h-72 flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="grid size-12 place-items-center rounded-xl border border-[var(--color-border-strong)] bg-white/[0.04] text-[var(--color-accent)]"><Braces size={23} aria-label="Developer identity mark" /></div>
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">Identity / 01</span>
        </div>
        <div className="my-9 flex items-center justify-center">
          {personalInfo.profileImage ? <img src={personalInfo.profileImage} alt={`${personalInfo.displayName} profile`} loading="lazy" className="size-36 rounded-[2rem] border border-[var(--color-border-strong)] object-cover shadow-[0_0_40px_rgba(124,140,255,0.1)]" /> : <div aria-hidden="true">
          <motion.div animate={reduceMotion ? undefined : { rotate: [0, 4, 0], y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="relative grid size-36 place-items-center rounded-[2rem] border border-[var(--color-border-strong)] bg-white/[0.025] shadow-[0_0_40px_rgba(124,140,255,0.1)]">
            <div className="absolute inset-3 rounded-[1.4rem] border border-dashed border-[var(--color-accent)]/40" />
            <span className="font-mono text-2xl font-medium tracking-[-0.12em] text-[var(--color-accent)]">TK</span>
          </motion.div>
          </div>}
        </div>
        <div>
          <p className="text-lg font-semibold tracking-[-0.03em] text-white">{personalInfo.displayName.toUpperCase()}</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{personalInfo.role}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Focus areas">
            {aboutContent.identityTags.map((tag) => <li key={tag} className="rounded-md border border-[var(--color-border)] bg-white/[0.025] px-2.5 py-1 text-xs text-[var(--color-text-muted)]">{tag}</li>)}
          </ul>
        </div>
      </div>
    </motion.aside>
  )
}
