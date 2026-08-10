// @flowtaris/ui - Code Component
// Syntax-highlighted code display with copy functionality

import { forwardRef, type HTMLAttributes, type ReactNode, useState, useCallback } from 'react'
import { cn } from './utils'

export interface CodeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  language?: string
  showLineNumbers?: boolean
  copyable?: boolean
  maxHeight?: string
  filename?: string
}

export const Code = forwardRef<HTMLDivElement, CodeProps>(
  (
    {
      children,
      className,
      language = 'tsx',
      showLineNumbers = false,
      copyable = true,
      maxHeight,
      filename,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false)
    const codeString = typeof children === 'string' ? children : String(children)

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(codeString)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea')
        textarea.value = codeString
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }, [codeString])

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-radius-lg overflow-hidden bg-surface-layer5 border border-border-DEFAULT',
          'font-mono text-code-sm',
          maxHeight && `max-h-[${maxHeight}] overflow-auto`,
          className
        )}
        {...props}
      >
        {/* Filename header */}
        {(filename || copyable) && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-surface-layer4">
            {filename && (
              <span className="text-caption-sm text-text-tertiary font-medium">{filename}</span>
            )}
            {copyable && (
              <button
                onClick={handleCopy}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-radius-md',
                  'text-caption-xs text-text-tertiary hover:text-text-primary',
                  'bg-surface-layer5 border border-border-subtle hover:border-border-DEFAULT',
                  'transition-all duration-150 ease-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
                  copied && 'text-brand-cyan-500 border-brand-cyan-500'
                )}
                aria-label={copied ? 'Copied!' : 'Copy code'}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {copied ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 18V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2z"
                      />
                    </>
                  )}
                </svg>
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
        )}

        {/* Code content */}
        <pre className={cn('p-4 overflow-x-auto', 'tab-size-2')}>
          {showLineNumbers && (
            <>
              {codeString.split('\n').map((_, index) => (
                <span
                  key={index}
                  className="block select-none text-text-tertiary/50 w-8 text-right pr-4 -ml-8 mr-4 border-r border-border-subtle"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
              ))}
            </>
          )}
          <code
            className={cn(
              'block',
              showLineNumbers && 'relative z-10',
              language && `language-${language}`
            )}
          >
            {children}
          </code>
        </pre>
      </div>
    )
  }
)

Code.displayName = 'Code'

// ===== INLINE CODE =====
export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(
  ({ children, className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        'font-mono text-code-sm',
        'bg-surface-layer3 px-1.5 py-0.5 rounded-radius-sm',
        'border border-border-subtle',
        'text-brand-cyan-400',
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
)
InlineCode.displayName = 'InlineCode'