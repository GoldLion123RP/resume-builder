import { doc, setDoc, getDoc, updateDoc, deleteDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore'
import { db, isFirebaseConfigured, getCurrentUser } from './firebase'

// LocalStorage keys
const LOCAL_STORAGE_KEY = 'resumeBuilderData'
const LOCAL_STORAGE_RESUMES_KEY = 'resumeBuilderResumes'
const LOCAL_STORAGE_ACTIVE_RESUME_KEY = 'resumeBuilderActiveResumeId'

// ==========================================
// LOCALSTORAGE FUNCTIONS (Works Offline)
// ==========================================

/**
 * Save resume data to LocalStorage
 * @param {Object} data - Resume data object
 * @returns {boolean} - Success status
 */
export const saveToLocalStorage = (data) => {
  try {
    const dataWithTimestamp = {
      ...data,
      metadata: {
        ...data.metadata,
        updatedAt: new Date().toISOString(),
        lastSyncedAt: data.metadata?.lastSyncedAt || null,
      },
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataWithTimestamp))
    console.log('✅ Data saved to LocalStorage')
    return true
  } catch (error) {
    console.error('❌ LocalStorage save error:', error)
    return false
  }
}

/**
 * Load resume data from LocalStorage
 * @returns {Object|null} - Resume data or null if not found
 */
export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (data) {
      console.log('✅ Data loaded from LocalStorage')
      return JSON.parse(data)
    }
    console.log('ℹ️ No data found in LocalStorage')
    return null
  } catch (error) {
    console.error('❌ LocalStorage load error:', error)
    return null
  }
}

/**
 * Clear all resume data from LocalStorage
 * @returns {boolean} - Success status
 */
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    console.log('✅ LocalStorage cleared')
    return true
  } catch (error) {
    console.error('❌ LocalStorage clear error:', error)
    return false
  }
}

// ==========================================
// FIRESTORE FUNCTIONS (Cloud Sync)
// ==========================================

/**
 * Save resume data to Firestore (requires authentication)
 * @param {Object} data - Resume data object
 * @returns {Promise<boolean>} - Success status
 */
export const saveToFirestore = async (data) => {
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured. Cannot save to cloud.')
    return false
  }

  const user = getCurrentUser()
  if (!user) {
    console.warn('⚠️ User not authenticated. Cannot save to cloud.')
    return false
  }

  try {
    const userDocRef = doc(db, 'users', user.uid)
    const dataWithTimestamp = {
      ...data,
      metadata: {
        ...data.metadata,
        updatedAt: serverTimestamp(),
        lastSyncedAt: serverTimestamp(),
        userId: user.uid,
      },
    }

    await setDoc(userDocRef, dataWithTimestamp, { merge: true })
    console.log('✅ Data saved to Firestore')
    return true
  } catch (error) {
    console.error('❌ Firestore save error:', error)
    return false
  }
}

/**
 * Load resume data from Firestore (requires authentication)
 * @returns {Promise<Object|null>} - Resume data or null if not found
 */
export const loadFromFirestore = async () => {
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured. Cannot load from cloud.')
    return null
  }

  const user = getCurrentUser()
  if (!user) {
    console.warn('⚠️ User not authenticated. Cannot load from cloud.')
    return null
  }

  try {
    const userDocRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      console.log('✅ Data loaded from Firestore')
      return docSnap.data()
    } else {
      console.log('ℹ️ No data found in Firestore for this user')
      return null
    }
  } catch (error) {
    console.error('❌ Firestore load error:', error)
    return null
  }
}

/**
 * Delete user data from Firestore
 * @returns {Promise<boolean>} - Success status
 */
export const deleteFromFirestore = async () => {
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured.')
    return false
  }

  const user = getCurrentUser()
  if (!user) {
    console.warn('⚠️ User not authenticated.')
    return false
  }

  try {
    const userDocRef = doc(db, 'users', user.uid)
    await deleteDoc(userDocRef)
    console.log('✅ Data deleted from Firestore')
    return true
  } catch (error) {
    console.error('❌ Firestore delete error:', error)
    return false
  }
}

// ==========================================
// UNIFIED STORAGE FUNCTIONS (Auto-sync)
// ==========================================

/**
 * Sync LocalStorage data to Firestore (useful after login)
 * @returns {Promise<boolean>} - Success status
 */
export const syncLocalToCloud = async () => {
  const localData = loadFromLocalStorage()
  if (!localData) {
    console.log('ℹ️ No local data to sync')
    return false
  }

  return await saveToFirestore(localData)
}

