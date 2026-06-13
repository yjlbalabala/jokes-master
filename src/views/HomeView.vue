<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import RainbowHeatSlider from '../components/RainbowHeatSlider.vue'
import { JOKE_REQUEST_KEY } from '../constants'
import { ATMOSPHERE_OPTIONS } from '../constants/jpKr'
import type { Atmosphere, JokeRequestBody } from '../types/joke'

const router = useRouter()

const activeTab = ref<'jp-kr' | 'western'>('jp-kr')
const target = ref('朋友')
const age = ref(20)
const heat = ref(50)
const atmosphere = ref<Atmosphere>('medium')
const HOME_EMOJIS = ['🤡', '😈', '🤪', '😎', '🥸', '👽', '🐸', '🦧', '👾', '🤖']

const formError = ref<string | null>(null)
const homeEmoji = ref('🤡')

onMounted(() => {
  homeEmoji.value = HOME_EMOJIS[Math.floor(Math.random() * HOME_EMOJIS.length)]
})

function startWestern() {
  const body: JokeRequestBody = { mode: 'western' }
  sessionStorage.setItem(JOKE_REQUEST_KEY, JSON.stringify(body))
  void router.push({ path: '/generating', query: { mode: 'western' } })
}

function startJpKr() {
  formError.value = null
  if (!target.value) {
    formError.value = '请输入要讲笑话的对象'
    return
  }
  if (!Number.isFinite(age.value) || age.value < 1 || age.value > 120) {
    formError.value = '年龄请在 1–120 之间'
    return
  }

  const body: JokeRequestBody = {
    mode: 'jp-kr',
    target: target.value,
    age: Math.round(age.value),
    heat: heat.value,
    atmosphere: atmosphere.value,
  }
  sessionStorage.setItem(JOKE_REQUEST_KEY, JSON.stringify(body))
  void router.push({ path: '/generating', query: { mode: 'jp-kr' } })
}
</script>

<template>
  <AppLayout
    :emoji="homeEmoji"
    title="笑话大师"
    subtitle="选模式开唠"
  >
    <div class="tabs" role="tablist">
      <button
        type="button"
        role="tab"
        class="tab"
        :class="{ 'tab--active': activeTab === 'jp-kr' }"
        :aria-selected="activeTab === 'jp-kr'"
        @click="activeTab = 'jp-kr'"
      >
🎯 定制模式
      </button>
      <button
        type="button"
        role="tab"
        class="tab"
        :class="{ 'tab--active': activeTab === 'western' }"
        :aria-selected="activeTab === 'western'"
        @click="activeTab = 'western'"
      >
🎲 随机模式
      </button>
    </div>

    <section v-if="activeTab === 'jp-kr'" class="panel">
      <!-- <p class="panel__hint">定制场景再生成——对象、年龄、冷热、氛围都由你定。</p> -->

      <div class="field">
        <label for="target">讲给谁听</label>
        <input
          id="target"
          v-model="target"
          class="input"
          type="text"
          placeholder="比如：死党、闺蜜、老板…"
        />
      </div>

      <div class="field">
        <label for="age">🎂 你的年龄</label>
        <input
          id="age"
          v-model.number="age"
          class="input"
          type="number"
          min="1"
          max="120"
        />
      </div>

      <RainbowHeatSlider v-model="heat" />

      <fieldset class="field field--atmosphere">
        <legend>整体氛围</legend>
        <div class="atmosphere-grid">
          <label
            v-for="opt in ATMOSPHERE_OPTIONS"
            :key="opt.value"
            class="atmosphere-option"
            :class="{ 'atmosphere-option--active': atmosphere === opt.value }"
          >
            <input v-model="atmosphere" type="radio" name="atmosphere" :value="opt.value" />
            <span class="atmosphere-option__label">{{ opt.label }}</span>
            <span class="atmosphere-option__hint">{{ opt.hint }}</span>
          </label>
        </div>
      </fieldset>

      <p v-if="formError" class="error" role="alert">{{ formError }}</p>
      <button type="button" class="btn btn--cta" @click="startJpKr">开唠！生成笑话 ✨</button>
    </section>

    <section v-else class="panel panel--western">
      <!-- <p class="panel__hint">
        随机模式：零表单，冷热和氛围交给 AI 随机，输出仍是<strong>中文</strong>笑话。
      </p> -->
      <button type="button" class="btn btn--cta" @click="startWestern">直接开整 🎲</button>
    </section>
  </AppLayout>
</template>
