const STORAGE_KEY = 'enade-quimica-progress'
const THEME_KEY = 'enade-quimica-theme'
const DATES_NOTICE_KEY = 'enade-quimica-aviso-datas-v1'

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or unavailable
  }
}

export { STORAGE_KEY, THEME_KEY, DATES_NOTICE_KEY }
