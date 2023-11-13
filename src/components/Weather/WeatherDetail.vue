<script setup lang="ts">
import { defineProps } from 'vue'
import WeatherInfo from './WeatherInfo.vue'
import TemperatureInfo from './TemperatureInfo.vue'
import Spinner from '@/components/Spinner/Spinner.vue'
import type { ApiResponse } from '@/types/weather.response'

// Define the type for props
const { weatherInfo, errorMessage, weatherIcon, isLoading } = defineProps<{
  weatherInfo: ApiResponse | undefined
  errorMessage: string
  weatherIcon: string
  isLoading: boolean
}>()
</script>

<template>
  <!-- Weather box section -->
  <section class="weather-box" data-test="weatherBox">
    <div v-if="weatherInfo">
      <!-- Location information -->
      <WeatherInfo :weatherInfo="weatherInfo" :weatherIcon="weatherIcon" />
      <!-- Weather data -->
      <TemperatureInfo :temperatureInfo="weatherInfo.main" />
    </div>
    <Spinner class="spinner" v-if="isLoading" />
    <div class="weather-box__no-result">{{ errorMessage }}</div>
  </section>
</template>

<style scoped>
.weather-box {
  text-align: center;
  background-color: var(--background-color);
  border-bottom-left-radius: var(--box-radius);
  border-bottom-right-radius: var(--box-radius);
  padding-bottom: var(--main-padding);
  background-image: var(--gradient);
}

.weather-box__no-result {
  font-weight: var(--temp-info-text-weight);
  color: var(--text-color);
  padding-top: 20px;
}
</style>
