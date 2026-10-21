import { MoonIcon, PrinterIcon, SunIcon } from '@/components/icons'

const buttonClassName =
  'grid size-8 place-items-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function HeaderActions() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark')

    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {}

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? '#121212' : '#ffffff')
  }

  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        onClick={() => window.print()}
        aria-label="打印或导出 PDF"
        title="打印 / 导出 PDF"
        className={buttonClassName}
      >
        <PrinterIcon className="size-4" />
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="切换明暗主题"
        title="切换主题"
        className={buttonClassName}
      >
        <MoonIcon className="size-4 dark:hidden" />
        <SunIcon className="hidden size-4 dark:block" />
      </button>
    </div>
  )
}
