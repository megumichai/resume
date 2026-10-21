import { resumeConfig } from '@/config/resume'
import { ArrowUpRightIcon } from '@/components/icons'
import { Section } from '@/components/section'

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function ProjectsSection() {
  const { projects } = resumeConfig

  return (
    <Section id="projects" title="项目经历">
      <ol className="divide-y divide-border">
        {projects.map((project) => (
          <li key={project.name} className="py-4 first:pt-0 last:pb-0 print:break-inside-avoid">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-base font-medium leading-6">
                  {project?.href ? (
                    <a
                      href={project?.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`group inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:underline ${focusRing}`}
                    >
                      {project.name}
                      <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 print:hidden" />
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                {project.role ? (
                  <p className="mt-0.5 text-sm text-muted-foreground">{project.role}</p>
                ) : null}
              </div>
              {project.period ? (
                <p className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
                  {project.period}
                </p>
              ) : null}
            </div>

            <p className="mt-1.5 text-sm leading-6">{project.description}</p>

            {project.highlights?.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 marker:text-muted-foreground">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}

            {project.tech?.length ? (
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                {project.tech.join(' · ')}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  )
}
