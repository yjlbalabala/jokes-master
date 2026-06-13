import type { Atmosphere } from '../types/joke'

export const ATMOSPHERE_OPTIONS: { value: Atmosphere; label: string; hint: string }[] = [
  { value: 'cold', label: '❄️ 冷', hint: '整体氛围冷淡' },
  { value: 'medium', label: '😐 中', hint: '整体氛围平淡' },
  { value: 'hot', label: '🔥 热', hint: '整体氛围火热' },
]
