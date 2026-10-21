import { resumeConfig } from '@/config/resume'
import { Section } from '@/components/section'

export function EducationSection() {
  const { education } = resumeConfig

  return (
    <Section id="education" title="教育经历">
      <div className="space-y-4">
        {education.map((item) => (
          <div key={`${item.school}-${item.period}`} className="print:break-inside-avoid">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-medium">{item.school}</h3>
              <p className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
                {item.period}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{item.degree}</p>
            {item.detail ? (
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  )
}
