## 1. Server

- [x] 1.1 Add `server/deepseek.ts` and `server/joke.ts` (prompts, `generateJoke`, DeepSeek fetch)
- [x] 1.2 Replace `api/joke.ts` with POST handler using shared logic
- [x] 1.3 Vite dev middleware for `POST /api/joke` + `loadEnv` for `DEEPSEEK_API_KEY`

## 2. Frontend

- [x] 2.1 Add `src/services/jokeApi.ts` (`fetchJoke`)
- [x] 2.2 Update `GeneratingView.vue` to call API, handle loading/error
- [x] 2.3 Update `ResultView.vue` to read stored joke from API

## 3. Docs and verify

- [x] 3.1 Update `.env.example` and README (env, local API, Vercel)
- [x] 3.2 Run `npm run build` successfully
