/**
 * AccessibleIcon Component
 * 
 * Wrapper for icons to ensure accessibility.
 * Adds proper ARIA labels and hides decorative icons from screen readers.
 * 
 * @param {ReactNode} children - The icon component
 * @param {string} label - Screen reader label (required for meaningful icons)
 * @param {boolean} decorative - Whether icon is purely decorative (default: false)
 * @param {string} className - Additional CSS classes
 * 
 * Usage:
 * // Meaningful icon
 * <AccessibleIcon label="Close menu">
 *   <XIcon />
 * </AccessibleIcon>
 * 
 * // Decorative icon (next to visible text)
 * <AccessibleIcon decorative>
 *   <StarIcon />
 * </AccessibleIcon>
 */
const AccessibleIcon = ({ 
  children, 
  label, 
  decorative = false,
  className = '' 
}) => {
  if (decorative) {
    // Decorative icons - hidden from screen readers
    return (
      <span 
        className={className}
        aria-hidden="true"
        role="presentation"
      >
        {children}
      </span>
    )
  }

  if (!label) {
    console.warn('AccessibleIcon: Non-decorative icons should have a label prop')
  }

  // Meaningful icons - accessible to screen readers
  return (
    <span 
      className={className}
      aria-label={label}
      role="img"
    >
      {children}
    </span>
  )
}

/**
 * IconButton Component
 * 
 * Accessible button with icon.
 * 
 * @param {ReactNode} icon - The icon component
 * @param {string} label - Accessible label for screen readers
 * @param {Function} onClick - Click handler
 * @param {string} variant - Button style variant
 * @param {string} size - Button size
 * @param {boolean} disabled - Whether button is disabled
 * @param {string} className - Additional CSS classes
 */
const IconButton = ({
  icon,
  label,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'p-1.5 text-sm',
    md: 'p-2',
    lg: 'p-3 text-lg',
  }

  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`
        rounded-lg transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      <AccessibleIcon label={label} decorative>
        {icon}
      </AccessibleIcon>
    </button>
  )
}

/**
 * VisuallyHidden Component
 * 
 * Hides content visually but keeps it accessible to screen readers.
 * Useful for providing additional context for assistive technologies.
 */
const VisuallyHidden = ({ children, as: Component = 'span' }) => {
  return (
    <Component className="sr-only">
      {children}
    </Component>
  )
}

/**
 * FocusVisible Component
 * 
 * Shows content only when parent is focused (for keyboard navigation hints)
 */
const FocusVisible = ({ children, className = '' }) => {
  return (
    <span className={`opacity-0 group-focus-visible:opacity-100 transition-opacity ${className}`}>
      {children}
    </span>
  )
}

/**
 * LiveRegion Component
 * 
 * ARIA live region for dynamic content announcements.
 * Used for announcing status updates to screen readers.
 * 
 * @param {ReactNode} children - Content to announce
 * @param {string} politeness - 'polite' | 'assertive' | 'off'
 * @param {boolean} atomic - Whether to read entire region or just changes
 */
const LiveRegion = ({ 
  children, 
  politeness = 'polite',
  atomic = true,
  className = ''
}) => {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className={`sr-only ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * ProgressAnnouncer Component
 * 
 * Announces progress updates to screen readers
 */
const ProgressAnnouncer = ({ value, max = 100, label }) => {
  const percentage = Math.round((value / max) * 100)
  
  return (
    <LiveRegion politeness="polite">
      {label ? `${label}: ${percentage}%` : `${percentage}% complete`}
    </LiveRegion>
  )
}

// Export all components
export { 
  AccessibleIcon, 
  IconButton, 
  VisuallyHidden, 
  FocusVisible,
  LiveRegion,
  ProgressAnnouncer
}

export default AccessibleIcon