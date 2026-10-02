import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import './hero.css'

export function AmbientBackground() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const orbOneY = useTransform(scrollY, [0, 900], [0, 34])
  const orbTwoY = useTransform(scrollY, [0, 900], [0, -22])
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <div className="hero-grid" />
      <motion.div className="hero-orb hero-orb-one" style={reduceMotion ? undefined : { y: orbOneY }} />
      <motion.div className="hero-orb hero-orb-two" style={reduceMotion ? undefined : { y: orbTwoY }} />
    </div>
  )
}
