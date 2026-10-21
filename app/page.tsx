import { SiteHeader } from '@/components/site-header'
import { ProfileHeader } from '@/components/profile-header'
import { ExperienceSection } from '@/components/experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContributionsSection } from '@/components/contributions-section'
import { SkillsSection } from '@/components/skills-section'
import { EducationSection } from '@/components/education-section'
import { SiteFooter } from '@/components/site-footer'
import { ChatWidget } from '@/components/chat/chat-widget'
import { resumeConfig } from '@/config/resume'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6">
        <ProfileHeader />

        <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10 lg:py-9">
          <div className="min-w-0 space-y-9">
            <ExperienceSection />
            <ProjectsSection />
            <ContributionsSection />
          </div>

          <aside className="space-y-7 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
            <SkillsSection />
            <EducationSection />
          </aside>
        </div>
      </main>
      <SiteFooter />
      <ChatWidget contactEmail={resumeConfig.profile.email} />
    </div>
  )
}
