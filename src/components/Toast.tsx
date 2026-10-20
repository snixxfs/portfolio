import { useEffect, useRef } from 'react'

export interface ToastState {
  id: number
  message: string
  actionLabel?: string
  onAction?: () => void
}

interface ToastProps {
  toast: ToastState | null
  onDismiss: () => void
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(onDismiss, 6000)
    return () => window.clearTimeout(timer)
  }, [toast, onDismiss])

  useEffect(() => {
    if (!toast) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toast, onDismiss])

  if (!toast) return null

  return (
    <div className="toast-container" aria-live="assertive">
      <div className="toast" role="status">
        <span className="toast__dot" aria-hidden="true" />
        <span className="toast__text">{toast.message}</span>
        {toast.actionLabel && toast.onAction ? (
          <button type="button" className="toast__action" onClick={toast.onAction}>
            {toast.actionLabel}
          </button>
        ) : null}
        <button
          type="button"
          className="toast__close"
          onClick={onDismiss}
          ref={closeRef}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
