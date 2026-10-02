import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups } from '../../data/portfolio'
import { Section } from '../layout/Section'
import { SectionIntro } from '../ui/SectionIntro'
import { SkillCategory } from './SkillCategory'

export function SkillsSection() {
  const reduceMotion = useReducedMotion()
  return <Section id="skills" className="border-t border-[var(--color-border)] bg-[linear-gradient(180deg,transparent,rgba(124,140,255,0.025),transparent)]">
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <SectionIntro eyebrow="Technology" heading="Tools I Build With" description="I choose technologies based on the problem, while continuously exploring modern tools for building reliable and useful products." />
    </motion.div>
    <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 xl:grid-cols-3">
      {skillGroups.map((group, index) => <SkillCategory key={group.name} group={group} groupIndex={index} />)}
    </div>
  </Section>
}
