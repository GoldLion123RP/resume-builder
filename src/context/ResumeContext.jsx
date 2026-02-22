import { createContext, useState, useEffect, useCallback, useRef } from 'react'
import { 
  saveResumeData, 
  loadResumeData, 
  getEmptyResumeData,
  initializeResumeData 
} from '@/lib/storage'

// Create the context
export const ResumeContext = createContext(null)

// Provider component
export const ResumeProvider = ({ children }) => {
  // State
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  
  // Ref for debounced save
  const saveTimeoutRef = useRef(null)

  // ==========================================
  // INITIALIZATION
  // ==========================================

  // Load resume data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const data = await initializeResumeData()
        setResumeData(data)
        setLastSaved(new Date())
        console.log('✅ Resume data initialized')
      } catch (error) {
        console.error('❌ Error loading resume data:', error)
        // Fallback to empty data
        setResumeData(getEmptyResumeData())
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // ==========================================
  // AUTO-SAVE (DEBOUNCED)
  // ==========================================

  /**
   * Save resume data with debouncing (waits 2 seconds after last change)
   */
  const debouncedSave = useCallback(async (data) => {
    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Set new timeout
    saveTimeoutRef.current = setTimeout(async () => {
      setSaving(true)
      try {
        await saveResumeData(data)
        setLastSaved(new Date())
        console.log('💾 Auto-saved')
      } catch (error) {
        console.error('❌ Auto-save error:', error)
      } finally {
        setSaving(false)
      }
    }, 2000) // 2 second delay
  }, [])

  // ==========================================
  // UPDATE FUNCTIONS
  // ==========================================

  /**
   * Update profile section
   */
  const updateProfile = useCallback((updates) => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        profile: { ...prev.profile, ...updates },
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      debouncedSave(newData)
      return newData
    })
  }, [debouncedSave])

  /**
   * Update array-based sections (education, experience, projects, etc.)
   */
  const updateSection = useCallback((sectionName, items) => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        [sectionName]: items,
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      debouncedSave(newData)
      return newData
    })
  }, [debouncedSave])

  /**
   * Add item to array section
   */
  const addItem = useCallback((sectionName, item) => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        [sectionName]: [...(prev[sectionName] || []), item],
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      debouncedSave(newData)
      return newData
    })
  }, [debouncedSave])

  /**
   * Update item in array section
   */
  const updateItem = useCallback((sectionName, itemId, updates) => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        [sectionName]: prev[sectionName].map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        ),
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      debouncedSave(newData)
      return newData
    })
  }, [debouncedSave])

  /**
   * Delete item from array section
   */
  const deleteItem = useCallback((sectionName, itemId) => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        [sectionName]: prev[sectionName].filter(item => item.id !== itemId),
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      debouncedSave(newData)
      return newData
    })
  }, [debouncedSave])

  /**
   * Update skills section
   */
  const updateSkills = useCallback((category, skills) => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: skills
        },
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      debouncedSave(newData)
      return newData
    })
  }, [debouncedSave])

  /**
   * Update settings
   */
  const updateSettings = useCallback((updates) => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        settings: { ...prev.settings, ...updates },
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      debouncedSave(newData)
      return newData
    })
  }, [debouncedSave])

  /**
   * Update customization settings
   */
  const updateCustomization = useCallback((updates) => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        settings: {
          ...prev.settings,
          customization: {
            ...prev.settings.customization,
            ...updates
          }
        },
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      debouncedSave(newData)
      return newData
    })
  }, [debouncedSave])

  /**
   * Manual save (force immediate save)
   */
  const manualSave = useCallback(async () => {
    if (!resumeData) return

    setSaving(true)
    try {
      await saveResumeData(resumeData)
      setLastSaved(new Date())
      console.log('✅ Manual save complete')
      return true
    } catch (error) {
      console.error('❌ Manual save error:', error)
      return false
    } finally {
      setSaving(false)
    }
  }, [resumeData])

  /**
   * Reset to empty data
   */
  const resetData = useCallback(() => {
    const emptyData = getEmptyResumeData()
    setResumeData(emptyData)
    debouncedSave(emptyData)
  }, [debouncedSave])

  /**
   * Load fresh data from storage
   */
  const refreshData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await loadResumeData()
      setResumeData(data || getEmptyResumeData())
      setLastSaved(new Date())
    } catch (error) {
      console.error('❌ Error refreshing data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    // State
    resumeData,
    loading,
    saving,
    lastSaved,

    // Update functions
    updateProfile,
    updateSection,
    addItem,
    updateItem,
    deleteItem,
    updateSkills,
    updateSettings,
    updateCustomization,

    // Utility functions
    manualSave,
    resetData,
    refreshData,
  }

  // Don't render children until data is loaded
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your resume...</p>
        </div>
      </div>
    )
  }

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}