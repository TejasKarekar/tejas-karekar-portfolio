import { Command, CornerDownLeft, Search, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { navigationItems, personalInfo } from '../../data/portfolio'

type CommandPaletteProps = { open: boolean; onClose: () => void }
type CommandItem = { id: string; label: string; group: 'Navigation' | 'Actions'; run: () => void }

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const reduceMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const items = useMemo<CommandItem[]>(() => {
    const navigate = (href: string) => () => { window.location.hash = href; onClose() }
    const actions: CommandItem[] = [{ id: 'search-projects', label: 'Search projects', group: 'Actions', run: () => { window.location.hash = '#projects'; onClose(); window.setTimeout(() => document.getElementById('project-search')?.focus(), 450) } }]
    if (personalInfo.github) actions.push({ id: 'github', label: 'View GitHub', group: 'Actions', run: () => window.open(personalInfo.github!, '_blank', 'noopener,noreferrer') })
    if (personalInfo.linkedin) actions.push({ id: 'linkedin', label: 'View LinkedIn', group: 'Actions', run: () => window.open(personalInfo.linkedin!, '_blank', 'noopener,noreferrer') })
    if (personalInfo.email) actions.push({ id: 'email', label: 'Send Email', group: 'Actions', run: () => { window.location.href = `mailto:${personalInfo.email}` } })
    if (personalInfo.resume) actions.push({ id: 'resume', label: 'View Resume', group: 'Actions', run: () => window.open(personalInfo.resume!, '_blank', 'noopener,noreferrer') })
    return [...navigationItems.map((item) => ({ id: item.href, label: item.label, group: 'Navigation' as const, run: navigate(item.href) })), ...actions]
  }, [onClose])
  const filteredItems = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase().trim()))
  const selectedIndex = Math.min(activeIndex, Math.max(0, filteredItems.length - 1))

  useEffect(() => {
    if (!open) return
    lastFocusedRef.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = ''; lastFocusedRef.current?.focus() }
  }, [open])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return }
      if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, Math.max(0, filteredItems.length - 1))); return }
      if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); return }
      if (event.key === 'Enter' && filteredItems[selectedIndex]) { event.preventDefault(); filteredItems[selectedIndex].run(); onClose() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { window.clearTimeout(timer); document.removeEventListener('keydown', onKeyDown) }
  }, [filteredItems, onClose, open, selectedIndex])

  const execute = (item: CommandItem, index: number) => { setActiveIndex(index); item.run(); onClose() }

  return createPortal(<AnimatePresence>{open && <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="fixed inset-0 z-[70] grid place-items-start bg-black/70 p-4 pt-[12svh] backdrop-blur-sm sm:pt-[18svh]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><motion.div role="dialog" aria-modal="true" aria-labelledby="command-palette-title" initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.2 }} className="w-full max-w-xl overflow-hidden rounded-xl border border-[var(--color-border-strong)] bg-[#10131b]/95 shadow-2xl"><div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4"><Search size={18} aria-hidden="true" className="text-[var(--color-text-subtle)]" /><label className="flex-1"><span className="sr-only">Search or jump to</span><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search or jump to..." className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-[var(--color-text-subtle)]" /></label><kbd className="hidden rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[0.62rem] text-[var(--color-text-subtle)] sm:inline">Esc</kbd><button type="button" onClick={onClose} aria-label="Close command palette" className="grid size-8 place-items-center rounded text-[var(--color-text-muted)] hover:bg-white/[0.06] hover:text-white"><X size={17} aria-hidden="true" /></button></div><div className="max-h-[min(24rem,56svh)] overflow-y-auto p-2">{(['Navigation', 'Actions'] as const).map((group) => { const groupItems = filteredItems.filter((item) => item.group === group); if (!groupItems.length) return null; return <section key={group} className="py-1"><h2 id={group === 'Navigation' ? 'command-palette-title' : undefined} className="px-2 pb-1 pt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">{group}</h2>{groupItems.map((item) => { const index = filteredItems.indexOf(item); return <button key={item.id} type="button" onMouseMove={() => setActiveIndex(index)} onClick={() => execute(item, index)} className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm transition-colors ${selectedIndex === index ? 'bg-white/[0.07] text-white' : 'text-[var(--color-text-muted)] hover:bg-white/[0.05] hover:text-white'}`}><span>{item.label}</span>{selectedIndex === index && <CornerDownLeft size={15} aria-hidden="true" className="text-[var(--color-accent)]" />}</button> })}</section> })}{filteredItems.length === 0 && <p className="px-3 py-9 text-center text-sm text-[var(--color-text-muted)]">No matching commands.</p>}</div><div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3 text-[0.62rem] text-[var(--color-text-subtle)]"><span className="inline-flex items-center gap-1"><Command size={13} aria-hidden="true" /> K to open</span><span>↑ ↓ to navigate · Enter to select</span></div></motion.div></motion.div>}</AnimatePresence>, document.body)
}
