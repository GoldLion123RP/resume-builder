import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

/**
 * Custom hook to use Auth Context
 * 
 * Usage:
 * const { user, isAuthenticated, signInWithGoogle, logout, ... } = useAuth()
 * 
 * @returns {Object} Auth context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Make sure your component is wrapped with <AuthProvider>.'
    )
  }

  return context
}

export default useAuth