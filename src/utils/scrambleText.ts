/**
 * Text Scramble / Cipher animation for editorial & dossier headings
 */

const CIPHER_CHARS = '§‡†∆Ω018X#$█▓▒'

export function scrambleElement(element: HTMLElement, targetText?: string, duration: number = 600) {
  const original = targetText ?? element.dataset.originalText ?? element.textContent ?? ''
  if (!element.dataset.originalText) {
    element.dataset.originalText = original
  }

  const length = original.length
  const startTime = performance.now()

  const tick = () => {
    const elapsed = performance.now() - startTime
    const progress = Math.min(1, elapsed / duration)
    const revealedLength = Math.floor(progress * length)

    let result = ''
    for (let i = 0; i < length; i++) {
      if (original[i] === ' ') {
        result += ' '
      } else if (i < revealedLength) {
        result += original[i]
      } else {
        result += CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
      }
    }

    element.textContent = result

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      element.textContent = original
    }
  }

  requestAnimationFrame(tick)
}
