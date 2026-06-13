## Why

骨架应用仅有 501 占位 API 与假数据流程，无法生成真实笑话。需要同源 `/api/joke` 代理 DeepSeek-v4-flash，Key 仅存服务端，为后续日韩/欧美 prompt 细化提供基础。

## What Changes

- 实现 `api/joke.ts`：校验 `POST` 请求体 `mode`，调用 DeepSeek Chat Completions（`deepseek-v4-flash`）
- 抽取 `server/` 共享生成逻辑，供 Vercel 与 Vite 开发中间件复用
- 新增前端 `fetchJoke` 封装；生成页调用 API，结果页展示返回文本
- 更新 `.env.example`、README（本地 `vercel dev` / Vite 代理说明）
- 本阶段 prompt 使用模式级默认参数；完整表单留给 `jp-kr-joke-mode` / `western-joke-mode`

## Capabilities

### New Capabilities

- `deepseek-joke-api`: 服务端 DeepSeek 封装、请求/响应约定、前端 fetch 层

### Modified Capabilities

- `joke-app-shell`: API 路由从 501 占位改为真实笑话生成；环境变量为必填（服务端）

## Impact

- `api/joke.ts`、`server/*`、`src/services/jokeApi.ts`
- `src/views/GeneratingView.vue`、`ResultView.vue`
- `vite.config.ts`（开发时代理 `/api/joke`）
- `README.md`、`.env.example`
