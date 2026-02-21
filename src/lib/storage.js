import { doc, setDoc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured, getCurrentUser } from './firebase'

// LocalStorage key for resume data
const LOCAL_STORAGE_KEY = 'resumeBuilderData'

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
 * Save resume data to both LocalStorage and Firestore (if authenticated)
 * @param {Object} data - Resume data object
 * @returns {Promise<boolean>} - Success status
 */
export const saveResumeData = async (data) => {
  // Always save to LocalStorage first (works offline)
  const localSuccess = saveToLocalStorage(data)

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
      return cloudData
    }
  }

  // Fall back to LocalStorage
  return loadFromLocalStorage()
}

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