export enum WindDirection {
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
}

/**
 * Get the wind dorection by converting degrees
 * @param degr
 * @returns Wind direction
 */
export const getWindDirection = (degr: number) => {
  return WindDirection[Math.floor((degr * 8) / 360)]
}

/**
 * Convert unix timestamp to a Date object
 * @param unixTimestamp Unix timestamp
 * @returns Date
 */
const convertTimestamp = (unixTimestamp: number) => {
  return new Date(unixTimestamp * 1000)
}

/**
 * Create a locale date representation of a unix timestamp with options
 * @param unixTimestamp Unix timestamp
 * @param options Intl.Date options
 * @param locale use locale to format to locale date
 * @returns locale date string
 */
export const toLocaleDate = (unixTimestamp: number, options?: Intl.DateTimeFormatOptions, locale = 'nl') => {
  return convertTimestamp(unixTimestamp).toLocaleDateString(locale, options)
}

/**
 * Create a locale time representation of a unix timestamp
 * @param unixTimestamp Unix timestamp
 * @param timeZone The time zone to use
 * @returns Locale time string
 */
export const toLocaleTime = (unixTimestamp: number, timeZone?: string) => {
  return convertTimestamp(unixTimestamp)
    .toLocaleTimeString('nl', { hour: '2-digit', minute: '2-digit', timeZone })
}

/**
 * Format last 3 numbers when @num > 1000. 14000 becomes 14; 900 stays 900
 * @param num Number to format
 * @returns Formatedd number
 */
export const kmFormatter = (num: number) => {
  return Math.abs(num) > 999 ? `${Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1))}` : ((Math.sign(num) * Math.abs(num)) / 1000).toFixed(1)
}
