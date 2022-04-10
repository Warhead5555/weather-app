import { geoLocationHttpClient } from '@/common/http-common'
import type { GeoLocation, GeoLocationOptions } from '@/types/geo-location-types'

class GeoLocationService {
  constructor(
    private apiKey: string,
  ) { }

  /**
   * Fetch cities from Geolocation API
   * @param param0 
   * @returns 
   */
  getCityLocation({ city, countryCode, limit = 5 }: GeoLocationOptions) {
    const params = {
      q: [city, '', countryCode].join(','),
      limit,
      apiKey: this.apiKey,
    }

    return geoLocationHttpClient.get<GeoLocation[]>('/direct', { params })
  }
}

export default new GeoLocationService(import.meta.env.VITE_API_KEY as unknown as string)
