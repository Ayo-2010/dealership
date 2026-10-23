export function isValidNigerianPhone(value: string): boolean {
  const digits = value.replace(/[\s().-]/g, '')
  return /^(?:\+?234|0)[789][01]\d{8}$/.test(digits)
}

export function isValidEmail(value: string): boolean {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

export function requiredText(value: string | null | undefined, minimum = 2): boolean {
  return typeof value === 'string' && value.trim().length >= minimum
}

export function isPastDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return true
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year!, (month ?? 1) - 1, day)
  if (Number.isNaN(date.getTime())) return true
  date.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() < today.getTime()
}

export function todayISODate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isValidYear(value: string | number): boolean {
  const year = Number(value)
  return Number.isInteger(year) && year >= 1950 && year <= new Date().getFullYear() + 1
}

export function parseOptionalInteger(value: string | number | null | undefined): number | undefined {
  if (value === null || value === undefined || value === '') return undefined
  const parsed = Number(String(value).replace(/[^\d]/g, ''))
  return Number.isFinite(parsed) ? Math.round(parsed) : undefined
}
