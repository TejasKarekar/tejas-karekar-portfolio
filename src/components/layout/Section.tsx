import type { ElementType, PropsWithChildren } from 'react'
import { cn } from '../../lib/cn'
import { SectionReveal } from '../ui/SectionReveal'
import { Container } from './Container'
type SectionProps = PropsWithChildren<{ as?: ElementType; className?: string; containerClassName?: string; id?: string }>
export function Section({ as: Tag = 'section', children, className, containerClassName, id }: SectionProps) { return <Tag id={id} className={cn('scroll-mt-20 py-16 sm:py-24 lg:py-32', className)}><Container className={containerClassName}><SectionReveal>{children}</SectionReveal></Container></Tag> }
