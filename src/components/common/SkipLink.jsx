/**
 * SkipLink Component
 * 
 * Provides "Skip to main content" functionality for keyboard users.
 * The link is visually hidden until focused, then appears at the top of the page.
 * 
 * Usage:
 * 1. Add <SkipLink /> at the very top of your app
 * 2. Add id="main-content" to your main content area
 */

const SkipLink = ({ targetId = 'main-content', children }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    
    if (target) {
      // Set tabindex temporarily to make the element focusable
      target.setAttribute('tabindex', '-1')
      target.focus()
      
      // Scroll to target
      target.scrollIntoView({ behavior: 'smooth' })
      
      // Remove tabindex after blur
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex')
      }, { once: true })
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[200]
        focus:px-4 focus:py-2
        focus:bg-primary-500 focus:text-white
        focus:rounded-lg focus:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2
        transition-all
      "
    >
      {children || 'Skip to main content'}
    </a>
  )
}

/**
 * SkipLinks Component
 * 
 * Multiple skip links for complex layouts
 */
const SkipLinks = ({ links }) => {
  const defaultLinks = [
    { id: 'main-content', label: 'Skip to main content' },
    { id: 'navigation', label: 'Skip to navigation' },
  ]

  const skipLinks = links || defaultLinks

  return (
    <div className="skip-links">
      {skipLinks.map((link, index) => (
        <SkipLink key={index} targetId={link.id}>
          {link.label}
        </SkipLink>
      ))}
    </div>
  )
}

export { SkipLink, SkipLinks }
export default SkipLink