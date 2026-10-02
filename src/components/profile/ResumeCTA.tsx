import { FileText } from 'lucide-react'

type ResumeCTAProps = { resume: string | null }

export function ResumeCTA({ resume }: ResumeCTAProps) {
  if (!resume) return null
  return <div className="mt-8"><p className="text-sm text-[var(--color-text-muted)]">Want the short version?</p><a href={resume} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-white/[0.025] px-3.5 text-sm font-medium text-white transition-colors hover:border-[var(--color-accent)] hover:bg-white/[0.05]"><FileText size={16} aria-hidden="true" />View Resume</a></div>
}
