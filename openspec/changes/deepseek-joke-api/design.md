## Context

`scaffold-joke-app` 已交付三页路由与 `api/joke` 501 占位。项目要求仅使用 DeepSeek 官方 API，模型 `deepseek-v4-flash`，前端 `fetch('/api/joke')`，Key 仅环境变量。

## Goals / Non-Goals

**Goals:**

- `POST /api/joke` body: `{ "mode": "jp-kr" | "western" }` → `{ "joke": string }`
- 服务端 `DEEPSEEK_API_KEY` 调用 `https://api.deepseek.com/chat/completions`
- 生成页请求 API 后跳转结果页；错误可重试
- 本地 `npm run dev` 通过 Vite 中间件复用同一 handler（无需强制安装 Vercel CLI）

**Non-Goals:**

- 日韩表单、彩虹条、氛围控件（后续 change）
- 流式输出、sassy UI
- Pinia 全局状态（`sessionStorage` 传递笑话正文）

## Decisions

### 1. 共享 handler：`server/joke.ts`

Vercel `api/joke.ts` 与 Vite `configureServer` 均调用 `generateJoke(body)`，避免双份逻辑。

### 2. 模型与 thinking

- 模型固定 `deepseek-v4-flash`
- `thinking: { type: "disabled" }` 以降低延迟（笑话生成属轻量任务）

### 3. Prompt 占位

| mode | 行为 |
|------|------|
| `western` | 英文单条笑话，冷热随机 |
| `jp-kr` | 中文笑话；对象/年龄/冷热/氛围用合理默认值，待 `jp-kr-joke-mode` 扩展 body 字段 |

### 4. 结果传递

`sessionStorage` key `joke:last` 存正文；`/result?mode=` 保留模式 query。

### 5. 本地开发

Vite 插件挂载 `POST /api/joke`；可选 `npx vercel dev` 全栈验证。`.env` 由 Vite `loadEnv` 注入 `process.env` 于 dev 中间件。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| Key 未配置 | 返回 500 + 明确错误信息 |
| DeepSeek 限流/失败 | 502 + 日志；前端展示错误 |
| 笑话过长 | `max_tokens` 限制；只取 assistant content |
