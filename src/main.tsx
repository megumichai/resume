import { render } from 'preact'
import '@fontsource-variable/inter'
import '@fontsource-variable/noto-serif'
import './styles.css'
import { App } from './app'

const container = document.getElementById('app')

if (container) {
  render(<App />, container)
}

declare module 'preact' {
  interface HTMLAttributes<RefType extends EventTarget = EventTarget> {
    'data-no-print'?: boolean
  }
}
