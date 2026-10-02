import { ChevronLeft, ChevronRight, ExternalLink, GitBranch, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { Project, ProjectImage } from '../../types/portfolio'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { ImageLightbox } from './ImageLightbox'
import { ProjectImageGallery } from './ProjectImageGallery'
import { ProjectVisual } from './ProjectVisual'
import { TechnologyChip } from './TechnologyChip'

type ProjectDetailsModalProps = { project: Project | null; projects: Project[]; onSelectProject: (project: Project) => void; onClose: () => void }
type CaseStudySectionProps = { label: string; children: ReactNode }

function CaseStudySection({ label, children }: CaseStudySectionProps) {
  return <section className="border-t border-[var(--color-border)] pt-7"><h3 className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">{label}</h3><div className="mt-3">{children}</div></section>
}

export function ProjectDetailsModal({ project, projects, onSelectProject, onClose }: ProjectDetailsModalProps) {
  const reduceMotion = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null)
  const projectIndex = project ? projects.findIndex((item) => item.id === project.id) : -1
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex >= 0 && projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  useEffect(() => {
    if (!project) return
    lastFocusedRef.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = ''
      setSelectedImage(null)
      lastFocusedRef.current?.focus()
    }
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedImage) setSelectedImage(null)
        else onClose()
        return
      }
      if (!selectedImage && event.key === 'ArrowLeft' && previousProject) { event.preventDefault(); onSelectProject(previousProject); return }
      if (!selectedImage && event.key === 'ArrowRight' && nextProject) { event.preventDefault(); onSelectProject(nextProject); return }
      if (selectedImage || event.key !== 'Tab') return
      const dialog = closeButtonRef.current?.closest('[role="dialog"]')
      const focusable = dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [nextProject, onClose, onSelectProject, previousProject, project, selectedImage])

  return createPortal(
    <AnimatePresence>
      {project && <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
        <motion.div role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="relative max-h-[92svh] w-full max-w-6xl overflow-y-auto rounded-t-2xl border border-[var(--color-border-strong)] bg-[#10131b] shadow-2xl sm:rounded-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[#10131b]/92 px-5 py-4 backdrop-blur sm:px-7"><p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-accent)]">Project case study</p><div className="flex items-center gap-2"><button type="button" onClick={() => previousProject && onSelectProject(previousProject)} disabled={!previousProject} aria-label="Previous project" className="grid size-9 place-items-center rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft size={18} aria-hidden="true" /></button><button type="button" onClick={() => nextProject && onSelectProject(nextProject)} disabled={!nextProject} aria-label="Next project" className="grid size-9 place-items-center rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"><ChevronRight size={18} aria-hidden="true" /></button><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close project details" className="grid size-9 place-items-center rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-white"><X size={18} aria-hidden="true" /></button></div></div>
          <div className="p-5 sm:p-7 lg:p-9">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
              {project.images?.length ? <ProjectImageGallery images={project.images} onSelectImage={setSelectedImage} /> : <ProjectVisual project={project} aspect="feature" className="rounded-xl border border-[var(--color-border)]" />}
              <header><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">{project.category}</span><span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">{project.status}</span></div><h2 id="project-dialog-title" className="mt-4 text-balance text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white">{project.title}</h2><p className="mt-5 max-w-2xl text-pretty text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">{project.shortDescription}</p><div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <TechnologyChip key={technology} technology={technology} />)}</div>{(project.github || project.liveDemo || project.caseStudy) && <div className="mt-7 flex flex-wrap gap-3">{project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)]">Live Demo <ExternalLink size={15} aria-hidden="true" /></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] px-3.5 py-2 text-sm font-medium text-white">View GitHub <GitBranch size={15} aria-hidden="true" /></a>}{project.caseStudy && <a href={project.caseStudy} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] px-3.5 py-2 text-sm font-medium text-white">Case Study <ExternalLink size={15} aria-hidden="true" /></a>}</div>}</header>
            </div>
            <div className="mt-9 grid gap-7 lg:grid-cols-2 lg:gap-x-10">{project.problem && <CaseStudySection label="The problem"><p className="text-sm leading-6 text-[var(--color-text-muted)]">{project.problem}</p></CaseStudySection>}{project.solution && <CaseStudySection label="The approach"><p className="text-sm leading-6 text-[var(--color-text-muted)]">{project.solution}</p></CaseStudySection>}{project.features.length > 0 && <CaseStudySection label="Key features"><ul className="grid gap-2 sm:grid-cols-2">{project.features.map((feature) => <li key={feature} className="rounded-lg border border-[var(--color-border)] bg-white/[0.02] px-3 py-2.5 text-sm leading-5 text-[var(--color-text-muted)]">{feature}</li>)}</ul></CaseStudySection>}<CaseStudySection label="Tech stack"><div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <TechnologyChip key={technology} technology={technology} />)}</div></CaseStudySection>{project.architecture && <CaseStudySection label="Technical approach"><ArchitectureDiagram architecture={project.architecture} /></CaseStudySection>}{project.technicalChallenges?.length ? <CaseStudySection label="Technical challenges"><div className="grid gap-3">{project.technicalChallenges.map((item) => <div key={item.challenge} className="rounded-lg border border-[var(--color-border)] bg-white/[0.02] p-4"><h4 className="text-sm font-medium text-white">{item.challenge}</h4><p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{item.approach}</p></div>)}</div></CaseStudySection> : null}{project.implementation?.length ? <CaseStudySection label="Implementation"><ul className="space-y-2 text-sm leading-6 text-[var(--color-text-muted)]">{project.implementation.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />{item}</li>)}</ul></CaseStudySection> : null}{project.learnings?.length ? <CaseStudySection label="What I learned"><ul className="space-y-2 text-sm leading-6 text-[var(--color-text-muted)]">{project.learnings.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />{item}</li>)}</ul></CaseStudySection> : null}<CaseStudySection label="Project status"><p className="text-sm leading-6 text-[var(--color-text-muted)]">{project.status}</p></CaseStudySection></div>
          </div>
          <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        </motion.div>
      </motion.div>}
    </AnimatePresence>,
    document.body,
  )
}
