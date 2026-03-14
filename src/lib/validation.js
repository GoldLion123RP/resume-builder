import { isValidEmail, isValidPhoneNumber, isValidDateRange } from './utils';

/**
 * Validation rules for different field types
 */
export const validationRules = {
  // Email validation
  email: {
    validate: (value) => {
      if (!value) return 'Email is required';
      if (!isValidEmail(value)) return 'Please enter a valid email address';
      return '';
    }
  },
  
  // Phone validation
  phone: {
    validate: (value) => {
      if (!value) return 'Phone number is required';
      if (!isValidPhoneNumber(value)) return 'Please enter a valid phone number';
      return '';
    }
  },
  
  // Required text validation
  required: {
    validate: (value) => {
      if (!value || value.trim() === '') return 'This field is required';
      return '';
    }
  },
  
  // Date validation
  date: {
    validate: (value, fieldName) => {
      if (!value) return `${fieldName} is required`;
      // Basic date format validation (YYYY-MM for month inputs)
      if (!/^\d{4}-\d{2}$/.test(value)) return `Please enter a valid ${fieldName}`;
      return '';
    }
  },
  
  // Date range validation
  dateRange: {
    validate: (startDate, endDate, isCurrent) => {
      if (!startDate) return 'Start date is required';
      if (!isCurrent && !endDate) return 'End date is required';
      
      // Validate date format
      if (!/^\d{4}-\d{2}$/.test(startDate)) return 'Please enter a valid start date';
      if (!isCurrent && endDate && !/^\d{4}-\d{2}$/.test(endDate)) {
        return 'Please enter a valid end date';
      }
      
      // Validate that end date is after start date
      if (!isCurrent && startDate && endDate) {
        const start = new Date(startDate + '-01');
        const end = new Date(endDate + '-01');
        if (end < start) return 'End date must be after start date';
      }
      
      return '';
    }
  },
  
  // CGPA validation
  cgpa: {
    validate: (value, maxValue) => {
      if (value === '') return ''; // Optional field
      const numValue = parseFloat(value);
      const maxNum = parseFloat(maxValue || '10');
      
      if (isNaN(numValue)) return 'Please enter a valid number';
      if (numValue < 0) return 'CGPA cannot be negative';
      if (numValue > maxNum) return `CGPA cannot exceed ${maxNum}`;
      
      return '';
    }
  },
  
  // URL validation
  url: {
    validate: (value) => {
      if (value === '') return ''; // Optional field
      try {
        new URL(value);
        return '';
      } catch (e) {
        return 'Please enter a valid URL';
      }
    }
  }
};

/**
 * Helper function to validate a field
 * @param {string} ruleName - Name of the validation rule to use
 * @param {any} value - Field value to validate
 * @param {any} additionalArgs - Additional arguments for validation
 * @returns {string} Error message or empty string if valid
 */
export function validateField(ruleName, value, ...additionalArgs) {
  const rule = validationRules[ruleName];
  if (!rule) {
    console.warn(`Validation rule "${ruleName}" not found`);
    return '';
  }
  
  return rule.validate(value, ...additionalArgs);
}

/**
 * Validate all fields in a section and return errors
 * @param {Object} fieldValues - Object containing field values
 * @param {Object} fieldRules - Object mapping field names to validation rules
 * @returns {Object} Object mapping field names to error messages
 */
export function validateSection(fieldValues, fieldRules) {
  const errors = {};
  
  for (const [fieldName, rule] of Object.entries(fieldRules)) {
    const value = fieldValues[fieldName];
    
    if (typeof rule === 'string') {
      // Simple rule name
      errors[fieldName] = validateField(rule, value);
    } else if (rule.validate) {
      // Rule object with validate function
      errors[fieldName] = rule.validate(value, ...(rule.args || []));
    } else if (Array.isArray(rule)) {
      // Array of rules to apply sequentially
      for (const subRule of rule) {
        const error = validateField(subRule, value);
        if (error) {
          errors[fieldName] = error;
          break;
        }
      }
      if (!errors[fieldName]) errors[fieldName] = '';
    }
  }
  
  return errors;
}