/** Storage helpers that never throw (private mode, quota, corrupted JSON). */

export function readJSON<T>(storage: Storage, key: string, validate: (value: unknown) => T | null): T | null {
  try {
    const raw = storage.getItem(key)
    if (!raw) return null
    return validate(JSON.parse(raw) as unknown)
  } catch {
    return null
  }
}

export function writeJSON(storage: Storage, key: string, value: unknown): boolean {
  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function getSession(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export function getLocal(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
    document.body.appendChild(area)
    area.select()
    area.setSelectionRange(0, text.length)
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  } catch {
    return false
  }
}
