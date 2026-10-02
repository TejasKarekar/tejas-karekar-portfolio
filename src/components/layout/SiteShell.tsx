import type { PropsWithChildren } from 'react'
export function SiteShell({ children }: PropsWithChildren) { return <div className="min-h-screen overflow-x-clip bg-[var(--color-canvas)] text-[var(--color-text)] selection:bg-[var(--color-accent)]/30 selection:text-white"><a className="skip-link" href="#main-content">Skip to content</a>{children}</div> }
