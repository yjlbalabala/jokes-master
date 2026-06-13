const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'
const MODEL = 'deepseek-v4-flash'

interface ChatCompletionResponse {
  choices?: Array<{
    message?: { content?: string }
  }>
  error?: { message?: string }
}

export async function chatCompletion(
  apiKey: string,
  system: string,
  user: string,
): Promise<string> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      stream: false,
      max_tokens: 512,
      thinking: { type: 'disabled' },
    }),
  })

  const data = (await response.json()) as ChatCompletionResponse

  if (!response.ok) {
    const message = data.error?.message ?? `DeepSeek API error (${response.status})`
    throw new Error(message)
  }

  const content = data.choices?.[0]?.message?.content?.trim()
  if (!content) {
    throw new Error('Empty response from DeepSeek')
  }

  return content
}
