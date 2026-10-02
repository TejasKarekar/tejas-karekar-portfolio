import { cn } from '../../lib/cn'

type SignatureAccentProps = { className?: string }

export function SignatureAccent({ className }: SignatureAccentProps) {
  return <span aria-hidden="true" className={cn('signature-accent', className)} />
}
