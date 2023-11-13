// Define a type for the 'coord' property in the API response
interface Coord {
  lon: number // Longitude
  lat: number // Latitude
}

// Define a type for the 'weather' property in the API response
interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

// Define a type for the 'main' property in the API response
export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

// Define a type for the 'wind' property in the API response
interface Wind {
  speed: number
  deg: number
}

// Define a type for the 'clouds' property in the API response
interface Clouds {
  all: number
}

// Define a type for the 'sys' property in the API response
interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

// Define the main type representing the entire API response
export interface ApiResponse {
  coord: Coord // Coordinates
  weather: Weather[] // Weather information
  base: string
  main: Main // Main weather details
  visibility: number
  wind: Wind // Wind information
  clouds: Clouds // Cloud coverage information
  dt: number // Time of data calculation
  sys: Sys // System information
  timezone: number // Timezone
  id: number // City ID
  name: string // City name
  cod: number // Internal parameter
}