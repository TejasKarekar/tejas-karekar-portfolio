import { motion, useReducedMotion } from 'framer-motion'
import type { BuildProcessStep } from '../../types/portfolio'

type BuildProcessProps = { steps: BuildProcessStep[] }

export function BuildProcess({ steps }: BuildProcessProps) {
  const reduceMotion = useReducedMotion()
  return <section aria-labelledby="build-process-heading" className="mt-12 border-t border-[var(--color-border)] pt-8 sm:mt-14 sm:pt-10"><div className="max-w-xl"><p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-accent)]">Preferred approach</p><h3 id="build-process-heading" className="mt-3 text-[clamp(1.75rem,3vw,2.35rem)] font-semibold leading-none tracking-[-0.045em] text-white">How I Build</h3></div><ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{steps.map((item, index) => <motion.li key={item.step} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }} className="rounded-xl border border-[var(--color-border)] bg-white/[0.02] p-4"><p className="font-mono text-xs text-[var(--color-accent)]">{item.step}</p><h4 className="mt-5 text-base font-medium text-white">{item.title}</h4><p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{item.description}</p></motion.li>)}</ol></section>
}
