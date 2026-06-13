## Context

绿地项目，无既有前端代码。全栈笑话应用将使用 Vite + Vue 3，按 5 个 OpenSpec change 迭代。本 change 仅交付可运行的空壳应用与三页导航，为 API 与业务模式 change 提供稳定挂载点。

## Goals / Non-Goals

**Goals:**

- 在仓库根目录（或统一的 `frontend/` 目录，见决策）初始化 Vite + Vue 3 + TypeScript 项目
- 配置 Vue Router：`/` 首页、`/generating` 生成中、`/result` 结果
- 首页展示日韩 / 欧美模式选择；点击后导航至生成页（mock 流程，不调用 API）
- 生成页可自动或按钮跳转结果页；结果页可返回首页
- 提供 `.env.example`（仅文档化未来 `DEEPSEEK_API_KEY` 等变量，本 change 不读取）
- 提供 Vercel 静态 + `api/` 目录占位（返回 501 JSON），便于下一 change 填充
- `npm run dev` / `npm run build` 可成功执行

**Non-Goals:**

- DeepSeek API 集成、serverless 真实代理逻辑
- 日韩表单、彩虹条、氛围控件的业务实现
- 骚气 UI 终稿（`sassy-ui-theme` change）
- 生产环境密钥配置与 CI

## Decisions

### 1. 应用目录：仓库根目录作为 Vite 项目根

**选择**：在仓库根运行 `npm create vite@latest .`（或等价脚手架），不额外嵌套 `frontend/`。

**理由**：单应用仓库，减少路径层级；Vercel 默认识别根目录 `dist` 与 `api/`。

**备选**：`frontend/` 子目录——适合 monorepo，当前不需要。

### 2. TypeScript + Vue Router

**选择**：Vite 模板 `vue-ts`；使用 `vue-router@4` history 模式。

**理由**：与 Vite 生态一致；路由清晰对应三页结构。

**备选**：无 Router、单组件状态机——页面增多后可维护性差。

### 3. 跨页状态：query 参数占位

**选择**：导航时通过 `?mode=jp-kr|western` 传递模式；结果页用 query 或静态占位文案。

**理由**：本 change 无 Pinia 需求；后续 change 可升级为 composable / store。

### 4. 部署：Vercel 优先

**选择**：添加 `vercel.json`：`buildCommand` / `outputDirectory`，并将 `/api/*` 指向 `api/` 目录；`api/joke.ts`（或 `.js`）返回 `{ "error": "Not implemented" }` 与 HTTP 501。

**理由**：与 config 中「静态 + serverless 同仓」一致；Cloudflare 可在后续文档补充。

### 5. 样式：最小全局 CSS

**选择**：`src/assets/base.css` 仅 reset + 布局占位，不引入 Tailwind。

**理由**：视觉终稿留给 `sassy-ui-theme`；避免过早锁定 AI 模板审美。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| 根目录初始化与现有 `openspec/`、`.cursor/` 文件共存 | 脚手架时排除已有目录；不覆盖 `openspec/` |
| History 模式在部分静态托管需 fallback | `vercel.json` 配置 SPA rewrite；README 说明 |
| 占位 API 被误当作可用 | 明确 501 响应与 README；下一 change 替换实现 |
| 过早引入 Pinia/大量依赖 | 本 change 仅 vue + vue-router |

## Migration Plan

1. 本地 `npm install` → `npm run dev` 验证三页导航
2. `npm run build` 产出 `dist/`
3. 连接 Vercel 项目，配置环境变量占位说明（无需真实 Key）
4. 无数据迁移；失败可删除生成文件回滚 git

## Open Questions

- 无阻塞项。日韩表单字段布局在 `jp-kr-joke-mode` 中定义。
