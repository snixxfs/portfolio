const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true',
  )
}

/** Keeps Tab inside `root` while a dialog is open. Returns a cleanup fn. */
export function trapFocus(root: HTMLElement): () => void {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return
    const items = getFocusable(root)
    if (items.length === 0) {
      event.preventDefault()
      return
    }
    const first = items[0] as HTMLElement
    const last = items[items.length - 1] as HTMLElement
    const active = document.activeElement
    if (event.shiftKey && (active === first || !root.contains(active))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }
  root.addEventListener('keydown', onKeyDown)
  return () => root.removeEventListener('keydown', onKeyDown)
}

/** True when a keystroke is aimed at something the user is typing into. */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  return target.isContentEditable || target.closest('[contenteditable="true"]') !== null
}

export function restoreFocus(element: HTMLElement | null): void {
  if (element && document.contains(element)) {
    element.focus({ preventScroll: true })
  }
}
