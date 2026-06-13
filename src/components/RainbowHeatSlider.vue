<script setup lang="ts">
const heat = defineModel<number>({ required: true })
</script>

<template>
  <div class="heat-field">
    <div class="heat-field__head">
      <label for="heat">笑话冷热</label>
      <span class="heat-field__value">{{ heat }}</span>
    </div>
    <input
      id="heat"
      v-model.number="heat"
      class="heat-slider"
      type="range"
      min="0"
      max="100"
      step="1"
    />
    <div class="heat-field__labels">
      <span>冷笑话</span>
      <span>热笑话</span>
    </div>
  </div>
</template>
