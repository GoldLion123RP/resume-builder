import { useContext } from 'react'
import { ResumeContext } from '@/context/ResumeContext'

/**
 * Custom hook to use Resume Context
 * 
 * Usage:
 * const { resumeData, updateProfile, addItem, ... } = useResume()
 * 
 * @returns {Object} Resume context value
 * @throws {Error} If used outside ResumeProvider
 */
export const useResume = () => {
  const context = useContext(ResumeContext)

  if (context === null) {
    throw new Error(
      'useResume must be used within a ResumeProvider. ' +
      'Make sure your component is wrapped with <ResumeProvider>.'
    )
  }

  return context
}

export default useResume
