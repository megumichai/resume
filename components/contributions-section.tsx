import { resumeConfig } from '@/config/resume'
import { ArrowUpRightIcon } from '@/components/icons'
import { Section } from '@/components/section'

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function ContributionsSection() {
  const { contributions } = resumeConfig

  if (contributions.length === 0) {
    return null
  }

  return (
    <Section id="contributions" title="开源贡献">
      <ol className="divide-y divide-border">
        {contributions.map((item) => (
          <li key={item.repo} className="py-4 first:pt-0 last:pb-0 print:break-inside-avoid">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-base font-medium leading-6">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:underline ${focusRing}`}
                  >
                    {item.repo}
                    <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 print:hidden" />
                  </a>
                </h3>
                {item.description ? (
                  <p className="mt-1.5 text-sm leading-6">{item.description}</p>
                ) : null}
              </div>
              {item.period ? (
                <p className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
                  {item.period}
                </p>
              ) : null}
            </div>

            {item.highlights?.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 marker:text-muted-foreground">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}

            {item.tech?.length ? (
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                {item.tech.join(' · ')}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  )
}
