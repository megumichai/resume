import { resumeConfig } from '@/config/resume'
import { HeaderActions } from '@/components/header-actions'

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function SiteHeader() {
  const { site } = resumeConfig
  const navigation = [
    { label: '工作', href: '#experience' },
    { label: '项目', href: '#projects' },
    { label: '贡献', href: '#contributions' },
    { label: '技能', href: '#skills' },
    { label: '教育', href: '#education' },
  ]

  return (
    <header
      data-no-print
      className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-6">
        <a href="#about" className={`text-sm font-semibold tracking-tight ${focusRing}`}>
          {site.name}
        </a>

        <nav aria-label="页面导航" className="ml-auto hidden items-center gap-5 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs text-muted-foreground transition-colors hover:text-foreground ${focusRing}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto md:ml-0">
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}
