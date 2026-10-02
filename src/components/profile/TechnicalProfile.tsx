import type { TechnicalProfileGroup } from '../../types/portfolio'
import { TechnologyChip } from '../projects/TechnologyChip'

type TechnicalProfileProps = { groups: TechnicalProfileGroup[] }

export function TechnicalProfile({ groups }: TechnicalProfileProps) {
  return <aside aria-labelledby="technical-profile-heading" className="rounded-2xl border border-[var(--color-border-strong)] bg-[linear-gradient(145deg,rgba(124,140,255,0.08),rgba(255,255,255,0.02)_58%)] p-5 shadow-[var(--shadow-glass)] sm:p-6">
    <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-accent)]">Technical profile</p>
    <h3 id="technical-profile-heading" className="mt-3 text-xl font-semibold tracking-[-0.035em] text-white">Core toolkit</h3>
    <dl className="mt-6 divide-y divide-[var(--color-border)]">
      {groups.map((group) => <div key={group.label} className="py-4 first:pt-0 last:pb-0"><dt className="text-sm font-medium text-white">{group.label}</dt><dd className="mt-2 flex flex-wrap gap-1.5">{group.technologies.map((technology) => <TechnologyChip key={technology} technology={technology} />)}</dd></div>)}
    </dl>
  </aside>
}
