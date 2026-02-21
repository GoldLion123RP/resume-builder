/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode with class strategy
  darkMode: 'class',
  
  // Scan these files for Tailwind classes
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      // Custom color palette
      colors: {
        // Primary colors (customizable accent)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Default blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        
        // Neutral grays for light/dark mode
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      
      // Font families for resume templates
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['Consolas', 'Monaco', 'monospace'],
        
        // Resume-specific fonts
        arial: ['Arial', 'Helvetica', 'sans-serif'],
        calibri: ['Calibri', 'Arial', 'sans-serif'],
        garamond: ['Garamond', 'Georgia', 'serif'],
        lato: ['Lato', 'Arial', 'sans-serif'],
        times: ['Times New Roman', 'Times', 'serif'],
      },
      
      // Custom spacing for resume layouts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Custom max-width for resume container
      maxWidth: {
        'resume': '8.5in', // Standard letter width
        'a4': '210mm',     // A4 paper width
      },
      
      // Print-specific styles
      screens: {
        'print': {'raw': 'print'},
      },
      
      // Box shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'resume': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      
      // Border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  
  plugins: [],
}