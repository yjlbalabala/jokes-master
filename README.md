# 笑话生成器

Vite + Vue 3 应用，通过同源 `POST /api/joke` 代理 [DeepSeek](https://api.deepseek.com)（模型 `deepseek-v4-flash`）生成笑话。

## 环境变量

复制 `.env.example` 为 `.env`，填入 DeepSeek 控制台申请的 API Key：

```bash
DEEPSEEK_API_KEY=sk-...
```

Key **仅用于服务端**，不会打包进前端。

## 本地开发

```bash
npm install
npm run dev
```

- 前端由 Vite 提供；`POST /api/joke` 由 Vite 开发中间件处理（与 `server/joke.ts` 逻辑一致）。
- 未配置 `DEEPSEEK_API_KEY` 时，生成页会显示 500 类错误提示。

可选：安装 [Vercel CLI](https://vercel.com/docs/cli) 后运行 `npx vercel dev`，同时验证静态站与 `api/joke.ts` serverless。

## 构建

```bash
npm run build
npm run preview
```

## 部署（Vercel）

1. 将仓库导入 [Vercel](https://vercel.com)。
2. 使用根目录 `vercel.json`（`npm run build` → `dist`）。
3. **Settings → Environment Variables** 添加 `DEEPSEEK_API_KEY`，对所有环境生效后 **Redeploy**。
4. 访问站点：选模式 → 生成页调用 API → 结果页展示笑话。

## API

`POST /api/joke`

请求：

```json
{ "mode": "jp-kr" }
```

或 `{ "mode": "western" }`。

成功 `200`：

```json
{ "joke": "..." }
```

错误示例：`400` 参数错误、`500` 未配置 Key、`502` DeepSeek 上游失败。
