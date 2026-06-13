import type { JokeRequestBody } from '../types/joke'

export async function fetchJoke(body: JokeRequestBody): Promise<string> {
  const response = await fetch('/api/joke', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const text = await response.text()
  let data: { joke?: string; error?: string }
  try {
    data = text ? (JSON.parse(text) as { joke?: string; error?: string }) : {}
  } catch {
    throw new Error(
      response.ok
        ? 'Invalid JSON from server'
        : `Request failed (${response.status}): ${text.slice(0, 120) || 'empty response'}`,
    )
  }

  if (!response.ok) {
    throw new Error(data.error ?? `Request failed (${response.status})`)
  }

  if (!data.joke?.trim()) {
    throw new Error('Empty joke in response')
  }

  return data.joke.trim()
}
