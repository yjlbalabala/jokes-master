import { chatCompletion } from './deepseek.js'
import { buildMessages } from './prompts.js'
import type { Atmosphere, JokeFailure, JokeRequestBody, JokeSuccess } from './types.js'

function isJokeMode(value: unknown): value is JokeRequestBody['mode'] {
  return value === 'jp-kr' || value === 'western'
}

function isAtmosphere(value: unknown): value is Atmosphere {
  return value === 'cold' || value === 'medium' || value === 'hot'
}

function parseJpKrFields(raw: Record<string, unknown>): JokeRequestBody | JokeFailure {
  const target = raw.target
  if (typeof target !== 'string' || !target.trim()) {
    return { error: 'Invalid target: required non-empty string', status: 400 }
  }

  const age = raw.age
  if (typeof age !== 'number' || !Number.isFinite(age) || age < 1 || age > 120) {
    return { error: 'Invalid age: expected number between 1 and 120', status: 400 }
  }

  const heat = raw.heat
  if (typeof heat !== 'number' || !Number.isFinite(heat) || heat < 0 || heat > 100) {
    return { error: 'Invalid heat: expected number between 0 and 100', status: 400 }
  }

  const atmosphere = raw.atmosphere
  if (!isAtmosphere(atmosphere)) {
    return { error: 'Invalid atmosphere: expected "cold", "medium", or "hot"', status: 400 }
  }

  return {
    mode: 'jp-kr',
    target: target.trim(),
    age: Math.round(age),
    heat: Math.round(heat),
    atmosphere,
  }
}

export function parseJokeBody(raw: unknown): JokeRequestBody | JokeFailure {
  if (!raw || typeof raw !== 'object') {
    return { error: 'Request body must be JSON object', status: 400 }
  }

  const record = raw as Record<string, unknown>
  const mode = record.mode
  if (!isJokeMode(mode)) {
    return { error: 'Invalid mode: expected "jp-kr" or "western"', status: 400 }
  }

  if (mode === 'western') {
    return { mode: 'western' }
  }

  return parseJpKrFields(record)
}

export async function generateJoke(body: JokeRequestBody): Promise<JokeSuccess | JokeFailure> {
  const apiKey = process.env.DEEPSEEK_API_KEY?.trim()
  if (!apiKey) {
    return { error: 'Server misconfigured: DEEPSEEK_API_KEY is not set', status: 500 }
  }

  const { system, user } = buildMessages(body)

  try {
    const joke = await chatCompletion(apiKey, system, user)
    return { joke }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to generate joke'
    return { error: message, status: 502 }
  }
}