/**
 * Merge cloud and local data (user chooses which to keep)
 * @param {string} preference - 'local' or 'cloud'
 * @returns {Promise<Object|null>} - Merged data
 */
export const mergeData = async (preference = 'cloud') => {
  const localData = loadFromLocalStorage()
  const cloudData = await loadFromFirestore()

  if (!localData && !cloudData) {
    console.log('ℹ️ No data to merge')
    return null
  }

  if (!localData) return cloudData
  if (!cloudData) return localData

  // Compare timestamps
  const localTime = new Date(localData.metadata?.updatedAt || 0).getTime()
  const cloudTime = cloudData.metadata?.updatedAt?.toDate?.().getTime() || 0

  let finalData = null

  if (preference === 'cloud') {
    finalData = cloudData
    console.log('✅ Using cloud data')
  } else if (preference === 'local') {
    finalData = localData
    console.log('✅ Using local data')
  } else {
    // Auto-select newer data
    finalData = cloudTime > localTime ? cloudData : localData
    console.log(`✅ Using ${cloudTime > localTime ? 'cloud' : 'local'} data (newer)`)
  }

  // Save to both storages
  await saveResumeData(finalData)
  return finalData
}

/**
 * Clear all data (both LocalStorage and Firestore)
 * @returns {Promise<boolean>} - Success status
 */
export const clearAllData = async () => {
  const localCleared = clearLocalStorage()
  
  if (isFirebaseConfigured() && getCurrentUser()) {
    await deleteFromFirestore()
  }

  console.log('✅ All data cleared')
  return localCleared
}

// ==========================================
// MULTIPLE RESUME MANAGEMENT
// ==========================================

/**
 * Save a resume with a specific ID to LocalStorage
 * @param {string} resumeId - Unique identifier for the resume
 * @param {Object} data - Resume data object
 * @returns {boolean} - Success status
 */
export const saveResumeById = (resumeId, data) => {
  try {
    const resumes = loadResumesFromLocalStorage() || {}
    const dataWithTimestamp = {
      ...data,
      metadata: {
        ...data.metadata,
        updatedAt: new Date().toISOString(),
        lastSyncedAt: data.metadata?.lastSyncedAt || null,
        id: resumeId,
      },
    }
    resumes[resumeId] = dataWithTimestamp
    localStorage.setItem(LOCAL_STORAGE_RESUMES_KEY, JSON.stringify(resumes))
    console.log(`✅ Resume ${resumeId} saved to LocalStorage`)
    return true
  } catch (error) {
    console.error('❌ LocalStorage save resume error:', error)
    return false
  }
}

/**
 * Load a resume by ID from LocalStorage
 * @param {string} resumeId - Unique identifier for the resume
 * @returns {Object|null} - Resume data or null if not found
 */
export const loadResumeById = (resumeId) => {
  try {
    const resumes = loadResumesFromLocalStorage() || {}
    const resume = resumes[resumeId]
    if (resume) {
      console.log(`✅ Resume ${resumeId} loaded from LocalStorage`)
      return resume
    }
    console.log(`ℹ️ No resume found with ID ${resumeId} in LocalStorage`)
    return null
  } catch (error) {
    console.error('❌ LocalStorage load resume error:', error)
    return null
  }
}

/**
 * Load all resumes from LocalStorage
 * @returns {Object|null} - Object containing all resumes or null if none
 */
export const loadResumesFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_RESUMES_KEY)
    if (data) {
      console.log('✅ Resumes loaded from LocalStorage')
      return JSON.parse(data)
    }
    console.log('ℹ️ No resumes found in LocalStorage')
    return null
  } catch (error) {
    console.error('❌ LocalStorage load resumes error:', error)
    return null
  }
}

/**
 * Save all resumes to LocalStorage
 * @param {Object} resumes - Object containing all resumes
 * @returns {boolean} - Success status
 */
export const saveResumesToLocalStorage = (resumes) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_RESUMES_KEY, JSON.stringify(resumes))
    console.log('✅ Resumes saved to LocalStorage')
    return true
  } catch (error) {
    console.error('❌ LocalStorage save resumes error:', error)
    return false
  }
}

/**
 * Delete a resume by ID from LocalStorage
 * @param {string} resumeId - Unique identifier for the resume
 * @returns {boolean} - Success status
 */
