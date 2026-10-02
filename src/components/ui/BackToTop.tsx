import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useState } from 'react'

export function BackToTop() {
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (latest) => setVisible(latest > 640))
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  return <AnimatePresence>{visible && <motion.button type="button" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }} onClick={scrollToTop} aria-label="Back to top" className="fixed bottom-5 right-5 z-30 grid size-11 place-items-center rounded-lg border border-[var(--color-border-strong)] bg-[rgba(16,19,27,0.82)] text-[var(--color-text-muted)] shadow-[var(--shadow-glass)] backdrop-blur transition-colors hover:border-[var(--color-accent)] hover:text-white focus-visible:outline-[var(--color-accent)] sm:bottom-7 sm:right-7"><ArrowUp size={18} aria-hidden="true" /></motion.button>}</AnimatePresence>
}
