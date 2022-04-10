<script setup lang="ts">
import type { WeatherIconsDay, WeatherIconsNight } from '@/types/open-weather-types'

type WeatherTypes = 'ClearSky' | 'ClearSkyNight' | 'FewClouds' | 'FewCloudsNight' | 'ScatteredClouds' | 'BrokenClouds' | 'ShowerRain' | 'Rain' | 'Thunderstorm' | 'Snow' | 'Mist'

const props = defineProps<{ weatherIcon: WeatherIconsDay | WeatherIconsNight }>()

const weatherType = computed<WeatherTypes>(() => {
  switch (props.weatherIcon) {
    case '01d':
      return 'ClearSky'
    case '01n':
      return 'ClearSkyNight'
    case '02d':
      return 'FewClouds'
    case '02n':
      return 'FewCloudsNight'
    case '03d': case '03n':
      return 'ScatteredClouds'
    case '04d': case '04n':
      return 'BrokenClouds'
    case '09d': case '09n':
      return 'ShowerRain'
    case '10d': case '10n':
      return 'Rain'
    case '11d': case '11n':
      return 'Thunderstorm'
    case '13d': case '13n':
      return 'Snow'
    case '50d': case '50n':
      return 'Mist'
    default: return 'ClearSky'
  }
})

</script>

<template>
  <icon:mdi:weather-sunny v-if="weatherType === 'ClearSky'" />
  <icon:mdi:weather-night v-else-if="weatherType === 'ClearSkyNight'" />
  <icon:mdi:weather-partly-cloudy v-else-if="weatherType === 'FewClouds'" />
  <icon:mdi:weather-night-partly-cloudy v-else-if="weatherType === 'FewCloudsNight'" />
  <icon:mdi:weather-cloudy v-else-if="weatherType === 'ScatteredClouds'" />
  <icon:mdi:weather-cloudy v-else-if="weatherType === 'BrokenClouds'" />
  <icon:mdi:weather-pouring v-else-if="weatherType === 'ShowerRain'" />
  <icon:mdi:weather-rainy v-else-if="weatherType === 'Rain'" />
  <icon:mdi:weather-lightning v-else-if="weatherType === 'Thunderstorm'" />
  <icon:mdi:weather-snowy v-else-if="weatherType === 'Snow'" />
  <icon:mdi:weather-fog v-else-if="weatherType === 'Mist'" />
</template>
