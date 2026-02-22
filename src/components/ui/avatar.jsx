import * as React from 'react'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef(
  ({ className, src, alt, fallback, size = 'default', ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)

    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      default: 'h-10 w-10 text-sm',
      lg: 'h-16 w-16 text-lg',
      xl: 'h-24 w-24 text-2xl',
      '2xl': 'h-32 w-32 text-3xl',
    }

    // Get initials from alt text
    const getInitials = (name) => {
      if (!name) return '?'
      const words = name.trim().split(' ')
      if (words.length === 1) {
        return words[0].charAt(0).toUpperCase()
      }
      return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
    }

    const showFallback = !src || imageError

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full',
          'bg-gray-200 dark:bg-gray-700',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            onError={() => setImageError(true)}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <span
            className={cn(
              'flex h-full w-full items-center justify-center',
              'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300',
              'font-medium'
            )}
          >
            {fallback || getInitials(alt)}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef(
  ({ className, src, alt, onError, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={onError}
        className={cn('aspect-square h-full w-full object-cover', className)}
        {...props}
      />
    )
  }
)

AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center',
          'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300',
          'font-medium',
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }