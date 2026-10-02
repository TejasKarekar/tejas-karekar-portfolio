import { motion, useReducedMotion } from 'framer-motion'
import { achievements, certifications, education } from '../../data/portfolio'
import { Section } from '../layout/Section'
import { SectionIntro } from '../ui/SectionIntro'
import { EducationCard } from './EducationCard'

export function EducationSection() {
  const reduceMotion = useReducedMotion()
  return <Section id="education" className="border-t border-[var(--color-border)]"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}><SectionIntro eyebrow="Education" heading="Academic Foundation" description="Current postgraduate study alongside a completed engineering foundation." /></motion.div><div className="mt-12 grid gap-5 lg:mt-16">{education.map((item) => <EducationCard key={`${item.degree}-${item.institution}`} education={item} />)}</div><div className="mt-16 grid gap-10 lg:grid-cols-2"><div><h3 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">Certifications</h3><ul className="mt-5 grid gap-3">{certifications.map((item) => <li key={item.name} className="rounded-xl border border-[var(--color-border)] bg-white/[0.02] p-4"><p className="text-sm font-medium text-white">{item.name}</p><p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.issuer}</p></li>)}</ul></div><div><h3 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">Achievements</h3><ul className="mt-5 grid gap-3">{achievements.map((item) => <li key={item.title} className="rounded-xl border border-[var(--color-border)] bg-white/[0.02] p-4"><p className="text-sm font-medium text-white">{item.title}</p><p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.issuer}</p></li>)}</ul></div></div></Section>
}
