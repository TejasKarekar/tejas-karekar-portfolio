import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectArchitecture } from '../../types/portfolio'

type ArchitectureDiagramProps = { architecture: ProjectArchitecture }

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  const reduceMotion = useReducedMotion()
  const connected = new Set(architecture.connections.map((connection) => `${connection.from}:${connection.to}`))

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white/[0.015] p-4 sm:p-5">
      <div className="min-w-[32rem]">
        <div className="flex items-center gap-2">
          {architecture.nodes.map((node, index) => (
            <div key={node.id} className="flex min-w-0 flex-1 items-center gap-2">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, delay: reduceMotion ? 0 : index * 0.08 }}
                className="min-w-0 flex-1 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-3 text-center font-mono text-[0.68rem] leading-5 text-[var(--color-text-muted)]"
              >
                {node.label}
              </motion.div>
              {index < architecture.nodes.length - 1 && <span className="shrink-0 text-[var(--color-accent)]" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[var(--color-text-subtle)]">{architecture.nodes.slice(0, -1).every((node, index) => connected.has(`${node.id}:${architecture.nodes[index + 1].id}`)) ? 'Information flow shown conceptually' : 'Connected components shown conceptually'}</p>
      </div>
    </div>
  )
}
