import { createContext, useContext, useState, useCallback } from 'react'
import ToastContainer from '@/components/ui/Toast'

// Create context
const ToastContext = createContext(null)

// Generate unique ID
const generateId = () => `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  // Add a toast
  const showToast = useCallback((options) => {
    const toast = {
      id: generateId(),
      type: 'info',
      duration: 4000,
      showProgress: true,
      ...options,
    }

    setToasts((prev) => [...prev, toast])

    return toast.id
  }, [])

  // Remove a toast
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Clear all toasts
  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Shortcut methods
  const success = useCallback((message, options = {}) => {
    return showToast({
      type: 'success',
      title: 'Success',
      message,
      ...options,
    })
  }, [showToast])

  const error = useCallback((message, options = {}) => {
    return showToast({
      type: 'error',
      title: 'Error',
      message,
      duration: 6000, // Errors stay longer
      ...options,
    })
  }, [showToast])

  const warning = useCallback((message, options = {}) => {
    return showToast({
      type: 'warning',
      title: 'Warning',
      message,
      duration: 5000,
      ...options,
    })
  }, [showToast])

  const info = useCallback((message, options = {}) => {
    return showToast({
      type: 'info',
      title: 'Info',
      message,
      ...options,
    })
  }, [showToast])

  // Promise-based toast (for async operations)
  const promise = useCallback(async (promiseFn, options = {}) => {
    const {
      loading = 'Loading...',
      success: successMsg = 'Success!',
      error: errorMsg = 'Something went wrong',
    } = options

    const toastId = showToast({
      type: 'info',
      message: loading,
      duration: Infinity, // Don't auto-dismiss while loading
      showProgress: false,
    })

    try {
      const result = await promiseFn()
      
      // Update toast to success
      setToasts((prev) =>
        prev.map((t) =>
          t.id === toastId
            ? {
                ...t,
                type: 'success',
                title: 'Success',
                message: typeof successMsg === 'function' ? successMsg(result) : successMsg,
                duration: 4000,
                showProgress: true,
              }
            : t
        )
      )

      // Schedule dismissal
      setTimeout(() => dismissToast(toastId), 4000)

      return result
    } catch (err) {
      // Update toast to error
      setToasts((prev) =>
        prev.map((t) =>
          t.id === toastId
            ? {
                ...t,
                type: 'error',
                title: 'Error',
                message: typeof errorMsg === 'function' ? errorMsg(err) : errorMsg,
                duration: 6000,
                showProgress: true,
              }
            : t
        )
      )

      // Schedule dismissal
      setTimeout(() => dismissToast(toastId), 6000)

      throw err
    }
  }, [showToast, dismissToast])

  const value = {
    toasts,
    showToast,
    dismissToast,
    clearAllToasts,
    // Shortcut methods
    success,
    error,
    warning,
    info,
    promise,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export default ToastContext