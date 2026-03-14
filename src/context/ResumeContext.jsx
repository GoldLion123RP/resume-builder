import { createContext, useState, useEffect, useCallback, useRef } from 'react'
import { 
  saveResumeData, 
  loadResumeData, 
  getEmptyResumeData,
  initializeResumeData,
  saveResumeById,
  loadResumeById,
  loadResumesFromLocalStorage,
  deleteResumeById,
  getActiveResumeId,
  setActiveResumeId
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
  const [resumes, setResumes] = useState({})
  const [activeResumeId, setActiveResumeId] = useState(null)

  // Ref for debounced save
  const saveTimeoutRef = useRef(null)

  // ==========================================
  // INITIALIZATION
  // ==========================================

  // Load resume data and resumes on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Load all resumes
        const storedResumes = await loadResumesFromLocalStorage()
        if (storedResumes) {
          setResumes(storedResumes)
        }
        
        // Load active resume ID
        const activeId = await getActiveResumeId()
        if (activeId) {
          setActiveResumeId(activeId)
        }
        
        // Load resume data
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
        // Save with ID if we have an active resume
        const dataToSave = {
          ...data,
          metadata: {
            ...data.metadata,
            updatedAt: new Date().toISOString()
          }
        }
        
        // If we have an active resume ID, save with that ID
        if (activeResumeId) {
          await saveResumeById(activeResumeId, dataToSave)
        } else {
          // Otherwise use general save
          await saveResumeData(dataToSave)
        }
        
        setLastSaved(new Date())
        console.log('💾 Auto-saved')
      } catch (error) {
        console.error('❌ Auto-save error:', error)
      } finally {
        setSaving(false)
      }
    }, 2000) // 2 second delay
  }, [activeResumeId])

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
  }, [debouncedSave, activeResumeId])

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
  }, [debouncedSave, activeResumeId])

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
  }, [debouncedSave, activeResumeId])

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
  }, [debouncedSave, activeResumeId])

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
  }, [debouncedSave, activeResumeId])

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
  }, [debouncedSave, activeResumeId])

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
  }, [debouncedSave, activeResumeId])

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
  }, [debouncedSave, activeResumeId])

  /**
   * Manual save (force immediate save)
   */
  const manualSave = useCallback(async () => {
    if (!resumeData) return

    setSaving(true)
    try {
      // Save with ID if we have an active resume
      const dataToSave = {
        ...resumeData,
        metadata: {
          ...resumeData.metadata,
          updatedAt: new Date().toISOString()
        }
      }
      
      // If we have an active resume ID, save with that ID
      if (activeResumeId) {
        await saveResumeById(activeResumeId, dataToSave)
      } else {
        // Otherwise use general save
        await saveResumeData(dataToSave)
      }
      
      setLastSaved(new Date())
      console.log('✅ Manual save complete')
      return true
    } catch (error) {
      console.error('❌ Manual save error:', error)
      return false
    } finally {
      setSaving(false)
    }
  }, [resumeData, activeResumeId])

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

  /**
   * Load sample data or any complete resume data
   * This replaces current data entirely
   */
  const loadCompleteResumeData = useCallback(async (data) => {
    setSaving(true)
    try {
      // Add metadata if not present
      const dataWithMetadata = {
        ...data,
        metadata: {
          version: '1.0',
          createdAt: data.metadata?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        settings: data.settings || {
          template: 'modern',
          colorScheme: 'blue',
          fontSize: 'medium',
          pageMargins: 'normal',
          lineSpacing: 'normal',
          sectionSpacing: 'normal',
          customization: {
            primaryColor: '#3B82F6',
            accentColor: '#8B5CF6',
            fontFamily: 'Inter',
          },
        },
      }

      // Update state
      setResumeData(dataWithMetadata)

      // Save to storage immediately
      await saveResumeData(dataWithMetadata)
      setLastSaved(new Date())
      
      console.log('✅ Sample data loaded successfully')
      return true
    } catch (error) {
      console.error('❌ Error loading sample data:', error)
      return false
    } finally {
      setSaving(false)
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
    resumes,
    activeResumeId,

    // Update functions
    updateProfile,
    updateSection,
    addItem,
    updateItem,
    deleteItem,
    updateSkills,
    updateSettings,
    updateCustomization,

    // Resume management functions
    saveResumeAs: async (resumeId) => {
      if (!resumeData) return false
      const success = await saveResumeById(resumeId, resumeData)
      if (success) {
        // Update local resumes state
        setResumes(prev => ({
          ...prev,
          [resumeId]: {
            ...resumeData,
            metadata: {
              ...resumeData.metadata,
              id: resumeId,
              updatedAt: new Date().toISOString()
            }
          }
        }))
        // Set as active resume
        setActiveResumeId(resumeId)
      }
      return success
    },
    loadResume: async (resumeId) => {
      const resume = await loadResumeById(resumeId)
      if (resume) {
        setResumeData(resume)
        setActiveResumeId(resumeId)
        setLastSaved(new Date())
        // Update local resumes state
        setResumes(prev => ({
          ...prev,
          [resumeId]: resume
        }))
        return true
      }
      return false
    },
    deleteResume: async (resumeId) => {
      const success = await deleteResumeById(resumeId)
      if (success) {
        // Update local resumes state
        setResumes(prev => {
          const newResumes = {...prev}
          delete newResumes[resumeId]
          return newResumes
        })
        // If deleting active resume, load another or create new
        if (activeResumeId === resumeId) {
          const remainingResumes = await loadResumesFromLocalStorage()
          if (remainingResumes && Object.keys(remainingResumes).length > 0) {
            const firstId = Object.keys(remainingResumes)[0]
            await loadResume(firstId)
          } else {
            // Create new empty resume
            const emptyData = getEmptyResumeData()
            setResumeData(emptyData)
            setActiveResumeId(null)
            await saveResumeData(emptyData)
          }
        }
        return true
      }
      return false
    },
    setActiveResume: async (resumeId) => {
      const success = await setActiveResumeId(resumeId)
      if (success) {
        setActiveResumeId(resumeId)
        // Load the resume data
        const resume = await loadResumeById(resumeId)
        if (resume) {
          setResumeData(resume)
          setLastSaved(new Date())
        }
      }
      return success
    },

    // Utility functions
    manualSave,
    resetData,
    refreshData,
    loadCompleteResumeData, // NEW: Load sample data or complete resume
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