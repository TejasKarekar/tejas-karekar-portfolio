import { Code2, Mail, Network } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { personalInfo, socialLinks } from '../../data/portfolio'
import { Section } from '../layout/Section'
import { SectionIntro } from '../ui/SectionIntro'
import { ContactForm } from './ContactForm'
import { ContactMethod } from './ContactMethod'
import './contact.css'

const icons = { github: Code2, linkedin: Network, email: Mail }

export function ContactSection() {
  const reduceMotion = useReducedMotion()
  const methods = socialLinks
  return <Section id="contact" className="relative isolate overflow-hidden border-t border-[var(--color-border)]"><div className="contact-atmosphere" aria-hidden="true"><span /><span /><span /></div><div className="relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}><SectionIntro eyebrow="Get In Touch" heading="Let&apos;s Build Something Useful." description="Have an idea, project, collaboration, or opportunity in mind? I&apos;d be happy to hear about it." />{methods.length > 0 ? <motion.div initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.2 }} className="mt-9 grid gap-2">{methods.map((method) => { const Icon = icons[method.kind]; return <ContactMethod key={method.href} label={method.label} href={method.href} icon={<Icon size={17} aria-hidden="true" />} /> })}{personalInfo.phone && <ContactMethod label="Phone" href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} icon={<span aria-hidden="true" className="text-xs">+91</span>} />}</motion.div> : <p className="mt-9 max-w-md text-sm leading-6 text-[var(--color-text-subtle)]">Direct contact links will appear here once verified contact details are configured.</p>}</motion.div><motion.div initial={reduceMotion ? false : { opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}><ContactForm /></motion.div></div></Section>
}
