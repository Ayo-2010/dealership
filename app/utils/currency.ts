import dealership from '~/config/dealership'

const locale = dealership.currency.locale

const nairaFormatter = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: dealership.currency.code,
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat(locale)

/**
 * Formats a numeric NGN amount as ₦18,500,000.
 * Falls back to a neutral label if a valid price is unavailable.
 */
export function formatNaira(value: number | null | undefined): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Price on request'
  return nairaFormatter.format(value).replace(/\u00A0/g, ' ')
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}

export function formatMileage(value: number | null | undefined): string | null {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return null
  return `${numberFormatter.format(value)} km`
}

export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatYear(value: number): string {
  return String(value)
}

/** Converts a price input string into a positive integer, or undefined. */
export function parsePriceInput(value: string | number | null | undefined): number | undefined {
  if (value === null || value === undefined || value === '') return undefined
  const parsed = typeof value === 'number' ? value : Number(String(value).replace(/[^\d.]/g, ''))
  if (!Number.isFinite(parsed) || parsed < 0) return undefined
  return Math.round(parsed)
}
