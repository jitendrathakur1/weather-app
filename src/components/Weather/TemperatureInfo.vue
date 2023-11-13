<script setup lang="ts">
import { defineProps } from 'vue'
import type { Main } from '@/types/weather.response'

// Define the type for temperatureInfo
const { temperatureInfo } = defineProps<{
  temperatureInfo: Main;
}>()
</script>

<template>
  <div class="weather-box__data" data-test="temperatureInfo">
    <div class="weather-box__temp">{{ temperatureInfo?.temp }}&#176;</div>
    <div class="weather-box__temp-desc">
      <div class="weather-box__temp-info">
        <div class="weather-box__temp-label">Min</div>
        <div class="weather-box__temp-value">{{ temperatureInfo?.temp_min }} &#176;</div>
      </div>
      <div class="weather-box__temp-info">
        <div class="weather-box__temp-label">Max</div>
        <div class="weather-box__temp-value">{{ temperatureInfo?.temp_max }} &#176;</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-box__data {
  height: 30%;
  width: 100%;
}

.weather-box__temp {
  display: inline-block;
  color: var(--text-color);
  font-size: var(--temp-font-size);
  font-weight: 900;
  text-shadow: 3px 2px var(--text-shadow-color);
}

.weather-box__temp-desc {
  display: flex;
  justify-content: center;
}

.weather-box__temp-desc div {
  padding: var(--temp-info-padding);
}
.weather-box__temp-desc .weather-box__temp-info:first-child {
  border-right: var(--temp-info-border);
}
.weather-box__temp-label,
.weather-box__temp-value {
  font-weight: var(--temp-info-text-weight);
  color: var(--text-color);
}
</style>
