import { motion, useReducedMotion } from 'framer-motion'
import { aboutContent } from '../../data/portfolio'
import { Section } from '../layout/Section'
import { SectionIntro } from '../ui/SectionIntro'
import { IdentityCard } from './IdentityCard'

export function AboutSection() {
  const reduceMotion = useReducedMotion()
  return (
    <Section id="about" className="relative border-t border-[var(--color-border)]" containerClassName="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.75fr)] lg:items-center lg:gap-20">
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
        <SectionIntro eyebrow={aboutContent.eyebrow} heading={aboutContent.heading} />
        <div className="mt-7 max-w-2xl space-y-4 text-pretty text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
          {aboutContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <dl className="mt-9 grid gap-3 sm:grid-cols-3">
          {aboutContent.focusAreas.map((area) => <div key={area.label} className="rounded-xl border border-[var(--color-border)] bg-white/[0.02] p-4"><dt className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.15em] text-[var(--color-accent)]">{area.label}</dt><dd className="mt-2 text-sm leading-5 text-[var(--color-text-muted)]">{area.description}</dd></div>)}
        </dl>
      </motion.div>
      <IdentityCard />
    </Section>
  )
}
