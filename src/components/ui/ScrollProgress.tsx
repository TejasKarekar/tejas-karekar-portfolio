import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 170, damping: 32, restDelta: 0.001 })
  return <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true"><motion.div className="h-full origin-left bg-[var(--color-accent)]" style={{ scaleX }} /></div>
}
