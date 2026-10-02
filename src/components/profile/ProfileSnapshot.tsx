import { motion, useReducedMotion } from 'framer-motion'
import { personalInfo, profileSnapshot } from '../../data/portfolio'
import { Section } from '../layout/Section'
import { SectionIntro } from '../ui/SectionIntro'
import { BuildProcess } from './BuildProcess'
import { CapabilityCard } from './CapabilityCard'
import { ResumeCTA } from './ResumeCTA'
import { TechnicalProfile } from './TechnicalProfile'

export function ProfileSnapshot() {
  const reduceMotion = useReducedMotion()
  return <Section id="profile-snapshot" className="border-t border-[var(--color-border)] bg-[linear-gradient(180deg,transparent,rgba(124,140,255,0.022),transparent)]"><div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.82fr)] lg:items-start lg:gap-16"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}><SectionIntro eyebrow={profileSnapshot.eyebrow} heading={profileSnapshot.heading} description={profileSnapshot.description} /><div className="mt-9 grid gap-x-7 gap-y-8 sm:grid-cols-2">{profileSnapshot.capabilities.map((capability, index) => <CapabilityCard key={capability.title} capability={capability} index={index} />)}</div><ResumeCTA resume={personalInfo.resume} /></motion.div><TechnicalProfile groups={profileSnapshot.technicalProfile} /></div><BuildProcess steps={profileSnapshot.process} /></Section>
}
