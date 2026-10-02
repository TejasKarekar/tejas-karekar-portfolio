import { cn } from '../../lib/cn'

type BrandMarkProps = { className?: string }

export function BrandMark({ className }: BrandMarkProps) {
  return <span aria-hidden="true" className={cn('brand-mark grid shrink-0 place-items-center rounded-md border border-[var(--color-border-strong)] bg-white/[0.04] font-mono font-semibold tracking-[-0.12em] text-[var(--color-accent)]', className)}>TK</span>
}
