import { motion, useReducedMotion } from 'framer-motion'
import type { JourneyStep as JourneyStepType } from '../../types/portfolio'

type JourneyStepProps = { step: JourneyStepType; index: number }

export function JourneyStep({ step, index }: JourneyStepProps) {
  const reduceMotion = useReducedMotion()
  return <motion.li initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.09, ease: [0.22, 1, 0.36, 1] }} className="relative flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white/[0.02] p-4 sm:p-5"><span className="grid size-7 shrink-0 place-items-center rounded-full border border-[var(--color-accent)]/45 font-mono text-[0.62rem] text-[var(--color-accent)]">{String(index + 1).padStart(2, '0')}</span><span className="text-sm font-medium leading-5 text-white">{step.label}</span></motion.li>
}
