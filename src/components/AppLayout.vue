<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  emoji?: string
  title: string
  subtitle?: string
}>()

const BLOB_POOL = [
  '😜', '🤪', '😝', '😛', '😏', '😈', '👻', '💀', '🤡', '🥴',
  '😵', '🤯', '🫠', '😤', '😎', '🥸', '👾', '🤖', '👽', '🐸',
  '🦧', '🐒', '🫣', '🥶', '🔥',
]

const BLOB_CLASSES = ['blob--a', 'blob--b', 'blob--c'] as const

const blobEmojis = ref<string[]>(['🎭', '🔥', '😏'])

function shufflePick(n: number): string[] {
  const shuffled = [...BLOB_POOL].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

onMounted(() => {
  blobEmojis.value = shufflePick(3)
})
</script>

<template>
  <div class="page">
    <div class="page__blobs" aria-hidden="true">
      <span
        v-for="(emoji, i) in blobEmojis"
        :key="i"
        class="blob"
        :class="BLOB_CLASSES[i]"
      >{{ emoji }}</span>
    </div>
    <main class="page__main card">
      <p v-if="emoji" class="page__emoji">{{ emoji }}</p>
      <h1 class="page__title">{{ title }}</h1>
      <p v-if="subtitle" class="page__subtitle">{{ subtitle }}</p>
      <slot />
    </main>
  </div>
</template>
