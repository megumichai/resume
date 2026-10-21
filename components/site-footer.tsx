import { resumeConfig } from '@/config/resume'

const YEAR = 2026

export function SiteFooter() {
  const { profile, site } = resumeConfig

  return (
    <footer className="border-t border-border print:hidden">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {YEAR} {profile.name}
        </p>
        <p>
          {site.deploy && (
            <>
              由{' '}
              <a href={site.deploy.url} target="_blank">
                {site.deploy.name}
              </a>{' '}
              驱动
            </>
          )}
        </p>
      </div>
    </footer>
  )
}
