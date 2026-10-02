type TechnologyChipProps = { technology: string }

export function TechnologyChip({ technology }: TechnologyChipProps) {
  return <span className="rounded-md border border-[var(--color-border)] bg-white/[0.025] px-2.5 py-1 font-mono text-[0.64rem] text-[var(--color-text-muted)]">{technology}</span>
}
