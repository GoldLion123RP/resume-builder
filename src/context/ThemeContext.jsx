import { createContext, useState, useEffect, useCallback } from 'react'

// Create the context
export const ThemeContext = createContext(null)

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('auto') // 'light', 'dark', 'auto'
  const [resolvedTheme, setResolvedTheme] = useState('light') // actual applied theme

  // ==========================================
  // SYSTEM PREFERENCE DETECTION
  // ==========================================

  const getSystemTheme = useCallback(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }, [])

  // ==========================================
  // APPLY THEME TO DOM
  // ==========================================

  const applyTheme = useCallback((themeToApply) => {
    const root = document.documentElement
    
    // Remove both classes first
    root.classList.remove('light', 'dark')
    
    // Add the appropriate class
    root.classList.add(themeToApply)
    
    // Update resolved theme
    setResolvedTheme(themeToApply)
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        themeToApply === 'dark' ? '#1F2937' : '#FFFFFF'
      )
    }
  }, [])

  // ==========================================
  // LOAD SAVED THEME ON MOUNT
  // ==========================================

  useEffect(() => {
    // Remove preload class to enable transitions
    document.documentElement.classList.remove('preload')
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      // Default to auto if no preference saved
      setTheme('auto')
      localStorage.setItem('theme', 'auto')
    }
  }, [])

  // ==========================================
  // APPLY THEME WHEN IT CHANGES
  // ==========================================

  useEffect(() => {
    let themeToApply = theme

    if (theme === 'auto') {
      themeToApply = getSystemTheme()
    }

    applyTheme(themeToApply)
  }, [theme, applyTheme, getSystemTheme])

  // ==========================================
  // LISTEN TO SYSTEM THEME CHANGES
  // ==========================================

  useEffect(() => {
    if (theme !== 'auto') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light'
      applyTheme(newTheme)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } 
    // Older browsers (Safari < 14)
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [theme, applyTheme])

  // ==========================================
  // THEME MANAGEMENT FUNCTIONS
  // ==========================================

  /**
   * Set theme (light, dark, or auto)
   */
  const setThemeMode = useCallback((newTheme) => {
    if (!['light', 'dark', 'auto'].includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}. Use 'light', 'dark', or 'auto'.`)
      return
    }

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  /**
   * Toggle between light and dark (ignores auto)
   */
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setThemeMode(newTheme)
  }, [resolvedTheme, setThemeMode])

  /**
   * Cycle through all theme modes (light -> dark -> auto -> light)
   */
  const cycleTheme = useCallback(() => {
    const themeOrder = ['light', 'dark', 'auto']
    const currentIndex = themeOrder.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeOrder.length
    setThemeMode(themeOrder[nextIndex])
  }, [theme, setThemeMode])

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    theme, // 'light', 'dark', 'auto'
    resolvedTheme, // actual applied theme ('light' or 'dark')
    setTheme: setThemeMode,
    toggleTheme,
    cycleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isAuto: theme === 'auto',
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}