export const deleteResumeById = (resumeId) => {
  try {
    const resumes = loadResumesFromLocalStorage() || {}
    if (resumes[resumeId]) {
      delete resumes[resumeId]
      localStorage.setItem(LOCAL_STORAGE_RESUMES_KEY, JSON.stringify(resumes))
      console.log(`✅ Resume ${resumeId} deleted from LocalStorage`)
      
      // If this was the active resume, clear active resume ID
      const activeResumeId = getActiveResumeId()
      if (activeResumeId === resumeId) {
        setActiveResumeId(null)
      }
      
      return true
    }
    console.log(`ℹ️ No resume found with ID ${resumeId} to delete`)
    return false
  } catch (error) {
    console.error('❌ LocalStorage delete resume error:', error)
    return false
  }
}

/**
 * Get the active resume ID from LocalStorage
 * @returns {string|null} - Active resume ID or null if none
 */
export const getActiveResumeId = () => {
  try {
    const activeId = localStorage.getItem(LOCAL_STORAGE_ACTIVE_RESUME_KEY)
    console.log(`✅ Active resume ID retrieved: ${activeId}`)
    return activeId
  } catch (error) {
    console.error('❌ LocalStorage get active resume ID error:', error)
    return null
  }
}

/**
 * Set the active resume ID in LocalStorage
 * @param {string|null} resumeId - Resume ID to set as active (null to clear)
 * @returns {boolean} - Success status
 */
export const setActiveResumeId = (resumeId) => {
  try {
    if (resumeId === null) {
      localStorage.removeItem(LOCAL_STORAGE_ACTIVE_RESUME_KEY)
    } else {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_RESUME_KEY, resumeId)
    }
    console.log(`✅ Active resume ID set to: ${resumeId}`)
    return true
  } catch (error) {
    console.error('❌ LocalStorage set active resume ID error:', error)
    return false
  }
}

/**
 * Save resume data to both LocalStorage and Firestore (if authenticated)
 * @param {Object} data - Resume data object
 * @returns {Promise<boolean>} - Success status
 */
export const saveResumeData = async (data) => {
  // Always save to LocalStorage first (works offline)
  const localSuccess = saveToLocalStorage(data)
  
  // Also save as active resume if it has an ID
  if (data.metadata?.id) {
    saveResumeById(data.metadata.id, data)
  }
  
  // Try to save to Firestore if user is logged in
  if (isFirebaseConfigured() && getCurrentUser()) {
    await saveToFirestore(data)
  }
  
  return localSuccess
}

/**
 * Load resume data (prioritizes Firestore if authenticated, falls back to LocalStorage)
 * @returns {Promise<Object|null>} - Resume data or null
 */
export const loadResumeData = async () => {
  // If user is authenticated, try loading from Firestore first
  if (isFirebaseConfigured() && getCurrentUser()) {
    const cloudData = await loadFromFirestore()
    if (cloudData) {
      // Also update LocalStorage with cloud data
      saveToLocalStorage(cloudData)
      // Also save as active resume
      if (cloudData.metadata?.id) {
        saveResumeById(cloudData.metadata.id, cloudData)
      }
      return cloudData
    }
  }
  
  // Fall back to LocalStorage active resume, then general local storage
  const activeResumeId = getActiveResumeId()
  if (activeResumeId) {
    const activeResume = loadResumeById(activeResumeId)
    if (activeResume) {
      return activeResume
    }
  }
  
  // Fall back to general local storage
  return loadFromLocalStorage()
}

// ==========================================
// INITIAL DATA STRUCTURE
// ==========================================

/**
 * Get empty resume data structure
 * @returns {Object} - Empty resume data object
 */
export const getEmptyResumeData = () => {
  return {
    profile: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      portfolio: '',
      location: '',
      objective: '',
      imageUrl: '',
    },
    education: [],
    experience: [],
    projects: [],
    skills: {
      languages: [],
      frameworks: [],
      tools: [],
      databases: [],
      other: [],
    },
    certifications: [],
    achievements: [],
    por: [], // Positions of Responsibility
    publications: [],
    extracurricular: [],
    languages: [],
    settings: {
      selectedTemplate: 'modern',
      theme: 'auto', // 'light', 'dark', 'auto'
      customization: {
        accentColor: '#3B82F6',
        fontFamily: 'Arial',
        fontSize: 11,
        spacing: 'normal', // 'compact', 'normal', 'spacious'
      },
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastSyncedAt: null,
    },
  }
}

/**
 * Initialize resume data (loads existing or creates new)
 * @returns {Promise<Object>} - Resume data
 */
export const initializeResumeData = async () => {
  const existingData = await loadResumeData()
   
  if (existingData) {
    console.log('✅ Existing resume data loaded')
    return existingData
  }

  console.log('✅ New resume data initialized')
  const emptyData = getEmptyResumeData()
  await saveResumeData(emptyData)
  return emptyData
}