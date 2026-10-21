import 'server-only'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'

const DEFAULT_MODEL = 'google/gemini-3.1-flash-lite'

export function getChatModel(siteUrl: string) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured')
  }

  const openrouter = createOpenRouter({
    apiKey,
    headers: {
      'HTTP-Referer': siteUrl,
      'X-Title': 'Resume',
    },
  })

  return openrouter.chat(process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL)
}
