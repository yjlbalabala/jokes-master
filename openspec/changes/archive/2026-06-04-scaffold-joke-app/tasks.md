## 1. Project bootstrap

- [x] 1.1 Initialize Vite + Vue 3 + TypeScript at repo root (`vue-ts` template), preserving existing `openspec/` and `.cursor/`
- [x] 1.2 Install `vue-router@4` and wire `src/router/index.ts` with history mode
- [x] 1.3 Add minimal `src/assets/base.css` and import in `main.ts`
- [x] 1.4 Add `.gitignore` entries for `node_modules`, `dist`, `.env` if not present

## 2. Pages and navigation

- [x] 2.1 Create `HomeView.vue` with 日韩 / 欧美 mode buttons and placeholder copy
- [x] 2.2 Create `GeneratingView.vue` reading `mode` from route query; show placeholder loading UI
- [x] 2.3 Create `ResultView.vue` with placeholder joke text and「返回首页」action
- [x] 2.4 Register routes `/`, `/generating`, `/result` in router and `App.vue` with `<RouterView />`
- [x] 2.5 Implement mock flow: home → generating (with `?mode=`) → result → home (button or timed navigation)

## 3. API and deployment scaffold

- [x] 3.1 Add `api/joke.ts` (or `.js`) returning HTTP 501 JSON `{ error: "Not implemented" }`
- [x] 3.2 Add `vercel.json` for SPA fallback and `api/` routing
- [x] 3.3 Add `.env.example` with `DEEPSEEK_API_KEY=` comment for server-side use in a later change
- [x] 3.4 Add README: `npm run dev`, `npm run build`, Vercel deploy notes

## 4. Verification

- [x] 4.1 Run `npm run build` and confirm success
- [x] 4.2 Manually verify all three routes and mode query on generating page
