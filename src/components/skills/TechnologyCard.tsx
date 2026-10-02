import { motion, useReducedMotion } from 'framer-motion'
import { categoryIcons, technologyIcons, type TechnologyCategory, type TechnologyName } from './technology-icons'
type TechnologyCardProps = { name: TechnologyName; category: TechnologyCategory; index: number }

export function TechnologyCard({ name, category, index }: TechnologyCardProps) {
  const reduceMotion = useReducedMotion()
  const Icon = technologyIcons[name] ?? categoryIcons[category]
  return <motion.li initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.035, ease: [0.22, 1, 0.36, 1] }} className="group min-w-0"><div className="flex min-h-24 flex-col justify-between rounded-xl border border-[var(--color-border)] bg-white/[0.02] p-3.5 transition duration-200 group-hover:-translate-y-1 group-hover:border-[var(--color-border-strong)] group-hover:bg-white/[0.04] group-hover:shadow-[0_12px_30px_rgba(83,99,210,0.1)]"><Icon className="text-[var(--color-text-subtle)] transition duration-200 group-hover:scale-105 group-hover:text-[var(--color-accent)]" size={19} aria-label={`${name} icon`} /><div><p className="truncate text-sm font-medium text-white">{name}</p><p className="mt-0.5 truncate text-xs text-[var(--color-text-subtle)]">{category}</p></div></div></motion.li>
}
