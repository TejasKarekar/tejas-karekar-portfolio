import { Code2, Mail, Network } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { navigationItems, personalInfo, socialLinks } from '../../data/portfolio'
import { BrandMark } from '../layout/BrandMark'

const icons = { github: Code2, linkedin: Network, email: Mail }
const currentYear = new Date().getFullYear()

export function Footer() {
  const reduceMotion = useReducedMotion()
  const methods = socialLinks
  return (
    <motion.footer initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4 }} className="border-t border-[var(--color-border)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <a href="#main-content" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <BrandMark className="size-7 text-[0.62rem]" />
              {personalInfo.name}
            </a>
            <p className="mt-3 text-sm text-[var(--color-text-subtle)]">{personalInfo.role}</p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {navigationItems.map((item) => <li key={item.href}><a href={item.href} className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-white">{item.label}</a></li>)}
              </ul>
            </nav>
            {methods.length > 0 && <ul className="flex gap-2" aria-label={`${personalInfo.name} social links`}>
              {methods.map((method) => {
                const Icon = icons[method.kind]
                const external = method.href.startsWith('http')
                return <li key={method.href}><a href={method.href} aria-label={method.label} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className="grid size-9 place-items-center rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-white"><Icon size={16} aria-hidden="true" /></a></li>
              })}
            </ul>}
          </div>
        </div>
        <p className="mt-9 border-t border-[var(--color-border)] pt-5 text-xs text-[var(--color-text-subtle)]">© {currentYear} {personalInfo.name}. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}
