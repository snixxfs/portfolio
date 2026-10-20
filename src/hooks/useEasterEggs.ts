import { useSyncExternalStore } from 'react'
import { getLocal, readJSON, writeJSON } from '../utils/storage'

export const SECRET_IDS = [
  'terminal', // opened the hidden terminal with `
  'theme', // ran `theme` inside the terminal
  'konami', // entered the Konami sequence
  'glitch', // clicked the hero name five times
  'hire', // typed "hire" anywhere on the page
  'devtools', // opened DevTools wide enough to break the viewport check
] as const

export type SecretId = (typeof SECRET_IDS)[number]

export const TOTAL_SECRETS = SECRET_IDS.length
const STORAGE_KEY = 'ask-secrets-v1'

type SecretsState = ReadonlySet<SecretId>

let state: SecretsState = load()
const listeners = new Set<() => void>()

function validate(raw: unknown): Set<SecretId> | null {
  if (!raw || typeof raw !== 'object') return null
  const list = (raw as { found?: unknown }).found
  if (!Array.isArray(list)) return null
  const next = new Set<SecretId>()
  for (const value of list) {
    if (typeof value === 'string' && (SECRET_IDS as readonly string[]).includes(value)) {
      next.add(value as SecretId)
    }
  }
  return next
}

function load(): SecretsState {
  const local = getLocal()
  if (!local) return new Set<SecretId>()
  return readJSON<Set<SecretId>>(local, STORAGE_KEY, validate) ?? new Set<SecretId>()
}

function emit(): void {
  for (const listener of listeners) listener()
}

function persist(): void {
  const local = getLocal()
  if (local) writeJSON(local, STORAGE_KEY, { found: Array.from(state) })
}

/** Records a discovery. Idempotent — repeats never increase the count. */
export function discover(id: SecretId): void {
  if (state.has(id)) return
  const next = new Set(state)
  next.add(id)
  state = next
  persist()
  emit()
}

export function resetSecrets(): void {
  state = new Set<SecretId>()
  persist()
  emit()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): SecretsState {
  return state
}

export interface SecretsView {
  count: number
  total: number
  has: (id: SecretId) => boolean
  found: SecretId[]
}

export function useSecrets(): SecretsView {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return {
    count: snapshot.size,
    total: TOTAL_SECRETS,
    has: (id) => snapshot.has(id),
    found: Array.from(snapshot),
  }
}
