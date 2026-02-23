import { useEffect, useState } from 'react'

// Icons for different toast types
const Icons = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

// Toast styles for different types
const toastStyles = {
  success: {
    container: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
    icon: 'text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900/50',
    title: 'text-green-800 dark:text-green-200',
    message: 'text-green-700 dark:text-green-300',
  },
  error: {
    container: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
    icon: 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/50',
    title: 'text-red-800 dark:text-red-200',
    message: 'text-red-700 dark:text-red-300',
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-500 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/50',
    title: 'text-yellow-800 dark:text-yellow-200',
    message: 'text-yellow-700 dark:text-yellow-300',
  },
  info: {
    container: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50',
    title: 'text-blue-800 dark:text-blue-200',
    message: 'text-blue-700 dark:text-blue-300',
  },
}

// Single Toast Component
const ToastItem = ({ toast, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const styles = toastStyles[toast.type] || toastStyles.info
  const icon = Icons[toast.type] || Icons.info

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setIsVisible(true), 10)

    // Auto dismiss
    const dismissTimer = setTimeout(() => {
      handleDismiss()
    }, toast.duration || 4000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(dismissTimer)
    }
  }, [toast.duration])

  const handleDismiss = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onDismiss(toast.id)
    }, 300)
  }

  return (
    <div
      className={`
        w-full max-w-sm rounded-lg border shadow-lg overflow-hidden
        transform transition-all duration-300 ease-out
        ${styles.container}
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${styles.icon}`}>
            {icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {toast.title && (
              <p className={`font-semibold text-sm ${styles.title}`}>
                {toast.title}
              </p>
            )}
            {toast.message && (
              <p className={`text-sm mt-0.5 ${styles.message}`}>
                {toast.message}
              </p>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className={`flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${styles.title}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {toast.showProgress !== false && (
          <div className="mt-3 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${styles.icon.split(' ')[0].replace('text', 'bg')} transition-all ease-linear`}
              style={{
                animation: `shrink ${toast.duration || 4000}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      {/* CSS for progress bar animation */}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

// Toast Container Component
const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  )
}

export { ToastItem, ToastContainer }
export default ToastContainer