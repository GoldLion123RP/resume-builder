import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with conflict resolution
 * 
 * Example:
 * cn('px-2 py-1', 'px-4') => 'py-1 px-4' (px-4 overrides px-2)
 * 
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Validate email address format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone number
 */
export function isValidPhoneNumber(phone) {
  // Basic phone validation - allows digits, spaces, dashes, parentheses, and +
  const phoneRegex = /^[\d\s\-\(\)\+]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

/**
 * Validate date range
 * @param {string} startDate - Start date in YYYY-MM format
 * @param {string} endDate - End date in YYYY-MM format
 * @returns {boolean} True if valid date range
 */
export function isValidDateRange(startDate, endDate) {
  if (!startDate) return false
  if (!endDate) return true // Current position doesn't need end date
  
  const start = new Date(startDate + '-01')
  const end = new Date(endDate + '-01')
  
  return end >= start
}