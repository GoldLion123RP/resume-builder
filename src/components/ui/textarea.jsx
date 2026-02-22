import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          'flex min-h-[100px] w-full rounded-lg border border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800',
          'px-3 py-2',
          'text-sm text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          // Focus styles
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 focus:border-primary-500',
          // Disabled styles
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900',
          // Resize behavior
          'resize-y',
          // Transition
          'transition-all duration-200',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }