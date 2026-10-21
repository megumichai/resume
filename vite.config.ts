import { fileURLToPath } from 'node:url'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { resumeConfig } from './src/config/resume.ts'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    {
      name: 'inject-resume-meta',
      transformIndexHtml(html) {
        return html
          .replaceAll('%SITE_NAME%', escapeHtml(resumeConfig.site.name))
          .replaceAll('%SITE_TITLE%', escapeHtml(resumeConfig.site.title))
          .replaceAll('%SITE_DESCRIPTION%', escapeHtml(resumeConfig.site.description))
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
