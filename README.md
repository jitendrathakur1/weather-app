# Vue.js Weather App

## Overview

This Vue.js Weather App is a simple and modular application designed to display weather information for a given location. The app includes several components organized in a structured manner to enhance maintainability and scalability. Here's a breakdown of the key components:
```javascript
weather-app/
|-- src/
|   |-- components/
|   |   |-- Search/
|   |   |   |-- Seach.vue
|   |   |-- Spinner/
|   |   |   |-- Spinner.vue
|   |   |-- Weather/
|   |   |   |-- Weather.vue
|   |   |   |-- WeatherDetail.vue
|   |   |   |-- WeatherInfo.vue
|   |   |   |-- TemperatureInfo.vue
|   |
|   |-- css/
|   |   |-- base.css
|   |   |-- app.css
|   |
|   |-- types/
|   |   |-- weather.response.ts
|   |
|   |-- utils/
|   |   |-- executeRequest.ts
|   |
|   |-- App.vue
|   |-- main.ts
|
|-- public/
|   |-- index.html

```

## 1. HomeView.vue.
The primary entry point for the application. This page includes the Weather component.

```javascript
<script setup lang="ts">
import Weather from '../components/Weather/Weather.vue'
</script>

<template>
  <main>
    <Weather />
  </main>
</template>
```

## 2. Weather Component
The Weather component is the core of the application, incorporating the Search, Spinner, and WeatherDetail components.
```javascript
<script setup lang="ts">
import Search from './Search.vue'
import Spinner from './Spinner.vue'
import WeatherDetail from './WeatherDetail.vue'
</script>

<template>
  <div>
    <Search :placeholder="'Enter location...'" :keypressHanlder="handleKeypress" />
    <WeatherDetail />
    <Spinner />
  </div>
</template>

<style scoped>
/* Styles for the Weather component */
</style>
```

## 3. Search Component
The Search component provides a search input bar with dynamic placeholder and emits an event on Enter keypress.

```javascript
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const { placeholder, keypressHanlder } = defineProps(['placeholder', 'keypressHanlder'])
const emits = defineEmits()

const handleKeypress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    emits('keypressHanlder', event)
  }
}
</script>

<template>
  <section class="search-box" data-test="search">
    <input
      type="text"
      name="search"
      id="search"
      class="search-box__search-bar"
      :placeholder="placeholder"
      @keypress="handleKeypress"
    />
  </section>
</template>

<style scoped>
/* Styles for the Search component */
</style>
```

## 4. Spinner Component
The Spinner component displays a loading spinner when the application is in a loading state.

```javascript
<script setup lang="ts"></script>

<template>
  <div class="text-center">
    <!-- SVG-based spinner for indicating loading state -->
  </div>
</template>

<style scoped>
/* Styles for the Spinner component */
</style>
```

## 5. WeatherDetail Component
The WeatherDetail component manages the display of weather information, loading spinner, and error messages.

```javascript
<script setup lang="ts">
import { defineProps } from 'vue'
import WeatherInfo from './WeatherInfo.vue'
import TemperatureInfo from './TemperatureInfo.vue'
import Spinner from '@/components/Spinner/Spinner.vue'
import type { ApiResponse } from '@/types/weather.response'

const { weatherInfo, errorMessage, weatherIcon, isLoading } = defineProps<{
  weatherInfo: ApiResponse | undefined
  errorMessage: string
  weatherIcon: string
  isLoading: boolean
}>()
</script>

<template>
  <section class="weather-box" data-test="weatherBox">
    <!-- Weather information components -->
    <div v-if="weatherInfo">
      <WeatherInfo :weatherInfo="weatherInfo" :weatherIcon="weatherIcon" />
      <TemperatureInfo :temperatureInfo="weatherInfo.main" />
    </div>
    <!-- Loading spinner -->
    <Spinner class="spinner" v-if="isLoading" />
    <!-- Error message -->
    <div class="weather-box__no-result">{{ errorMessage }}</div>
  </section>
</template>

<style scoped>
/* Styles for the WeatherDetail component */
</style>
```

## 6. WeatherInfo Component
The WeatherInfo component displays detailed weather information including city name, weather description, and an icon.

```javascript
<script setup lang="ts">
import { defineProps } from 'vue'
import type { ApiResponse } from '@/types/weather.response'

const { weatherInfo, weatherIcon } = defineProps<{
  weatherInfo: ApiResponse;
  weatherIcon: string;
}>()
</script>

<template>
  <!-- Weather information display -->
  <div class="weather-box__country" v-if="weatherInfo && weatherInfo?.weather">
    <h2 class="weather-box__city">{{ weatherInfo?.name }}, {{ weatherInfo?.sys?.country || 'Unknown' }}</h2>
    <div class="weather-box__desc">{{ weatherInfo?.weather[0]?.main }}</div>
    <div class="weather-box__desc">{{ weatherInfo?.weather[0]?.description }}</div>
    <img :src="weatherIcon" alt="weather" class="weather-box__img" />
  </div>
</template>

<style scoped>
/* Styles for the WeatherInfo component */
</style>
```

## 7. TemperatureInfo Component
The TemperatureInfo component displays temperature information, including current temperature, minimum, and maximum temperature.

```javascript
<script setup lang="ts">
import { defineProps } from 'vue'
import type { Main } from '@/types/weather.response'

const { temperatureInfo } = defineProps<{
  temperatureInfo: Main;
}>()
</script>

<template>
  <!-- Temperature information display -->
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
/* Styles for the TemperatureInfo component */
</style>
```

## Conclusion
This documentation provides a guide to the structure and functionality of the Vue.js Weather App. Developers can refer to this README for an understanding of the application's components, their interactions, and how to extend the functionality further.



# Function Documentation for `executeRequest`
## Overview

The executeRequest function is a utility for making HTTP requests with enhanced options. It provides a convenient way to perform custom requests with options beyond the standard fetch API. This documentation outlines the usage and details of the executeRequest function.

## Function Signature
```javascript
/**
 * Custom request options that extend the standard RequestInit.
 */
export type RequestCustom = RequestInit & {
  url: string
  headers?: Headers
}

/**
 * Executes a custom HTTP request with enhanced options.
 * @param options - Custom request options.
 * @returns A Promise containing the response data or an error.
 */
export async function executeRequest<T>({
  url,
  method = 'GET',
  headers = new Headers(),
  body = null,
}: RequestCustom): Promise<T | string | undefined> {
  // Implementation details...
}
```

## Usage

### Parameters
1. `options (RequestCustom)`: An object containing custom options for the HTTP request. It extends the standard `RequestInit` interface and includes the following properties:
    1) `url (string):` The URL for the HTTP request.
    2) `method (string):` The HTTP method for the request (default is 'GET').
    3) `headers (Headers):` Custom headers for the request.
    4) `body (BodyInit):` The request payload.

2. A `Promise` that resolves to the response data or rejects with an error. The response data can be of type `T` (specified by the caller), `string`, or `undefined`.

### Example

```javascript
import { executeRequest, RequestCustom } from './path-to-utils';

// Define custom request options
const requestOptions: RequestCustom = {
  url: 'https://api.example.com/data',
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  }),
  body: JSON.stringify({ key: 'value' }),
};

// Execute the request
executeRequest<MyResponseType>(requestOptions)
  .then((responseData) => {
    // Handle successful response
    console.log('Response:', responseData);
  })
  .catch((error) => {
    // Handle errors
    console.error('Error:', error);
  });
```

## Conclusion
The `executeRequest` function is a flexible and extensible utility for making HTTP requests, providing enhanced options and supporting various response formats. Developers can use this function to handle custom request scenarios within their applications.
