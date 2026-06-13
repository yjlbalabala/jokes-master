import type { Atmosphere, JokeRequestBody } from './types.js'

const ATMOSPHERE_TEXT: Record<Atmosphere, string> = {
  cold: '冷淡',
  medium: '平淡',
  hot: '火热',
}

function heatLabel(heat: number): string {
  if (heat <= 20) return '很冷（偏冷笑话）'
  if (heat <= 40) return '偏冷'
  if (heat <= 60) return '中等'
  if (heat <= 80) return '偏热'
  return '很热（偏火辣/劲爆）'
}

const SYSTEM_PROMPT =
  '你是中文脱口秀写手。只输出笑话正文，必须使用简体中文，不要标题、不要引号、不要解释、不要英文。'

export function buildMessages(body: JokeRequestBody): { system: string; user: string } {
  if (body.mode === 'western') {
    return {
      system: SYSTEM_PROMPT,
      user:
        '用户选择了「随机模式」：不需要观众身份、年龄等设定。请自行随机决定笑话的冷热程度和氛围风格，自由发挥。写一条中文笑话，不要太长。',
    }
  }

  const target = body.target ?? '朋友'
  const age = body.age ?? 20
  const heat = body.heat ?? 50
  const atmosphere = body.atmosphere ?? 'medium'

  return {
    system: SYSTEM_PROMPT,
    user: `用户选择了「定制模式」——根据以下观众设定写一条中文笑话：
- 讲给「${target}」听
- 讲笑话的人年龄：${age} 岁
- 笑话冷热（0=很冷，100=很热）：${heat}，当前档次「${heatLabel(heat)}」
- 整体氛围：${ATMOSPHERE_TEXT[atmosphere]}（${atmosphere === 'cold' ? '冷淡' : atmosphere === 'hot' ? '火热' : '平淡'}）
一条即可，不要太长。`,
  }
}
