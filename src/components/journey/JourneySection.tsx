import { motion, useReducedMotion } from 'framer-motion'
import { journeySteps } from '../../data/portfolio'
import { Section } from '../layout/Section'
import { SectionIntro } from '../ui/SectionIntro'
import { JourneyStep } from './JourneyStep'

export function JourneySection() {
  const reduceMotion = useReducedMotion()
  return <Section className="border-t border-[var(--color-border)] bg-[linear-gradient(180deg,transparent,rgba(124,140,255,0.035),transparent)]"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}><SectionIntro eyebrow="Developer Journey" heading="From Learning to Building" description="My development journey has gradually moved from learning programming fundamentals to building mobile applications, AI/ML systems, full-stack products, and automation ideas." /></motion.div><ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">{journeySteps.map((step, index) => <JourneyStep key={step.label} step={step} index={index} />)}</ol></Section>
}
