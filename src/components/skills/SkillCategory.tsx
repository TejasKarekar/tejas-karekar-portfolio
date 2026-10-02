import { motion, useReducedMotion } from 'framer-motion'
import type { SkillGroup } from '../../types/portfolio'
import { TechnologyCard } from './TechnologyCard'
import type { TechnologyCategory, TechnologyName } from './technology-icons'

type SkillCategoryProps = { group: SkillGroup; groupIndex: number }

export function SkillCategory({ group, groupIndex }: SkillCategoryProps) {
  const reduceMotion = useReducedMotion()
  return <motion.section initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4, delay: reduceMotion ? 0 : groupIndex * 0.06, ease: [0.22, 1, 0.36, 1] }} aria-labelledby={`skill-category-${group.name}`}><h3 id={`skill-category-${group.name}`} className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{group.name}</h3><ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-2">{group.skills.map((skill, skillIndex) => <TechnologyCard key={skill} name={skill as TechnologyName} category={group.name as TechnologyCategory} index={skillIndex} />)}</ul></motion.section>
}
