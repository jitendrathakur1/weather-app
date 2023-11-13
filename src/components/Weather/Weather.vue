<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { executeRequest, type RequestCustom } from '@/utils/executeRequest'
import type { ApiResponse } from '@/types/weather.response'
import Search from '../Search/Search.vue'
import WeatherDetail from '../Weather/WeatherDetail.vue'

//const location = ref('')
const isLoading = ref(false)
const weather = ref<ApiResponse | undefined>()
const weatherIcon = ref('')
const errorMessage = ref('')

const { size, isSearchActive, defaultCity } = defineProps({
  size: {
    type: String as () => 'small' | 'medium' | 'larg',
    default: 'small' // Assuming you want a default value for size
  },
  isSearchActive: {
    type: Boolean,
    default: true
  },
  defaultCity: {
    type: String,
    default: 'Copenhagen'
  }
})

// Call getLocation function on component mount
onMounted(async () => {
  await getLocationWeather({ key: 'Enter' })
})

/**
 * Handles the logic to fetch location data when the 'Enter' key is pressed.
 * @param e - The event object.
 */
async function getLocationWeather(e: any) {
  // Check if the 'Enter' key is pressed
  if (e?.key !== 'Enter') {
    return
  }

  // Extract the location from the target input value
  const locationInput = e?.target?.value ? e.target.value : defaultCity
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const appID = import.meta.env.VITE_APP_ID

  // Construct the request URL for weather data
  const weatherRequestUrl = `${apiBaseUrl}/data/2.5/weather?q=${locationInput}&appid=${appID}`

  // Define the request options
  const weatherRequestOptions: RequestCustom = {
    url: weatherRequestUrl,
    method: 'GET'
  }

  try {
    isLoading.value = true
    // Make the request to fetch weather data and wait for the response
    const weatherResponse = await executeRequest<ApiResponse>(weatherRequestOptions)
    weather.value = weatherResponse as ApiResponse
    weatherIcon.value = `${apiBaseUrl}/img/w/${weather.value.weather[0]?.icon}.png`
    errorMessage.value = ''
  } catch (weatherError) {
    // Handle the error as needed for weather data
    weather.value = undefined
    errorMessage.value = 'City not found'
    console.error(weatherError)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <!-- Main weather container -->
  <article
    :class="`weather ${
      size === 'small'
        ? 'weather-small'
        : size === 'medium'
        ? 'weather-medium'
        : size === 'larg'
        ? 'weather-larg'
        : 'larg'
    }`"
  >
    <!-- Search component -->
    <Search v-if="isSearchActive" placeholder="Search city" @keypressHanlder="getLocationWeather" />

    <!-- WeatherDetail section -->
    <WeatherDetail
      :weatherInfo="weather"
      :isLoading="isLoading"
      :errorMessage="errorMessage"
      :weatherIcon="weatherIcon"
    />
  </article>
</template>

<style scoped>
.weather {
  padding: var(--main-padding);
  width: var(--box-width);
  margin: var(--margin-auto);
}
.weather-small {
  width: 30%;
}

.weather-medium {
  width: 60%;
}

.weather-larg {
  width: 100%;
}
</style>
