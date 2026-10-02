import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function SectionReveal({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion()
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(3px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
