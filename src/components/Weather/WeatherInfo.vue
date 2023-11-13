<script setup lang="ts">
import { defineProps } from 'vue'
import type { ApiResponse } from '@/types/weather.response'

// Define the type for weatherInfo
const { weatherInfo, weatherIcon } = defineProps<{
  weatherInfo: ApiResponse;
  weatherIcon: string;
}>()
</script>

<template>
  <div data-test="weatherInfo" class="weather-box__country" v-if="weatherInfo && weatherInfo?.weather">
    <h2 class="weather-box__city">{{ weatherInfo?.name }}, {{ weatherInfo?.sys?.country || 'Unknown' }}</h2>
    <div class="weather-box__desc">{{ weatherInfo?.weather[0]?.main }}</div>
    <div class="weather-box__desc">{{ weatherInfo?.weather[0]?.description }}</div>
    <img :src="weatherIcon" alt="weather" class="weather-box__img" />
  </div>
</template>

<style scoped>
.weather-box__country {
  padding-top: 15px;
}

.weather-box__city {
  color: var(--text-color);
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 1px var(--text-shadow-color);
  text-transform: var(--uppercase-text);
  padding: 10px 0;
}

.weather-box__desc {
  color: var(--text-color);
  font-size: var(--temp-desc-font-size);
  font-weight: 300;
  font-style: italic;
  text-align: center;
  text-transform: capitalize;
}

.weather-box__img {
  margin: 0.6em 0 0 0;
  width: 6.2em;
  display: inline-block;
}
</style>
