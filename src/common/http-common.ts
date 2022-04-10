import type { AxiosInstance } from 'axios'
import axios from 'axios'

/**
 * Axios http client for the OpenWeather API
 */
export const weatherHttpClient: AxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  headers: {
    'Content-type': 'application/json',
  },
})

/**
 * Axios http client for the OpenWeather Geolocation API
 */
export const geoLocationHttpClient: AxiosInstance = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0',
  headers: {
    'Content-type': 'application/json',
  },
})
