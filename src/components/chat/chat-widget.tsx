'use client'

import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { CloseIcon, MessageIcon, RotateCcwIcon, SendIcon, StopIcon } from '@/components/icons'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

type ChatWidgetProps = {
  contactEmail: string
}

const MAX_HISTORY = 8

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const STARTER_QUESTIONS = [
  '他做过哪些项目？',
  '他的技术栈是什么？',
  '他目前是否在找工作？',
  '如何联系他？',
] as const

const iconButtonClassName =
  'grid size-7 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
const primaryButtonClassName =
  'grid size-9 shrink-0 place-items-center rounded-md bg-foreground text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40'

export function ChatWidget({ contactEmail }: ChatWidgetProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [streaming, setStreaming] = useState(false)
  const busyRef = useRef(false)
  const abortRef = useRef<AbortController | null>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const container = messagesRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, streaming])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        abortRef.current?.abort()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  function appendChunk(id: string, chunk: string) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, content: message.content + chunk } : message,
      ),
    )
  }

  async function sendMessage(value: string) {
    const question = value.trim()
    if (!question || busyRef.current) return

    busyRef.current = true

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: question,
    }
    const assistantId = createId()
    const nextMessages = [...messages, userMessage]
    const history = nextMessages.slice(-MAX_HISTORY)

    setMessages([...nextMessages, { id: assistantId, role: 'assistant', content: '' }])
    setInput('')
    setError('')
    setStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error || '问答服务暂时不可用，请稍后重试。')
      }

      if (!response.body) {
        throw new Error('问答服务暂时不可用，请稍后重试。')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { value: chunk, done } = await reader.read()
        if (done) break

        const text = decoder.decode(chunk, { stream: true })
        if (text) appendChunk(assistantId, text)
      }

      const tail = decoder.decode()
      if (tail) appendChunk(assistantId, tail)

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId && !message.content
            ? { ...message, content: '暂时没有生成回答，请换一种问法试试。' }
            : message,
        ),
      )
    } catch (caught) {
      if (controller.signal.aborted) {
        setMessages((current) =>
          current.filter((message) => message.id !== assistantId || message.content.length > 0),
        )
        return
      }

      setMessages((current) =>
        current.filter((message) => message.id !== assistantId || message.content.length > 0),
      )
      setError(caught instanceof Error ? caught.message : '问答服务暂时不可用，请稍后重试。')
    } finally {
      busyRef.current = false
      abortRef.current = null
      setStreaming(false)
    }
  }

  function stopResponse() {
    abortRef.current?.abort()
  }

  function resetConversation() {
    abortRef.current?.abort()
    setMessages([])
    setInput('')
    setError('')
  }

  function closePanel() {
    setOpen(false)
    abortRef.current?.abort()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage(input)
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void sendMessage(input)
    }
  }

  const lastMessage = messages[messages.length - 1]

  return (
    <div data-no-print className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <section
          id="resume-chat-panel"
          role="dialog"
          aria-labelledby="resume-chat-title"
          className="flex h-[30rem] max-h-[calc(100dvh_-_7rem)] w-[22rem] max-w-[calc(100vw_-_2.5rem)] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl"
        >
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p id="resume-chat-title" className="text-sm font-semibold">
                简历问答
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">基于简历内容回答</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetConversation}
                aria-label="清空对话"
                title="清空对话"
                className={iconButtonClassName}
              >
                <RotateCcwIcon className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={closePanel}
                aria-label="关闭问答"
                title="关闭"
                className={iconButtonClassName}
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
          </header>

          <div
            ref={messagesRef}
            aria-live="polite"
            aria-busy={streaming}
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
          >
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">你可以问我：</p>
                <div className="flex flex-wrap gap-2">
                  {STARTER_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void sendMessage(question)}
                      className="rounded-full border border-border px-3 py-1.5 text-left text-xs text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && !message.content ? (
                    <p className="text-xs text-muted-foreground">正在思考…</p>
                  ) : (
                    <p
                      className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-6 ${
                        message.role === 'user'
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {message.content}
                      {streaming &&
                      message.role === 'assistant' &&
                      index === messages.length - 1 ? (
                        <span className="ml-0.5 inline-block h-4 w-1 animate-pulse rounded-sm bg-foreground align-middle" />
                      ) : null}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          {error ? (
            <div
              role="alert"
              className="mx-3 mb-2 rounded-md border border-border bg-muted px-3 py-2 text-xs leading-5"
            >
              <p>{error}</p>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-1 inline-block text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                邮件联系
              </a>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="border-t border-border p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                rows={1}
                maxLength={2000}
                placeholder={
                  streaming
                    ? '正在回答…'
                    : lastMessage?.role === 'assistant'
                      ? '继续追问…'
                      : '问问他的经历、项目或技能…'
                }
                aria-label="输入问题"
                className="max-h-28 min-h-9 flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm leading-5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
              {streaming ? (
                <button
                  type="button"
                  onClick={stopResponse}
                  aria-label="停止回答"
                  title="停止回答"
                  className={primaryButtonClassName}
                >
                  <StopIcon className="size-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="发送问题"
                  title="发送"
                  className={primaryButtonClassName}
                >
                  <SendIcon className="size-4" />
                </button>
              )}
            </div>
            <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
              AI 回答基于简历内容，可能不准确。正式沟通请{' '}
              <a
                href={`mailto:${contactEmail}`}
                className="underline underline-offset-2 hover:text-foreground"
              >
                {contactEmail}
              </a>
              。
            </p>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={open ? closePanel : () => setOpen(true)}
        aria-label={open ? '关闭简历问答' : '打开简历问答'}
        aria-expanded={open}
        aria-controls="resume-chat-panel"
        title={open ? '关闭问答' : '向 AI 提问简历'}
        className="grid size-12 place-items-center rounded-full bg-foreground text-background shadow-lg outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {open ? <CloseIcon className="size-5" /> : <MessageIcon className="size-5" />}
      </button>
    </div>
  )
}
