import type { ReactNode } from 'react'
import { RICH_MARKERS } from '../data/content'

interface RichTextProps {
  text: string
  className?: string
}

/**
 * Renders **bold** and _em_ markers from the content layer while keeping the
 * text as a single flat string for assistive technology.
 */
export function RichText({ text, className }: RichTextProps): ReactNode {
  const parts = text.split(RICH_MARKERS).filter((part) => part.length > 0)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <b className="rt-b" key={index}>
              {part.slice(2, -2)}
            </b>
          )
        }
        if (part.startsWith('_') && part.endsWith('_') && part.length > 2) {
          return (
            <em className="rt-em" key={index}>
              {part.slice(1, -1)}
            </em>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </span>
  )
}
