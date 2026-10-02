import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function Timeline({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion()
  return <div className="relative"><motion.div aria-hidden="true" initial={reduceMotion ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-0 left-[0.59rem] top-0 w-px origin-top bg-[linear-gradient(var(--color-accent),var(--color-border))] lg:left-[11.6rem]" />{children}</div>
}

type TimelineItemProps = PropsWithChildren<{ label: string; index?: number }>

export function TimelineItem({ label, children, index = 0 }: TimelineItemProps) {
  const reduceMotion = useReducedMotion()
  return <div className="relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-4 lg:grid-cols-[10rem_2rem_minmax(0,1fr)] lg:gap-6"><div className="order-2 pt-0 lg:order-1 lg:pt-1"><p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">{label}</p></div><motion.div aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.18 + index * 0.08 }} className="order-1 mt-0.5 grid size-5 place-items-center rounded-full border border-[var(--color-accent)]/60 bg-[var(--color-canvas)] lg:order-2"><span className="size-1.5 rounded-full bg-[var(--color-accent)]" /></motion.div><motion.div initial={reduceMotion ? false : { opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }} className="order-3">{children}</motion.div></div>
}
