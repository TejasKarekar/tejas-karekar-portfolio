import { useEffect, useState } from 'react'
import { SiteShell } from './components/layout/SiteShell'
import { Hero } from './components/hero/Hero'
import { AboutSection } from './components/about/AboutSection'
import { Navbar } from './components/layout/Navbar'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { SkillsSection } from './components/skills/SkillsSection'
import { ExperienceSection } from './components/experience/ExperienceSection'
import { EducationSection } from './components/education/EducationSection'
import { JourneySection } from './components/journey/JourneySection'
import { ContactSection } from './components/contact/ContactSection'
import { FinalCTA } from './components/cta/FinalCTA'
import { Footer } from './components/footer/Footer'
import { BuildLab } from './components/lab/BuildLab'
import { ProjectDetailsModal } from './components/projects/ProjectDetailsModal'
import type { Project } from './types/portfolio'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { BackToTop } from './components/ui/BackToTop'
import { ProfileSnapshot } from './components/profile/ProfileSnapshot'
import { CommandPalette } from './components/ui/CommandPalette'
import { projects } from './data/portfolio'

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])
  return (
    <SiteShell>
      <ScrollProgress />
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <ProfileSnapshot />
        <SkillsSection />
        <BuildLab onSelectProject={setSelectedProject} />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <ExperienceSection />
        <EducationSection />
        <JourneySection />
        <ContactSection />
        <FinalCTA />
      </main>
      <ProjectDetailsModal project={selectedProject} projects={projects} onSelectProject={setSelectedProject} onClose={() => setSelectedProject(null)} />
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      <BackToTop />
      <Footer />
    </SiteShell>
  )
}

export default App
