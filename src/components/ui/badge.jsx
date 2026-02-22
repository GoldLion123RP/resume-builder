import * as React from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = {
  variant: {
    default: 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-transparent',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-transparent',
    destructive: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-transparent',
    outline: 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent',
    success: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-transparent',
  },
}

const Badge = React.forwardRef(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          badgeVariants.variant[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }