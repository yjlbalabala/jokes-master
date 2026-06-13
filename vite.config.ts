import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { generateJoke, parseJokeBody } from './server/joke'

function apiJokeDevPlugin(): Plugin {
  return {
    name: 'api-joke-dev',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0] ?? ''
        if (pathname !== '/api/joke' && pathname !== '/api/joke/') {
          next()
          return
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
          }
          const raw = chunks.length ? JSON.parse(chunks.join('')) : {}
          const parsed = parseJokeBody(raw)
          if ('status' in parsed) {
            res.statusCode = parsed.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: parsed.error }))
            return
          }

          const result = await generateJoke(parsed)
          if ('status' in result) {
            res.statusCode = result.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: result.error }))
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ joke: result.joke }))
        } catch {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Internal server error' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.DEEPSEEK_API_KEY) {
    process.env.DEEPSEEK_API_KEY = env.DEEPSEEK_API_KEY
  }

  return {
    plugins: [vue(), apiJokeDevPlugin()],
  }
})
