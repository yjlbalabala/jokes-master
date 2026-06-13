<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import { JOKE_REQUEST_KEY, JOKE_STORAGE_KEY } from '../constants'
import { fetchJoke } from '../services/jokeApi'
import type { JokeMode, JokeRequestBody } from '../types/joke'

const route = useRoute()
const router = useRouter()

const LOADING_MESSAGES = [
  'DeepSeek 正在憋笑，请稍候… 😤',
  '正在搜肠刮肚编段子… 🤪',
  '笑话正在路上，别催！😝',
  'AI 脑洞大开中… 🧠💥',
  '酝酿笑果，马上就好… 😏',
  '灵光一闪，段子马上出炉 ✨',
  '正在榨干 AI 的幽默细胞… 🧬',
  '稳住，笑点正在加载… 🎯',
]

const GENERATING_EMOJIS = ['⏳', '🤔', '🧠', '💭', '🫧', '🤖', '✨', '🌀']

const loading = ref(true)
const error = ref<string | null>(null)
const loadingMessage = ref(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)])
const genEmoji = ref(GENERATING_EMOJIS[Math.floor(Math.random() * GENERATING_EMOJIS.length)])

const mode = computed(() => route.query.mode as string | undefined)

const modeLabel = computed(() => {
  if (mode.value === 'jp-kr') return '定制模式'
  if (mode.value === 'western') return '随机模式'
  return '未知模式'
})

function readRequestBody(): JokeRequestBody | null {
  const raw = sessionStorage.getItem(JOKE_REQUEST_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as JokeRequestBody
  } catch {
    return null
  }
}

async function runGeneration() {
  const body = readRequestBody()
  if (!body || body.mode !== mode.value) {
    error.value = '缺少生成参数，请从首页重新开始'
    loading.value = false
    return
  }

  loading.value = true
  error.value = null
  loadingMessage.value = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]

  try {
    const joke = await fetchJoke(body)
    sessionStorage.setItem(JOKE_STORAGE_KEY, joke)
    await router.push({
      path: '/result',
      query: { mode: mode.value as JokeMode },
    })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '生成失败，请重试'
    loading.value = false
  }
}

onMounted(() => {
  void runGeneration()
})
</script>

<template>
  <AppLayout :emoji="genEmoji" title="生成中…" :subtitle="`当前：${modeLabel}`">
    <div v-if="loading && !error" class="loading" aria-busy="true">
      <div class="spinner" />
      <p>{{ loadingMessage }}</p>
    </div>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <button v-if="error" type="button" class="btn btn--cta" @click="runGeneration">重试</button>
  </AppLayout>
</template>
