<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import { JOKE_REQUEST_KEY, JOKE_STORAGE_KEY } from '../constants'
import type { JokeRequestBody } from '../types/joke'

const router = useRouter()

const joke = ref<string | null>(null)
const effect = ref<'ice' | 'fire' | 'thunder' | null>(null)
const heat = ref(50)

function readHeat(): number {
  const raw = sessionStorage.getItem(JOKE_REQUEST_KEY)
  if (!raw) return 50
  try {
    const body = JSON.parse(raw) as JokeRequestBody
    if (body.mode === 'western') return Math.round(Math.random() * 100)
    return typeof body.heat === 'number' ? body.heat : 50
  } catch {
    return 50
  }
}

const emojiReaction = computed(() => {
  if (heat.value <= 20) return '🥶❄️🧊'
  if (heat.value <= 40) return '😏🫢🤭'
  if (heat.value <= 60) return '😆😂🤣'
  if (heat.value <= 80) return '🔥🥵😈'
  return '🌋🔥💀'
})

const layoutEmoji = computed(() => {
  if (!joke.value) return '🎉'
  if (heat.value <= 20) return '🥶'
  if (heat.value <= 40) return '😏'
  if (heat.value <= 60) return '😂'
  if (heat.value <= 80) return '🔥'
  return '💀'
})

const ICE_PARTICLES = ['❄️', '🧊', '❄️', '⛄', '❄️', '🌨️', '❄️', '🥶']
const FIRE_PARTICLES = ['🔥', '✨', '🔥', '💥', '🔥', '🌟', '🔥', '💫']

function particleStyle(index: number, total: number): Record<string, string> {
  const left = `${(index / total) * 90 + 5}%`
  const delay = `${Math.random() * 1.2}s`
  const duration = `${2 + Math.random() * 1.5}s`
  return { left, animationDelay: delay, animationDuration: duration }
}

function triggerEffect() {
  if (Math.random() >= 0.35) return // 65% chance: no effect

  const h = heat.value
  if (h <= 30) {
    effect.value = Math.random() < 0.5 ? 'ice' : 'thunder'
  } else if (h >= 70) {
    effect.value = 'fire'
  } else {
    const roll = Math.random()
    effect.value = roll < 0.33 ? 'ice' : roll < 0.66 ? 'fire' : 'thunder'
  }

  // Clear effect after animation finishes
  setTimeout(() => { effect.value = null }, 3200)
}

onMounted(() => {
  const stored = sessionStorage.getItem(JOKE_STORAGE_KEY)
  if (stored) {
    joke.value = stored
    heat.value = readHeat()
    // Small delay so the card is rendered before effect kicks in
    setTimeout(() => triggerEffect(), 400)
    return
  }
  void router.replace('/')
})

function goHome() {
  sessionStorage.removeItem(JOKE_STORAGE_KEY)
  sessionStorage.removeItem(JOKE_REQUEST_KEY)
  router.push('/')
}
</script>

<template>
  <!-- Special effects overlay -->
  <div v-if="effect" class="effect-overlay" :class="`effect--${effect}`" aria-hidden="true">
    <template v-if="effect === 'ice'">
      <span
        v-for="(emoji, i) in ICE_PARTICLES"
        :key="i"
        class="effect-particle"
        :style="particleStyle(i, ICE_PARTICLES.length)"
      >{{ emoji }}</span>
    </template>
    <template v-if="effect === 'fire'">
      <span
        v-for="(emoji, i) in FIRE_PARTICLES"
        :key="i"
        class="effect-particle"
        :style="particleStyle(i, FIRE_PARTICLES.length)"
      >{{ emoji }}</span>
    </template>
  </div>

  <AppLayout :emoji="layoutEmoji" title="笑果出炉" :subtitle="effect === 'ice' ? '冷到发抖…' : effect === 'fire' ? '热辣来袭！' : effect === 'thunder' ? '雷到炸裂⚡' : '不满意？回首页再来一条'">
    <p v-if="joke" class="joke-text" :class="{ card: !!effect }">{{ joke }}</p>
    <p v-else class="placeholder">加载中…</p>
    <p v-if="joke" class="emoji-reaction">{{ emojiReaction }}</p>
    <button type="button" class="btn btn--secondary" @click="goHome">
      {{ effect === 'ice' ? '🥶 太冷了，换一条' : effect === 'fire' ? '🔥 太辣了，换一条' : effect === 'thunder' ? '⚡ 雷到了，换一条' : '🔄 返回首页' }}
    </button>
  </AppLayout>
</template>
