import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projects } from '../../data/portfolio'
import type { Project } from '../../types/portfolio'
import { Section } from '../layout/Section'
import { SectionIntro } from '../ui/SectionIntro'
import { FeaturedProjectCard } from './FeaturedProjectCard'
import { ProjectCard } from './ProjectCard'

type ProjectsSectionProps = { onSelectProject: (project: Project) => void }

function matchesProject(project: Project, query: string, kind: string) {
  const matchesKind = kind === 'All' || project.kind === kind
  const searchable = [project.title, project.kind, project.category, project.shortDescription, project.description, ...project.technologies].join(' ').toLowerCase()
  return matchesKind && searchable.includes(query.toLowerCase().trim())
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const reduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const categories = useMemo(() => ['All', 'Professional', 'Personal', 'Academic', 'Concept'], [])
  const visibleProjects = useMemo(() => projects.filter((project) => matchesProject(project, query, activeCategory)), [activeCategory, query])
  const featuredProject = visibleProjects.find((project) => project.featured)
  const standardProjects = visibleProjects.filter((project) => !project.featured)
  const editorialProjects = standardProjects.slice(0, 4)
  const compactProjects = standardProjects.slice(4)
  const reset = () => { setQuery(''); setActiveCategory('All') }

  return <Section id="projects" className="border-t border-[var(--color-border)]"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}><SectionIntro eyebrow="Selected Work" heading="Things I&apos;ve Built" description="A selection of applications and systems I&apos;ve explored across mobile development, AI, full-stack engineering, and automation." /></motion.div><div className="mt-9 border-y border-[var(--color-border)] py-4 sm:mt-12"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:max-w-[62%] lg:pb-0" role="group" aria-label="Filter projects by category">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`shrink-0 rounded-md border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors ${activeCategory === category ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-white' : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-white'}`}>{category}</button>)}</div><label className="relative block w-full max-w-sm"><span className="sr-only">Search projects</span><Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" /><input id="project-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." className="h-10 w-full rounded-md border border-[var(--color-border)] bg-white/[0.025] py-2 pl-9 pr-9 text-sm text-white outline-none transition-colors placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-accent)]" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear project search" className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded text-[var(--color-text-muted)] transition-colors hover:bg-white/[0.06] hover:text-white"><X size={15} aria-hidden="true" /></button>}</label></div><p className="mt-3 text-xs text-[var(--color-text-subtle)]">Showing {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</p></div><AnimatePresence mode="wait">{visibleProjects.length > 0 ? <motion.div key={`${activeCategory}-${query}`} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.22 }}><div className="mt-8 lg:mt-10">{featuredProject && <FeaturedProjectCard project={featuredProject} onSelect={onSelectProject} />}</div><motion.div layout={!reduceMotion} className="mt-5 grid gap-5 md:grid-cols-2">{editorialProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={onSelectProject} />)}</motion.div><motion.div layout={!reduceMotion} className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{compactProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={onSelectProject} compact />)}</motion.div></motion.div> : <motion.div key="no-results" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} className="mt-8 rounded-xl border border-dashed border-[var(--color-border-strong)] px-5 py-12 text-center"><p className="text-base font-medium text-white">No projects found.</p><p className="mt-2 text-sm text-[var(--color-text-muted)]">Try another category or search term.</p><button type="button" onClick={reset} className="mt-5 rounded-md border border-[var(--color-border-strong)] px-3 py-2 text-sm text-white transition-colors hover:border-[var(--color-accent)]">Clear filters</button></motion.div>}</AnimatePresence></Section>
}
