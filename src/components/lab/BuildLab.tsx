import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Boxes, ChevronRight, CircuitBoard, Cpu, Workflow } from 'lucide-react'
import { useMemo, useState } from 'react'
import { buildLabCategories, projects } from '../../data/portfolio'
import type { BuildLabCategory, Project } from '../../types/portfolio'
import { Section } from '../layout/Section'
import { TechnologyChip } from '../projects/TechnologyChip'
import { SectionIntro } from '../ui/SectionIntro'
import './build-lab.css'

const categoryIcons = { mobile: Boxes, 'ai-ml': Cpu, 'full-stack': CircuitBoard, automation: Workflow }
const contentMotion = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }

type BuildLabProps = { onSelectProject: (project: Project) => void }

export function BuildLab({ onSelectProject }: BuildLabProps) {
  const [activeId, setActiveId] = useState<BuildLabCategory['id']>('mobile')
  const reduceMotion = useReducedMotion()
  const activeCategory = buildLabCategories.find((category) => category.id === activeId) ?? buildLabCategories[0]
  const relatedProjects = useMemo(() => activeCategory.projectIds.map((id) => projects.find((project) => project.id === id)).filter((project): project is Project => Boolean(project)), [activeCategory])

  const selectCategory = (nextId: BuildLabCategory['id']) => setActiveId(nextId)
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? buildLabCategories.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buildLabCategories.length) % buildLabCategories.length
    const nextCategory = buildLabCategories[nextIndex]
    selectCategory(nextCategory.id)
    document.getElementById(`lab-tab-${nextCategory.id}`)?.focus()
  }

  return (
    <Section id="lab" className="border-t border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(124,140,255,0.025),transparent_62%)]">
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <SectionIntro eyebrow="Build Lab" heading="What I&apos;m Exploring" description="An evolving collection of technologies, ideas, and product experiments I&apos;m currently exploring." />
      </motion.div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] shadow-[var(--shadow-glass)] lg:mt-16 lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
        <div className="border-b border-[var(--color-border)] p-3 lg:border-b-0 lg:border-r lg:p-4">
          <div role="tablist" aria-label="Build Lab focus areas" aria-orientation="horizontal" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {buildLabCategories.map((category, index) => {
              const Icon = categoryIcons[category.id]
              const active = category.id === activeId
              return <button key={category.id} id={`lab-tab-${category.id}`} role="tab" type="button" aria-selected={active} aria-controls="lab-panel" tabIndex={active ? 0 : -1} onClick={() => selectCategory(category.id)} onKeyDown={(event) => onTabKeyDown(event, index)} className={`group flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors ${active ? 'bg-[var(--color-accent)]/12 text-white' : 'text-[var(--color-text-muted)] hover:bg-white/[0.04] hover:text-white'}`}><span className={`grid size-8 place-items-center rounded-lg border transition-colors ${active ? 'border-[var(--color-accent)]/55 bg-[var(--color-accent)]/15 text-[var(--color-accent)]' : 'border-[var(--color-border)] text-[var(--color-text-subtle)] group-hover:border-[var(--color-border-strong)]'}`}><Icon size={16} aria-hidden="true" /></span><span className="text-sm font-medium">{category.name}</span><ChevronRight className={`ml-auto hidden size-4 transition-transform lg:block ${active ? 'translate-x-0.5 text-[var(--color-accent)]' : 'text-transparent'}`} aria-hidden="true" /></button>
            })}
          </div>
        </div>

        <div id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${activeCategory.id}`} className="min-w-0 p-5 sm:p-7 lg:p-9">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activeCategory.id} {...(reduceMotion ? {} : contentMotion)} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-start xl:gap-12">
                <div>
                  <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">Selected focus / {activeCategory.name}</p>
                  <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">{activeCategory.description}</p>
                  <div className="mt-7"><h3 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Technologies</h3><div className="mt-3 flex flex-wrap gap-2">{activeCategory.technologies.map((technology) => <TechnologyChip key={technology} technology={technology} />)}</div></div>
                </div>
                <ConnectionVisual reduceMotion={Boolean(reduceMotion)} category={activeCategory} />
              </div>
              <div className="mt-9 border-t border-[var(--color-border)] pt-6"><h3 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Connected projects</h3><ul className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{relatedProjects.map((project) => <li key={project.id}><button type="button" onClick={() => onSelectProject(project)} className="group flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-white/[0.02] px-3.5 py-2.5 text-left transition-colors hover:border-[var(--color-border-strong)] hover:bg-white/[0.04]"><span className="min-w-0"><span className="block truncate text-sm font-medium text-white">{project.title}</span><span className="mt-0.5 block truncate text-xs text-[var(--color-text-subtle)]">{project.category}</span></span><ArrowUpRight className="size-4 shrink-0 text-[var(--color-text-subtle)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" aria-hidden="true" /></button></li>)}</ul></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}

type ConnectionVisualProps = { category: BuildLabCategory; reduceMotion: boolean }
function ConnectionVisual({ category, reduceMotion }: ConnectionVisualProps) {
  return <div className="lab-visual" aria-hidden="true"><svg viewBox="0 0 224 165" fill="none" className="h-auto w-full"><motion.path d="M32 30C75 30 75 82 112 82C151 82 153 136 196 136" stroke="var(--color-accent)" strokeOpacity=".45" strokeWidth="1.25" strokeDasharray="4 6" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, ease: 'easeOut' }} /><motion.path d="M32 30C72 30 72 57 112 57C151 57 154 57 196 57" stroke="var(--color-border-strong)" strokeWidth="1" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.08 }} />{[[32,30],[112,57],[112,82],[196,57],[196,136]].map(([cx, cy], index) => <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 0 ? 5 : 4} fill="var(--color-accent)" initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, delay: reduceMotion ? 0 : 0.22 + index * 0.05 }} />)}</svg><div className="lab-visual__label lab-visual__label--origin">{category.name}</div><div className="lab-visual__label lab-visual__label--tech">Tech</div><div className="lab-visual__label lab-visual__label--projects">Projects</div></div>
}
