export type WeatherIconsDay = '01d' | '02d' | '03d' | '04d' | '09d' | '10d' | '11d' | '13d' | '50d'
export type WeatherIconsNight = '01n' | '02n' | '03n' | '04n' | '09n' | '10n' | '11n' | '13n' | '50n'

export namespace CurrentWeather {

  export interface Coord {
    lon: number
    lat: number
  }

  export interface Weather {
    id: number
    main: string
    description: string
    icon: WeatherIconsDay | WeatherIconsNight
  }

  export interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }

  export interface Wind {
    speed: number
    deg: number
    gust: number
  }

  export interface Clouds {
    all: number
  }

  export interface Sys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }

  export interface WeatherResponse {
    coord: Coord
    weather: Weather[]
    base: string
    main: Main
    visibility: number
    wind: Wind
    clouds: Clouds
    dt: number
    sys: Sys
    timezone: number
    id: number
    name: string
    cod: number
  }
}

export namespace WeatherForecast {

  export interface Weather {
    id: number
    main: string
    description: string
    icon: WeatherIconsDay | WeatherIconsNight
  }

  export interface Current {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather[]
  }

  export interface Minutely {
    dt: number
    precipitation: number
  }

  export interface Rain {
    '1h': number
  }

  export interface Hourly {
    dt: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather[]
    pop: number
    rain: Rain
  }

  export interface Temp {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }

  export interface FeelsLike {
    day: number
    night: number
    eve: number
    morn: number
  }

  export interface Daily {
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    temp: Temp
    feels_like: FeelsLike
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather[]
    clouds: number
    pop: number
    rain: number
    uvi: number
  }

  export interface WeatherResponse {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: Current
    minutely: Minutely[]
    hourly: Hourly[]
    daily: Daily[]
  }

}

export namespace Options {
  export interface WeatherOptions {
    lang?: string
    units?: 'metric' | 'imperial' | 'default'
  }

  export interface WeatherCoordinatesOptions extends WeatherOptions {
    lat: number
    lon: number
  }

  export interface WeatherCityOptions extends WeatherOptions {
    city: string
    stateCode?: string
    countryCode?: string
  }

}
