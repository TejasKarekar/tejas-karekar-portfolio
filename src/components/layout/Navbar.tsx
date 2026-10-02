import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navigationItems, personalInfo } from '../../data/portfolio'
import { cn } from '../../lib/cn'
import { Container } from './Container'
import { BrandMark } from './BrandMark'

type NavbarProps = { onOpenCommandPalette: () => void }

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(() => window.location.hash.slice(1))
  const reduceMotion = useReducedMotion()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const syncSurface = () => setIsScrolled(window.scrollY > 12)
    const targets = navigationItems.map((item) => document.getElementById(item.href.slice(1))).filter((target): target is HTMLElement => target !== null)
    const visibleSections = new Map<string, number>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.intersectionRatio)
        else visibleSections.delete(entry.target.id)
      })
      const visible = [...visibleSections.entries()].sort(([, ratioA], [, ratioB]) => ratioB - ratioA)[0]
      if (visible) setActiveSection(visible[0])
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.01, 0.2, 0.45] })
    targets.forEach((target) => observer.observe(target))
    syncSurface()
    window.addEventListener('scroll', syncSurface, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', syncSurface) }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)
  const selectSection = (href: string) => setActiveSection(href.slice(1))

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn('fixed inset-x-0 top-0 z-40 transition-all duration-300', isScrolled && 'border-b border-[var(--color-border)] bg-[rgba(9,11,16,0.7)] backdrop-blur-xl')}
    >
      <Container className="flex h-16 items-center justify-between gap-5 sm:h-[4.5rem]">
        <a href="#main-content" className="group inline-flex min-w-0 items-center gap-2.5 rounded-md text-sm font-semibold tracking-tight text-white" aria-label={`${personalInfo.name} home`}>
          <BrandMark className="size-8 text-xs transition-colors group-hover:border-[var(--color-accent)]" />
          <span className="truncate">{personalInfo.displayName}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => selectSection(item.href)} aria-current={activeSection === item.href.slice(1) ? 'page' : undefined} className={cn('relative rounded-md px-3 py-2 text-sm transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:bg-[var(--color-accent)] after:transition-transform', activeSection === item.href.slice(1) ? 'text-white after:scale-x-100' : 'text-[var(--color-text-muted)] after:scale-x-0 hover:text-white')}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2"><button type="button" onClick={onOpenCommandPalette} className="inline-flex size-10 items-center justify-center rounded-md border border-[var(--color-border-strong)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-white" aria-label="Open command palette"><Search size={17} aria-hidden="true" /><span className="ml-2 hidden font-mono text-[0.62rem] lg:inline">⌘ K</span></button>{personalInfo.resume && <a href={personalInfo.resume} target="_blank" rel="noreferrer" className="hidden min-h-10 items-center rounded-md border border-[var(--color-border-strong)] bg-white/[0.03] px-3.5 text-sm font-medium text-white transition-colors hover:border-[var(--color-accent)] hover:bg-white/[0.06] sm:inline-flex">Download Resume</a>}<button ref={menuButtonRef} type="button" className="grid size-10 place-items-center rounded-md border border-[var(--color-border-strong)] text-white transition-colors hover:border-[var(--color-accent)] hover:bg-white/[0.04] lg:hidden" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((open) => !open)}>{isOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}</button></div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div id="mobile-navigation" initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="overflow-hidden border-b border-[var(--color-border)] bg-[rgba(9,11,16,0.96)] backdrop-blur-xl lg:hidden">
            <Container className="flex flex-col gap-1 py-4">
              {navigationItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => { selectSection(item.href); closeMenu() }} className="rounded-md px-3 py-3 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-white/[0.05] hover:text-white">{item.label}</a>
              ))}
              {personalInfo.resume && <a href={personalInfo.resume} target="_blank" rel="noreferrer" onClick={closeMenu} className="mt-2 rounded-md border border-[var(--color-border-strong)] px-3 py-3 text-center text-sm font-medium text-white">Download Resume</a>}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
