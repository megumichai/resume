import { resumeConfig } from '@/config/resume'
import { ArrowUpRightIcon } from '@/components/icons'

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
const linkClassName =
  'underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground'

export function ProfileHeader() {
  const { profile } = resumeConfig
  const links = profile.links ?? []

  return (
    <section id="about" className="scroll-mt-20 border-b border-border py-8 md:py-10 print:pt-0">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-medium leading-none tracking-tight md:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-sm">
            {profile.role}
            <span className="text-muted-foreground"> · {profile.location}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm sm:justify-end">
            <li>
              <a href={`mailto:${profile.email}`} className={`${linkClassName} ${focusRing}`}>
                {profile.email}
              </a>
            </li>
            {profile.phone ? (
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className={`${linkClassName} ${focusRing}`}
                >
                  {profile.phone}
                </a>
              </li>
            ) : null}
            {links.map((link) => (
              <li data-no-print key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-0.5 ${linkClassName} ${focusRing}`}
                >
                  {link.label}
                  <ArrowUpRightIcon className="size-3 print:hidden" />
                </a>
              </li>
            ))}
          </ul>

          {profile.status ? (
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-foreground" />
              {profile.status}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
