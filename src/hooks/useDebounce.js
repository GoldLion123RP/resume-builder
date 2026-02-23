import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * useDebounce - Debounces a value
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {any} - The debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearch = useDebounce(searchTerm, 300)
 * 
 * useEffect(() => {
 *   // This runs only after user stops typing for 300ms
 *   searchAPI(debouncedSearch)
 * }, [debouncedSearch])
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set up timeout to update debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clear timeout if value changes before delay completes
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * useDebouncedCallback - Debounces a callback function
 * 
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @param {Array} dependencies - Dependencies array for the callback
 * @returns {Function} - The debounced callback
 * 
 * @example
 * const debouncedSave = useDebouncedCallback((data) => {
 *   saveToServer(data)
 * }, 1000, [])
 * 
 * // Call it normally - it will only execute after 1s of inactivity
 * debouncedSave(formData)
 */
export const useDebouncedCallback = (callback, delay = 500, dependencies = []) => {
  const timeoutRef = useRef(null)
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Create debounced function
  const debouncedCallback = useCallback((...args) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }, [delay, ...dependencies])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}

/**
 * useThrottle - Throttles a value (executes at most once per interval)
 * 
 * @param {any} value - The value to throttle
 * @param {number} interval - Minimum interval between updates in ms (default: 500ms)
 * @returns {any} - The throttled value
 * 
 * @example
 * const [scrollY, setScrollY] = useState(0)
 * const throttledScrollY = useThrottle(scrollY, 100)
 */
export const useThrottle = (value, interval = 500) => {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecuted = useRef(Date.now())

  useEffect(() => {
    const now = Date.now()
    const timeSinceLastExecution = now - lastExecuted.current

    if (timeSinceLastExecution >= interval) {
      lastExecuted.current = now
      setThrottledValue(value)
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now()
        setThrottledValue(value)
      }, interval - timeSinceLastExecution)

      return () => clearTimeout(timer)
    }
  }, [value, interval])

  return throttledValue
}

/**
 * useDebouncedState - useState with built-in debouncing
 * 
 * @param {any} initialValue - Initial state value
 * @param {number} delay - Debounce delay in ms (default: 500ms)
 * @returns {Array} - [debouncedValue, setValue, immediateValue]
 * 
 * @example
 * const [debouncedSearch, setSearch, immediateSearch] = useDebouncedState('', 300)
 * 
 * <input 
 *   value={immediateSearch} // Shows immediately for responsive UI
 *   onChange={(e) => setSearch(e.target.value)}
 * />
 * // debouncedSearch updates after 300ms of no typing
 */
export const useDebouncedState = (initialValue, delay = 500) => {
  const [immediateValue, setImmediateValue] = useState(initialValue)
  const debouncedValue = useDebounce(immediateValue, delay)

  return [debouncedValue, setImmediateValue, immediateValue]
}

/**
 * useAutoSave - Auto-save hook with debouncing
 * 
 * @param {any} data - Data to save
 * @param {Function} saveFunction - Function to call for saving
 * @param {number} delay - Debounce delay in ms (default: 2000ms)
 * @param {boolean} enabled - Whether auto-save is enabled (default: true)
 * @returns {Object} - { isSaving, lastSaved, saveNow }
 * 
 * @example
 * const { isSaving, lastSaved, saveNow } = useAutoSave(
 *   formData,
 *   async (data) => await api.save(data),
 *   2000
 * )
 */
export const useAutoSave = (data, saveFunction, delay = 2000, enabled = true) => {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [error, setError] = useState(null)
  const isFirstRender = useRef(true)
  const dataRef = useRef(data)

  // Update data ref
  useEffect(() => {
    dataRef.current = data
  }, [data])

  // Debounced save
  const debouncedSave = useDebouncedCallback(
    async () => {
      if (!enabled) return

      setIsSaving(true)
      setError(null)

      try {
        await saveFunction(dataRef.current)
        setLastSaved(new Date())
      } catch (err) {
        setError(err)
        console.error('Auto-save error:', err)
      } finally {
        setIsSaving(false)
      }
    },
    delay,
    [saveFunction, enabled]
  )

  // Trigger save when data changes (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (enabled) {
      debouncedSave()
    }
  }, [data, enabled, debouncedSave])

  // Manual save function
  const saveNow = useCallback(async () => {
    setIsSaving(true)
    setError(null)

    try {
      await saveFunction(dataRef.current)
      setLastSaved(new Date())
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setIsSaving(false)
    }
  }, [saveFunction])

  return { isSaving, lastSaved, error, saveNow }
}

// Default export
export default useDebounce