import { resumeConfig } from '@/config/resume'
import { Section } from '@/components/section'

export function ExperienceSection() {
  const { experience } = resumeConfig

  return (
    <Section id="experience" title="工作经历">
      <ol className="divide-y divide-border">
        {experience.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="py-4 first:pt-0 last:pb-0 print:break-inside-avoid"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-base font-medium leading-6">{item.role}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.company}
                  {item.location ? ` · ${item.location}` : null}
                </p>
              </div>
              <p className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
                {item.period}
              </p>
            </div>

            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 marker:text-muted-foreground">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {item.tech?.length ? (
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {item.tech.join(' · ')}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  )
}
