import { resumeConfig } from '@/config/resume'
import { Section } from '@/components/section'

export function SkillsSection() {
  const { skills } = resumeConfig

  return (
    <Section id="skills" title="专业技能">
      <dl className="space-y-2.5">
        {skills.map((group) => (
          <div key={group.title} className="grid grid-cols-[4.5rem_1fr] gap-3 text-sm">
            <dt className="text-xs leading-6 text-muted-foreground">{group.title}</dt>
            <dd className="leading-6">{group.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
