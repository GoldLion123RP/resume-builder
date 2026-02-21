// Import Firebase SDK modules
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration from environment variables
// These values come from .env.local file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '', // Optional
}

// Initialize Firebase only if API key exists
let app = null
let auth = null
let db = null

try {
  // Check if Firebase is configured
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    // Initialize Firebase app
    app = initializeApp(firebaseConfig)
    
    // Initialize Authentication
    auth = getAuth(app)
    
    // Initialize Firestore Database
    db = getFirestore(app)
    
    console.log('✅ Firebase initialized successfully')
  } else {
    console.warn('⚠️ Firebase not configured. App will work in offline mode only.')
    console.warn('Create .env.local file with your Firebase credentials to enable cloud sync.')
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message)
  console.warn('App will continue in offline mode.')
}

// Export Firebase instances
export { app, auth, db }

// Helper function to check if Firebase is available
export const isFirebaseConfigured = () => {
  return app !== null && auth !== null && db !== null
}

// Helper function to get current user
export const getCurrentUser = () => {
  if (!auth) return null
  return auth.currentUser
}

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return getCurrentUser() !== null
}