import { generateJoke, parseJokeBody } from '../server/joke.js'

type VercelRequest = {
  method?: string
  body?: unknown
}

type VercelResponse = {
  status: (code: number) => { json: (body: object) => void }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const parsed = parseJokeBody(req.body ?? {})
  if ('status' in parsed) {
    res.status(parsed.status).json({ error: parsed.error })
    return
  }

  const result = await generateJoke(parsed)
  if ('status' in result) {
    res.status(result.status).json({ error: result.error })
    return
  }

  res.status(200).json({ joke: result.joke })
}
