export type ProjectStatus = 'Concept' | 'In Development' | 'Prototype' | 'Completed' | 'Project'
export type ProjectKind = 'Professional' | 'Personal' | 'Academic' | 'Concept'
export type ProjectVisual = 'attendance' | 'travel' | 'cloud' | 'security' | 'creative' | 'automation' | 'business' | 'ml'
export type ProjectImage = { src: string; alt: string; caption?: string }
export type ArchitectureNode = { id: string; label: string }
export type ArchitectureConnection = { from: string; to: string }
export type ProjectArchitecture = { nodes: ArchitectureNode[]; connections: ArchitectureConnection[] }
export type TechnicalChallenge = { challenge: string; approach: string }
export type Project = {
  id: string
  title: string
  shortDescription: string
  description: string
  category: string
  kind: ProjectKind
  subtitle?: string
  technologies: string[]
  featured: boolean
  status: ProjectStatus
  image: string | null
  images?: ProjectImage[]
  visual: ProjectVisual
  accent: string
  github: string | null
  liveDemo: string | null
  googlePlayUrl?: string | null
  caseStudy: string | null
  problem?: string
  solution?: string
  features: string[]
  architecture?: ProjectArchitecture
  technicalChallenges?: TechnicalChallenge[]
  implementation?: string[]
  learnings?: string[]
}
export type SkillGroup = { name: string; skills: string[] }
export type AboutContent = { eyebrow: string; heading: string; paragraphs: string[]; identityTags: string[]; focusAreas: Array<{ label: string; description: string }> }
export type Experience = { role: string; company: string; location: string; duration: string; type: string; description: string; context: string; technologies: string[]; highlights: string[] }
export type Education = { degree: string; institution: string; location: string; duration: string; description: string; details?: string[]; current?: boolean }
export type Certification = { name: string; issuer: string }
export type Achievement = { title: string; issuer: string }
export type JourneyStep = { label: string }
export type SocialLink = { label: string; href: string; kind: 'github' | 'linkedin' | 'email' }
export type NavigationItem = { label: string; href: string }
export type BuildLabCategory = {
  id: 'mobile' | 'ai-ml' | 'full-stack' | 'automation'
  name: string
  description: string
  technologies: string[]
  projectIds: string[]
}
export type SnapshotCapability = { title: string; areas: string[] }
export type BuildProcessStep = { step: string; title: string; description: string }
export type TechnicalProfileGroup = { label: string; technologies: string[] }
export type ProfileSnapshot = {
  eyebrow: string
  heading: string
  description: string
  capabilities: SnapshotCapability[]
  process: BuildProcessStep[]
  technicalProfile: TechnicalProfileGroup[]
}
export type PersonalInfo = {
  name: string
  displayName: string
  role: string
  shortBio: string
  email: string | null
  phone: string | null
  github: string | null
  linkedin: string | null
  resume: string | null
  profileImage: string | null
  areas: readonly string[]
}
