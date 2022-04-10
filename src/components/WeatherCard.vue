<script setup lang="ts">
import type { WeatherForecast } from '@/types/open-weather-types'
import type { GeoLocation } from '@/types/geo-location-types'
import { getWindDirection, kmFormatter, toLocaleDate, toLocaleTime } from '@/common/helpers'

const props = defineProps<{ weather: WeatherForecast.WeatherResponse; location: GeoLocation }>()
const { weather } = toRefs(props)

</script>

<template>
  <div class="block p-8 text-white bg-gradient-to-bl to-sky-700 from-sky-500 rounded-lg sm:mx-auto">
    <div class="flex justify-between">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ location.name }}, {{ location.state }}, {{ location.country }}
      </h2>
      <div class="text-right">
        <h5 class="mb-2 text-base tracking-tight uppercase font-bold">
          Actueel weer
        </h5>
        <div class="-mt-2 text-sm">
          {{ toLocaleTime(weather.current.dt, weather.timezone) }}
        </div>
      </div>
    </div>

    <section class="flex flex-row items-center mt-3">
      <div>
        <WeatherIcon class="w-20 h-20" :weather-icon="weather.current.weather[0]?.icon" />
      </div>
      <div class="ml-4">
        <span class="text-6xl">{{ weather.current.temp.toFixed(0) }}</span>
        <span class="text-4xl align-top">&#8451;</span>
      </div>
      <div class="ml-20 flex flex-col justify-evenly">
        <span class="font-bold capitalize">{{ weather.current.weather[0]?.description }}</span>
        <span>Gevoelstemperatuur {{ weather.current.feels_like.toFixed(0) }}°</span>
      </div>
      <div class="flex grow flex-col justify-evenly text-sm gap-y-1">
        <div class="flex items-center justify-end">
          <icon:mdi:weather-sunset-up class="w-6 h-6 mr-2" />
          <span>{{ toLocaleTime(weather.current.sunrise, weather.timezone) }}</span>
        </div>
        <div class="flex items-center justify-end">
          <icon:mdi:weather-sunset-down class="w-6 h-6 mr-2" />
          <span>{{ toLocaleTime(weather.current.sunset, weather.timezone) }}</span>
        </div>
      </div>
    </section>

    <section class="flex flex-row justify-between my-8">
      <div class="">
        <div class="font-light uppercase">
          Wind
        </div>
        <div class="text-base font-semibold">
          {{ weather.current.wind_speed }} m/s
          {{ getWindDirection(weather.current.wind_deg) }}
        </div>
      </div>
      <div class="">
        <div class="font-light uppercase">
          Vochtigheid
        </div>
        <div class="text-base font-semibold">
          {{ weather.current.humidity }} %
        </div>
      </div>
      <div class="">
        <div class="font-light uppercase">
          Zicht
        </div>
        <div class="text-base font-semibold">
          {{ kmFormatter(weather.current.visibility) }} km
        </div>
      </div>
      <div class="">
        <div class="font-light uppercase">
          Luchtdruk
        </div>
        <div class="text-base font-semibold">
          {{ weather.current.pressure }} hPa
        </div>
      </div>
      <div class="">
        <div class="font-light uppercase">
          Dauwpunt
        </div>
        <div class="text-base font-semibold">
          {{ weather.current.dew_point.toFixed(0) }}°
        </div>
      </div>
    </section>

    <section>
      <h4>Overicht per uur</h4>
      <div class="flex overflow-x-auto gap-x-2 pb-2 text-sm mt-2">
        <div v-for="hour in weather.hourly.slice(24)" :key="hour.dt" class="bg-white/10 rounded-md p-2 basis-full w-[10em]">
          {{ toLocaleTime(hour.dt) }}
          <div class="flex gap-4 mt-2">
            <div class="flex flex-col gap-y-1">
              <div class="flex flew-row justify-between">
                <WeatherIcon class="w-5 h-5" :weather-icon="hour.weather[0]?.icon" />
                <div>
                  {{ hour.temp.toFixed(0) }}°
                </div>
              </div>
              <div>
                {{ hour.weather[0]?.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-4">
      <h4>Overicht per dag</h4>
      <div class="grid grid-flow-row grid-cols-2 gap-2 mt-2">
        <div v-for="day in weather.daily" :key="day.dt" class="bg-white/10 rounded-md p-4">
          <div class="capitalize">
            {{ toLocaleDate(day.dt, { weekday: 'long', month: 'long', day: 'numeric' }) }}
          </div>
          <div class="grid grid-flow-row grid-cols-2 gap-x-4 mt-4">
            <div class="flex gap-x-4">
              <div class="flex items-center">
                <WeatherIcon class="w-10 h-10" :weather-icon="day.weather[0]?.icon" />
              </div>
              <div class="flex flex-col gap-y-1">
                <div class="font-medium">
                  {{ day.temp.max.toFixed(0) }}°
                </div>
                <div class="font-light">
                  {{ day.temp.min.toFixed(0) }}°
                </div>
              </div>
            </div>
            <div class="flex flex-col items-end">
              {{ day.weather[0]?.description }}
              <div>
                <icon:mdi:drop class="align-sub inline" />
                {{ day.rain ?? 0 }} mm
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
