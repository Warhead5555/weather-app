import { weatherHttpClient } from '@/common/http-common'
import type { CurrentWeather, Options, WeatherForecast } from '@/types/open-weather-types'

class WeatherService {
  constructor(
    private apiKey: string,
    private options: Options.WeatherOptions) {
  }

  /**
   * Create a new option object from the instance default and param options including API key 
   * @param options 
   * @param extra 
   * @returns Option object
   */
  createParams(options: Options.WeatherOptions, extra?: Record<string, string>) {
    return {
      ...this.options,
      ...options,
      ...extra,
      apiKey: this.apiKey,
    }
  }

  /**
   * Fetch current weather from the WeatherHttpClient
   * @param param0 
   * @returns Current weather response
   */
  getCurrentWeather(options: Options.WeatherCityOptions) {
    const { city, countryCode } = options

    const params = this.createParams(
      options, {
      q: [city, '', countryCode].join(','),
    })

    return weatherHttpClient.get<CurrentWeather.WeatherResponse>('/weather', { params })
  }

  /**
   * Fetch weather forecast from the WeatherHttpClient
   * @param param0 
   * @returns Weather forecast response
   */
  getWeatherForecast(options: Options.WeatherCoordinatesOptions) {
    const params = this.createParams(options)
    return weatherHttpClient.get<WeatherForecast.WeatherResponse>('/onecall', { params })
  }
}

export default new WeatherService(import.meta.env.VITE_API_KEY as unknown as string,
  {
    lang: 'NL',
    units: 'metric',
  })
