import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  children: ReactNode
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3">
        <h2 className="shrink-0 text-sm font-semibold tracking-wide">{title}</h2>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-3">{children}</div>
    </section>
  )
}
