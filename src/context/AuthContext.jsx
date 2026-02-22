import { createContext, useState, useEffect, useCallback } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/lib/firebase'
import { syncLocalToCloud, mergeData } from '@/lib/storage'

// Create the context
export const AuthContext = createContext(null)

// Provider component
export const AuthProvider = ({ children }) => {
  // State
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authInitialized, setAuthInitialized] = useState(false)

  // ==========================================
  // AUTHENTICATION STATE LISTENER
  // ==========================================

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      console.log('ℹ️ Firebase not configured - Auth disabled')
      setLoading(false)
      setAuthInitialized(true)
      return
    }

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        })
        console.log('✅ User authenticated:', firebaseUser.email)
      } else {
        // User is signed out
        setUser(null)
        console.log('ℹ️ User signed out')
      }
      setLoading(false)
      setAuthInitialized(true)
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  // ==========================================
  // SIGN IN METHODS
  // ==========================================

  /**
   * Sign in with Email & Password
   */
  const signInWithEmail = useCallback(async (email, password) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase not configured')
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      // Sync local data to cloud after login
      await syncLocalToCloud()
      
      console.log('✅ Signed in with email')
      return result.user
    } catch (error) {
      console.error('❌ Email sign-in error:', error)
      throw error
    }
  }, [])

  /**
   * Sign up with Email & Password
   */
  const signUpWithEmail = useCallback(async (email, password, displayName = '') => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase not configured')
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update profile with display name
      if (displayName) {
        await updateProfile(result.user, { displayName })
      }

      // Sync local data to cloud after signup
      await syncLocalToCloud()
      
      console.log('✅ Signed up with email')
      return result.user
    } catch (error) {
      console.error('❌ Email sign-up error:', error)
      throw error
    }
  }, [])

  /**
   * Sign in with Google
   */
  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase not configured')
    }

    try {
      const provider = new GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      
      const result = await signInWithPopup(auth, provider)
      
      // Sync local data to cloud after login
      await syncLocalToCloud()
      
      console.log('✅ Signed in with Google')
      return result.user
    } catch (error) {
      console.error('❌ Google sign-in error:', error)
      throw error
    }
  }, [])

  /**
   * Sign in with GitHub
   */
  const signInWithGitHub = useCallback(async () => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase not configured')
    }

    try {
      const provider = new GithubAuthProvider()
      provider.addScope('user:email')
      
      const result = await signInWithPopup(auth, provider)
      
      // Sync local data to cloud after login
      await syncLocalToCloud()
      
      console.log('✅ Signed in with GitHub')
      return result.user
    } catch (error) {
      console.error('❌ GitHub sign-in error:', error)
      throw error
    }
  }, [])

  /**
   * Sign in with Facebook
   */
  const signInWithFacebook = useCallback(async () => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase not configured')
    }

    try {
      const provider = new FacebookAuthProvider()
      provider.addScope('email')
      
      const result = await signInWithPopup(auth, provider)
      
      // Sync local data to cloud after login
      await syncLocalToCloud()
      
      console.log('✅ Signed in with Facebook')
      return result.user
    } catch (error) {
      console.error('❌ Facebook sign-in error:', error)
      throw error
    }
  }, [])

  // ==========================================
  // SIGN OUT
  // ==========================================

  /**
   * Sign out current user
   */
  const logout = useCallback(async () => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase not configured')
    }

    try {
      await signOut(auth)
      console.log('✅ User signed out')
    } catch (error) {
      console.error('❌ Sign-out error:', error)
      throw error
    }
  }, [])

  // ==========================================
  // PASSWORD RESET
  // ==========================================

  /**
   * Send password reset email
   */
  const resetPassword = useCallback(async (email) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase not configured')
    }

    try {
      await sendPasswordResetEmail(auth, email)
      console.log('✅ Password reset email sent')
    } catch (error) {
      console.error('❌ Password reset error:', error)
      throw error
    }
  }, [])

  // ==========================================
  // DATA SYNC
  // ==========================================

  /**
   * Sync local data to cloud (manual trigger)
   */
  const syncToCloud = useCallback(async () => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    try {
      await syncLocalToCloud()
      console.log('✅ Data synced to cloud')
      return true
    } catch (error) {
      console.error('❌ Cloud sync error:', error)
      throw error
    }
  }, [user])

  /**
   * Merge local and cloud data (resolve conflicts)
   */
  const resolveDataConflict = useCallback(async (preference = 'cloud') => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    try {
      const mergedData = await mergeData(preference)
      console.log(`✅ Data merged (preference: ${preference})`)
      return mergedData
    } catch (error) {
      console.error('❌ Data merge error:', error)
      throw error
    }
  }, [user])

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    // State
    user,
    loading,
    authInitialized,
    isAuthenticated: !!user,
    isFirebaseEnabled: isFirebaseConfigured(),

    // Sign in methods
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithGitHub,
    signInWithFacebook,

    // Sign out
    logout,

    // Password reset
    resetPassword,

    // Data sync
    syncToCloud,
    resolveDataConflict,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}