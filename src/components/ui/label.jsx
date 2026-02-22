import * as React from 'react'
import { cn } from '@/lib/utils'

const Label = React.forwardRef(
  ({ className, htmlFor, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          // Base styles
          'block text-sm font-medium leading-none',
          'text-gray-700 dark:text-gray-300',
          'mb-2',
          // Disabled state (when used with disabled input)
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      >
        {children}
      </label>
    )
  }
)

Label.displayName = 'Label'

export { Label }