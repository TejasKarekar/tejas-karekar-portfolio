import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../../data/portfolio'
import { Section } from '../layout/Section'
import { Timeline, TimelineItem } from '../timeline/Timeline'
import { SectionIntro } from '../ui/SectionIntro'
import { ExperienceCard } from './ExperienceCard'

export function ExperienceSection() {
  const reduceMotion = useReducedMotion()
  return <Section id="experience" className="border-t border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(124,140,255,0.025),transparent)]"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}><SectionIntro eyebrow="Experience" heading="Where I&apos;ve Worked" /></motion.div><div className="mt-12 max-w-5xl lg:mt-16"><Timeline>{experience.map((item, index) => <TimelineItem key={`${item.company}-${item.role}`} label={item.type} index={index}><ExperienceCard experience={item} /></TimelineItem>)}</Timeline></div></Section>
}
