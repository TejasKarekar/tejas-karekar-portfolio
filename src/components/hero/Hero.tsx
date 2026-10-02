import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Code2, Mail, Network } from 'lucide-react'
import { personalInfo, socialLinks } from '../../data/portfolio'
import { Container } from '../layout/Container'
import { AmbientBackground } from './AmbientBackground'
import { SystemVisual } from './SystemVisual'
import { SignatureAccent } from '../ui/SignatureAccent'

const socialIcons = { github: Code2, linkedin: Network, email: Mail }
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

export function Hero() {
  const reduceMotion = useReducedMotion()
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-16 sm:pt-[4.5rem]" aria-labelledby="hero-title">
      <AmbientBackground />
      <SystemVisual />
      <Container className="relative z-10 py-20 sm:py-28 lg:py-32">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: reduceMotion ? 0 : 0.22 } } }} className="max-w-3xl">
          <motion.div variants={item} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mb-5 flex items-center gap-2.5 sm:mb-6"><SignatureAccent /><p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[var(--color-accent)] sm:text-xs">Software Developer <span className="mx-1.5 text-[var(--color-text-subtle)]">•</span> Data Science <span className="mx-1.5 text-[var(--color-text-subtle)]">•</span> Mobile Applications</p></motion.div>
          <motion.p variants={item} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mb-4 font-mono text-[0.72rem] font-medium uppercase tracking-[0.25em] text-white/80 sm:mb-5 sm:text-sm">{personalInfo.displayName}</motion.p>
          <motion.h1 id="hero-title" variants={item} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl text-balance text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-white">Building Practical Software With <span className="text-[var(--color-accent)]">Code, Data &amp; AI.</span></motion.h1>
          <motion.p variants={item} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-7 max-w-xl text-pretty text-base leading-7 text-[var(--color-text-muted)] sm:mt-8 sm:text-lg sm:leading-8">{personalInfo.shortBio}</motion.p>
          <motion.div variants={item} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]"><span>&lt;build /&gt;</span><span className="text-[var(--color-accent)]" aria-hidden="true">/</span><span>explore</span><span className="text-[var(--color-accent)]" aria-hidden="true">/</span><span>solve</span></motion.div>
          <motion.div variants={item} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <a href="#projects" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)]">View My Work <ArrowDownRight size={17} aria-hidden="true" /></a>
            <a href="#contact" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--color-border-strong)] bg-white/[0.03] px-5 text-sm font-medium text-white transition-colors hover:border-[var(--color-accent)] hover:bg-white/[0.06]">Get In Touch</a>
          </motion.div>
          {socialLinks.length > 0 && <motion.ul variants={item} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mt-10 flex items-center gap-2 sm:mt-12" aria-label={`${personalInfo.name} social links`}>
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.kind]
              return <li key={link.label}><a href={link.href} aria-label={link.label} className="grid size-10 place-items-center rounded-md border border-[var(--color-border)] bg-white/[0.02] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-white"><Icon size={18} aria-hidden="true" /></a></li>
            })}
          </motion.ul>}
        </motion.div>
      </Container>
    </section>
  )
}
