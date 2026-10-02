import { motion, useReducedMotion } from 'framer-motion'
import type { SnapshotCapability } from '../../types/portfolio'

type CapabilityCardProps = { capability: SnapshotCapability; index: number }

export function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const reduceMotion = useReducedMotion()
  return <motion.article initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }} className="group border-l border-[var(--color-border-strong)] pl-4 transition-colors hover:border-[var(--color-accent)] sm:pl-5"><p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">0{index + 1}</p><h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">{capability.title}</h3><ul className="mt-3 space-y-1.5 text-sm leading-5 text-[var(--color-text-muted)]">{capability.areas.map((area) => <li key={area}>{area}</li>)}</ul></motion.article>
}
