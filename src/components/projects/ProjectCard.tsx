import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { Project } from '../../types/portfolio'
import { ProjectVisual } from './ProjectVisual'
import { TechnologyChip } from './TechnologyChip'

type ProjectCardProps = { project: Project; index: number; onSelect: (project: Project) => void; compact?: boolean }

export function ProjectCard({ project, index, onSelect, compact = false }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const accentStyle = { backgroundColor: project.accent } as CSSProperties
  return <motion.article initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }} className="group h-full"><button type="button" onClick={() => onSelect(project)} className="project-card block h-full w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] text-left transition duration-200 focus-visible:outline-[var(--color-accent)]"><ProjectVisual project={project} aspect={compact ? 'compact' : 'card'} className="project-card__visual transition duration-200" /><span className="flex h-full flex-col p-5 sm:p-6"><span className="flex items-center justify-between gap-3"><span className="flex items-center gap-2"><span className="size-1.5 rounded-full" style={accentStyle} aria-hidden="true" /><span className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.15em] text-[var(--color-accent)]">{project.category}</span></span><ArrowUpRight className="project-card__arrow shrink-0 text-[var(--color-text-subtle)] transition duration-200" size={18} aria-hidden="true" /></span><span className="mt-5 block text-xl font-semibold tracking-[-0.035em] text-white">{project.title}</span><span className="mt-3 line-clamp-3 block text-sm leading-6 text-[var(--color-text-muted)]">{project.shortDescription}</span><span className="mt-5 flex flex-wrap gap-1.5">{project.technologies.slice(0, compact ? 3 : 4).map((technology) => <TechnologyChip key={technology} technology={technology} />)}</span><span className="mt-5 flex items-center gap-2 font-mono text-[0.61rem] uppercase tracking-[0.13em] text-[var(--color-text-subtle)]"><span className="text-[var(--color-accent)]">Status</span>{project.status}</span><span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">Explore Project <ArrowUpRight size={15} aria-hidden="true" /></span></span></button></motion.article>
}
