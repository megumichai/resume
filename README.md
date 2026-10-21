# 简历网站

基于 Next.js、React 与 Tailwind CSS 的单页简历网站，内置基于简历内容的 AI 问答。

## 技术栈

- Next.js App Router
- React 19
- Tailwind CSS
- Vercel AI SDK 与 OpenRouter

## 配置

所有简历内容集中在 `config/resume.ts`：

- `site`：网站名称、浏览器标题与 SEO 描述
- `profile`：姓名、职位、城市、联系方式与链接
- `skills`：专业技能
- `experience`：工作经历
- `projects`：项目经历
- `contributions`：开源贡献，支持补充贡献描述、时间与标签
- `education`：教育经历

页面展示和 AI 问答共用这份配置，修改后两边会同步更新。

## 运行

需要 Node.js 22 或更高版本。

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:3000`。

## 构建

```bash
pnpm build
pnpm start
```

## 简历问答

- 前端组件：`components/chat/chat-widget.tsx`
- 接口：`app/api/chat/route.ts`
- 知识整理：`agent/knowledge.ts`
- 回答规则：`agent/prompt.ts`
- 模型接入：`agent/openrouter.ts`

接口只接受最近 8 条消息，单条最多 2000 字符，回复最多 600 tokens。当前使用内存限流，每个 IP 每分钟最多 15 次请求。

## 环境变量

在本地 `.env.local` 或 Vercel 项目设置中配置：

| 变量                 | 必填 | 说明                                                    |
| -------------------- | ---- | ------------------------------------------------------- |
| `OPENROUTER_API_KEY` | 是   | OpenRouter API Key，只在服务端使用                      |
| `OPENROUTER_MODEL`   | 否   | OpenRouter 模型 ID，默认 `google/gemini-3.1-flash-lite` |

可选模型示例：`google/gemini-3.1-flash-lite`、`deepseek/deepseek-chat-v3.1`、`anthropic/claude-haiku-5.5`，以 OpenRouter 当前模型列表为准。

不要给密钥添加 `NEXT_PUBLIC_` 前缀，否则密钥会进入浏览器。

## 部署

部署到 Vercel 时，在项目的 Environment Variables 中添加上述变量，Production 和 Preview 环境都需要配置。

建议：

- 为 OpenRouter Key 设置消费上限；
- 为 Preview 部署开启 Deployment Protection，避免预览域名被刷；
- 流量较大时把内存限流替换为 Upstash Redis 或 Vercel Firewall 限流。

页面右上角支持明暗主题切换和打印 / 导出 PDF。
