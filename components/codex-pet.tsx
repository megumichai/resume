'use client'

import { useEffect } from 'react'
import { CHAT_PET_MOVE_EVENT, CHAT_TOGGLE_EVENT, type PetRect } from '@/components/chat/chat-events'

type CodexPetInstance = {
  destroy: () => void
}

declare global {
  interface Window {
    CodexPet?: {
      mount: (
        target: string | HTMLElement,
        config: {
          petJson: string
          spritesheet: string
          state?: string
          scale?: number
          speed?: number
          mode?: string
          position?: string
          draggable?: boolean
          clickCycle?: boolean
          zIndex?: number
        },
      ) => CodexPetInstance
    }
  }
}

export function CodexPet() {
  useEffect(() => {
    let cancelled = false
    let teardown: (() => void) | undefined
    const script = document.createElement('script')

    script.src = '/codex-pet.js'
    script.onload = () => {
      if (cancelled) return

      const container = document.querySelector<HTMLElement>('#codex-pet')
      if (!container) return

      const instance = window.CodexPet?.mount(container, {
        petJson: '/pets/firefly/pet.json',
        spritesheet: '/pets/firefly/spritesheet.webp',
        state: 'idle',
        scale: 1,
        speed: 100,
        mode: 'fixed',
        position: 'bottom-right',
        draggable: true,
        clickCycle: false,
        zIndex: 1000,
      })

      if (!instance) return

      let start: { x: number; y: number } | null = null
      let frame = 0
      let observer: MutationObserver | undefined

      const host = container.querySelector<HTMLElement>('[data-codex-pet-host]')
      const petElement = host?.shadowRoot?.querySelector<HTMLElement>('.cp-pet')

      if (petElement) {
        function publishPetRect() {
          cancelAnimationFrame(frame)
          frame = requestAnimationFrame(() => {
            const rect = petElement?.getBoundingClientRect()

            if (!rect || rect.width === 0 || rect.height === 0) return

            const detail: PetRect = {
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
            }

            window.dispatchEvent(new CustomEvent<PetRect>(CHAT_PET_MOVE_EVENT, { detail }))
          })
        }

        observer = new MutationObserver(publishPetRect)
        observer.observe(petElement, { attributes: true, attributeFilter: ['style'] })
        publishPetRect()
      }

      function handlePointerDown(event: PointerEvent) {
        start = { x: event.clientX, y: event.clientY }
      }

      function handlePointerUp(event: PointerEvent) {
        if (!start) return

        const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y)
        start = null

        if (distance < 5) {
          window.dispatchEvent(new CustomEvent(CHAT_TOGGLE_EVENT))
        }
      }

      function handlePointerCancel() {
        start = null
      }

      container.addEventListener('pointerdown', handlePointerDown, true)
      container.addEventListener('pointerup', handlePointerUp, true)
      container.addEventListener('pointercancel', handlePointerCancel, true)

      teardown = () => {
        observer?.disconnect()
        cancelAnimationFrame(frame)
        container.removeEventListener('pointerdown', handlePointerDown, true)
        container.removeEventListener('pointerup', handlePointerUp, true)
        container.removeEventListener('pointercancel', handlePointerCancel, true)
        instance.destroy()
      }
    }

    document.body.appendChild(script)

    return () => {
      cancelled = true
      teardown?.()
      script.remove()
      document.querySelector('#codex-pet')?.replaceChildren()
    }
  }, [])

  return <div id="codex-pet" data-no-print aria-hidden="true" />
}
