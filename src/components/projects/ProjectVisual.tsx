import type { CSSProperties } from 'react'
import type { Project } from '../../types/portfolio'
import './projects.css'

type ProjectVisualProps = { project: Project; aspect?: 'feature' | 'card' | 'compact'; className?: string }

export function ProjectVisual({ project, aspect = 'card', className = '' }: ProjectVisualProps) {
  const style = { '--project-accent': project.accent } as CSSProperties
  if (project.image) return <div className={`project-visual project-visual--${aspect} ${className}`} style={style}><img src={project.image} alt={`${project.title} project preview`} loading="lazy" /></div>
  return <div className={`project-visual project-visual--${aspect} project-visual--${project.visual} ${className}`} style={style} aria-hidden="true"><div className="project-visual__glow" /><div className="project-visual__grid" /><div className="project-visual__line project-visual__line--one" /><div className="project-visual__line project-visual__line--two" /><div className="project-visual__node project-visual__node--one" /><div className="project-visual__node project-visual__node--two" /><div className="project-visual__node project-visual__node--three" /><span className="project-visual__mark">{project.id.slice(0, 2).toUpperCase()}</span></div>
}
