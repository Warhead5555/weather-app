<script setup lang="ts">
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, TransitionRoot } from '@headlessui/vue'
import weatherService from '@/services/weather-service'
import geoLocationService from '@/services/geolocation-service'
import type { WeatherForecast } from '@/types/open-weather-types'
import type { GeoLocation } from '@/types/geo-location-types'
useHead({
  title: 'Vue 3 - Weather App',
})
const weatherForecast = ref<WeatherForecast.WeatherResponse>()
const refSearchInput = ref()
const locations = ref<GeoLocation[]>()
const selectedLocation = ref<GeoLocation>()

onMounted(async() => {
  refSearchInput.value?.$el.focus()
})

const onSearch = async(search: string) => {
  try {
    const apiResponse = await geoLocationService.getCityLocation({ city: search ?? refSearchInput.value?.value ?? '' })
    locations.value = apiResponse.data
  }
  catch (err) {
    locations.value = []
    // Todo: show user friendly error message
  }
}

const getWeatherForecast = async({ lat, lon }: GeoLocation) => {
  try {
    const apiResponse = await weatherService.getWeatherForecast({ lat, lon })
    weatherForecast.value = apiResponse.data
  }
  catch (err) {
    // Todo: show user friendly error message
  }
}

</script>

<template>
  <div class="w-full bg-sky-600">
    <div class="sm:mx-auto sm:max-w-3xl flex flex-row items-center space-x-3 py-4">
      <div class="text-white text-3xl font-bold tracking-wide">
        Weather App
      </div>
      <Combobox v-model="selectedLocation" class="grow" @update:model-value="getWeatherForecast">
        <div class="relative">
          <ComboboxInput
            ref="refSearchInput"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Zoek een plaats"
            @change="onSearch($event.target.value)"
          />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500">
            <Icon:mdi:arrow-up-down />
          </ComboboxButton>
          <TransitionRoot leave="transition ease-in duration-100" leave-from="opacity-100" leave-to="opacity-0">
            <ComboboxOptions
              v-if="locations"
              class="border border-solid first-letter:border-slate-300 divide-y divide-slate-300 absolute w-full bg-white mt-2 rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:border-slate-600 dark:divide-slate-600"
            >
              <ComboboxOption
                v-for="location in locations" v-slot="{ active, selected }"
                :key="`${location.lat}, ${location.lat}`" :value="location"
              >
                <li class="flex flex-row px-2 cursor-pointer" :class="{ 'bg-sky-600': active }">
                  <div class="flex justify-center align-middle items-center pr-2">
                    <icon-ic:baseline-check :class="{ 'invisible': !selected }" style="font-size: 1.4em" />
                  </div>
                  <div class="flex flex-col py-3 space-y-2">
                    <div class="font-semibold text-slate-800 dark:text-gray-200" :class="{ 'text-slate-200': active }">
                      {{ [location.name, location.state, location.country].join(', ') }}
                    </div>
                    <div
                      class="text-xs text-slate-400 flex items-center space-x-2"
                      :class="{ 'text-slate-100': active }"
                    >
                      <icon-akar-icons:location />
                      <span>{{ `${location.lat}, ${location.lon}` }}</span>
                    </div>
                  </div>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
    </div>
  </div>

  <div v-if="selectedLocation" class="sm:mx-auto sm:max-w-3xl">
    <WeatherCard v-if="weatherForecast" :weather="weatherForecast" :location="selectedLocation" class="mt-7" />
  </div>
</template>

<route lang="yaml">
name: home
</route>
