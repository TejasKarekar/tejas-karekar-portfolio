import { motion, useReducedMotion } from 'framer-motion'

const nodes = [
  { cx: 53, cy: 55, r: 4 }, { cx: 156, cy: 40, r: 3 }, { cx: 229, cy: 95, r: 5 }, { cx: 120, cy: 150, r: 3 }, { cx: 273, cy: 180, r: 3 }, { cx: 71, cy: 226, r: 4 },
]
const connections = ['53,55 156,40 229,95 120,150 71,226', '120,150 229,95 273,180', '53,55 120,150']

export function SystemVisual() {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div className="pointer-events-none absolute right-[-5rem] top-1/2 hidden w-[21rem] -translate-y-1/2 opacity-70 lg:block xl:right-[3vw]" initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 0.7, scale: 1 }} transition={{ delay: 0.9, duration: 0.8 }} aria-hidden="true">
      <svg viewBox="0 0 320 280" fill="none" className="w-full overflow-visible">
        <defs><linearGradient id="node-line" x1="20" y1="30" x2="290" y2="230" gradientUnits="userSpaceOnUse"><stop stopColor="#7C8CFF" stopOpacity="0.12" /><stop offset="0.5" stopColor="#C5CEFF" stopOpacity="0.55" /><stop offset="1" stopColor="#7C8CFF" stopOpacity="0.08" /></linearGradient><radialGradient id="node-core"><stop stopColor="#D7DCFF" /><stop offset="1" stopColor="#7C8CFF" /></radialGradient></defs>
        {connections.map((points) => <polyline key={points} points={points} stroke="url(#node-line)" strokeWidth="1" />)}
        <circle cx="161" cy="130" r="105" stroke="rgba(124,140,255,0.12)" strokeWidth="1" strokeDasharray="3 8" />
        {nodes.map((node, index) => <motion.circle key={`${node.cx}-${node.cy}`} {...node} fill="url(#node-core)" animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }} transition={{ duration: 3.5, delay: index * 0.22, repeat: Infinity, ease: 'easeInOut' }} />)}
      </svg>
    </motion.div>
  )
}
