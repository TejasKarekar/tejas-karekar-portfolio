import type { ProjectImage } from '../../types/portfolio'

type ProjectImageGalleryProps = { images: ProjectImage[]; onSelectImage: (image: ProjectImage) => void }

export function ProjectImageGallery({ images, onSelectImage }: ProjectImageGalleryProps) {
  if (!images.length) return null
  return (
    <section aria-labelledby="project-gallery-heading">
      <h3 id="project-gallery-heading" className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Project gallery</h3>
      <div className="mt-3 flex snap-x gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible">
        {images.map((image, index) => (
          <figure key={image.src} className={index === 0 ? 'min-w-[88%] snap-start sm:col-span-2 sm:min-w-0' : 'min-w-[72%] snap-start sm:min-w-0'}>
            <button type="button" onClick={() => onSelectImage(image)} className="group block w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-white/[0.02] text-left transition-colors hover:border-[var(--color-border-strong)]" aria-label={`View ${image.alt} larger`}>
              <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} className="aspect-[16/10] w-full object-cover transition-transform duration-200 group-hover:scale-[1.015]" />
            </button>
            {image.caption && <figcaption className="mt-2 text-xs leading-5 text-[var(--color-text-subtle)]">{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  )
}
