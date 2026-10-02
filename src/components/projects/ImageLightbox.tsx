import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ProjectImage } from '../../types/portfolio'

type ImageLightboxProps = { image: ProjectImage | null; onClose: () => void }

export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  const reduceMotion = useReducedMotion()
  return <AnimatePresence>{image && <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="absolute inset-0 z-20 grid place-items-center bg-[#080a0f]/95 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><motion.div role="dialog" aria-modal="true" aria-label={`${image.alt} enlarged`} initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }} className="relative flex max-h-full w-full max-w-5xl flex-col"><button type="button" onClick={onClose} autoFocus aria-label="Close image preview" className="absolute right-2 top-2 z-10 grid size-10 place-items-center rounded-md border border-white/20 bg-black/45 text-white transition-colors hover:bg-black/70"><X size={18} aria-hidden="true" /></button><img src={image.src} alt={image.alt} className="max-h-[72svh] w-full rounded-xl object-contain" />{image.caption && <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-[var(--color-text-muted)]">{image.caption}</p>}</motion.div></motion.div>}</AnimatePresence>
}
