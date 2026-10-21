import { streamText } from 'ai'
import { getChatModel } from '@/agent/openrouter'
import { SYSTEM_PROMPT } from '@/agent/prompt'
import { isRateLimited } from '@/agent/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_MESSAGES = 12
const MAX_HISTORY = 8
const MAX_MESSAGE_LENGTH = 2000
const MAX_TOTAL_LENGTH = 8000
const MAX_BODY_LENGTH = 20_000

type ChatMessage = { role: 'user'; content: string } | { role: 'assistant'; content: string }

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false
  const { role, content } = value as { role?: unknown; content?: unknown }
  return (
    (role === 'user' || role === 'assistant') &&
    typeof content === 'string' &&
    content.trim().length > 0 &&
    content.length <= MAX_MESSAGE_LENGTH
  )
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) {
    return errorResponse('请求来源无效。', 403)
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return errorResponse('请求格式不正确。', 415)
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return errorResponse('提问过于频繁，请稍后再试。', 429)
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_LENGTH) {
    return errorResponse('请求内容过长。', 413)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return errorResponse('请求格式不正确。', 400)
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !Array.isArray((body as { messages?: unknown }).messages)
  ) {
    return errorResponse('请求格式不正确。', 400)
  }

  const rawMessages = (body as { messages: unknown[] }).messages
  if (
    rawMessages.length === 0 ||
    rawMessages.length > MAX_MESSAGES ||
    !rawMessages.every(isChatMessage)
  ) {
    return errorResponse('消息格式不正确。', 400)
  }

  const messages = rawMessages.slice(-MAX_HISTORY)
  if (messages.at(-1)?.role !== 'user') {
    return errorResponse('最后一条消息必须来自访客。', 400)
  }

  const totalLength = messages.reduce((total, message) => total + message.content.length, 0)
  if (totalLength > MAX_TOTAL_LENGTH) {
    return errorResponse('消息内容过长。', 413)
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return errorResponse('问答服务尚未配置。', 503)
  }

  const result = streamText({
    model: getChatModel(new URL(request.url).origin),
    instructions: SYSTEM_PROMPT,
    messages,
    temperature: 0.3,
    maxOutputTokens: 600,
    abortSignal: request.signal,
    onError: ({ error }) => {
      console.error('[resume-chat]', error)
    },
  })

  return result.toTextStreamResponse({
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
