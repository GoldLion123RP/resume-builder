import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

/**
 * Custom hook to use Theme Context
 * 
 * Usage:
 * const { theme, resolvedTheme, toggleTheme, isDark, ... } = useTheme()
 * 
 * @returns {Object} Theme context value
 * @throws {Error} If used outside ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure your component is wrapped with <ThemeProvider>.'
    )
  }

  return context
}

export default useTheme