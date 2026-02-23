import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Export resume as PDF
 * @param {string} fileName - Name of the PDF file (without extension)
 * @param {string} elementId - ID of the HTML element to capture (default: 'resume-preview')
 * @param {string} format - Paper format: 'a4' or 'letter' (default: 'letter')
 * @returns {Promise<boolean>} - Success status
 */
export const exportToPDF = async (fileName = 'Resume', elementId = 'resume-preview', format = 'letter') => {
  try {
    console.log('🔄 Starting PDF export...')

    // Get the resume preview element
    const element = document.getElementById(elementId)
    
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`)
    }

    // Show loading state (optional - you can add a toast/notification here)
    console.log('📸 Capturing resume as image...')

    // Capture the element as canvas with high quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale = better quality
      useCORS: true, // Allow cross-origin images
      logging: false, // Disable console logs
      backgroundColor: '#ffffff', // White background
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    })

    console.log('✅ Image captured successfully')

    // Get canvas dimensions
    const imgWidth = canvas.width
    const imgHeight = canvas.height

    // Define PDF dimensions based on format
    let pdfWidth, pdfHeight
    
    if (format === 'a4') {
      pdfWidth = 210  // A4 width in mm
      pdfHeight = 297 // A4 height in mm
    } else {
      // Letter size (8.5 x 11 inches = 215.9 x 279.4 mm)
      pdfWidth = 215.9
      pdfHeight = 279.4
    }

    // Calculate scaling to fit image in PDF
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const scaledWidth = imgWidth * ratio
    const scaledHeight = imgHeight * ratio

    console.log('📄 Creating PDF document...')

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: format === 'a4' ? 'a4' : 'letter',
      compress: true,
    })

    // Convert canvas to image
    const imgData = canvas.toDataURL('image/png', 1.0)

    // Add image to PDF (centered)
    const xOffset = (pdfWidth - scaledWidth) / 2
    const yOffset = 0 // Top aligned

    pdf.addImage(
      imgData,
      'PNG',
      xOffset,
      yOffset,
      scaledWidth,
      scaledHeight,
      undefined,
      'FAST' // Compression
    )

    console.log('💾 Saving PDF...')

    // Save the PDF
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_') // Remove special characters
    pdf.save(`${safeFileName}.pdf`)

    console.log('✅ PDF exported successfully!')

    return true
  } catch (error) {
    console.error('❌ PDF export error:', error)
    throw new Error(`Failed to export PDF: ${error.message}`)
  }
}

/**
 * Get suggested filename from profile data
 * @param {Object} profileData - Profile section data
 * @returns {string} - Formatted filename
 */
export const getSuggestedFilename = (profileData = {}) => {
  const { fullName } = profileData

  if (fullName) {
    // Format: FirstName_LastName_Resume
    return `${fullName.replace(/\s+/g, '_')}_Resume`
  }

  return 'Resume'
}

/**
 * Prepare resume for export (apply print styles)
 * @param {string} elementId - ID of element to prepare
 */
export const prepareForExport = (elementId = 'resume-preview') => {
  const element = document.getElementById(elementId)
  
  if (element) {
    // Add print-optimized class
    element.classList.add('print-mode')
    
    // Force white background
    element.style.backgroundColor = '#ffffff'
    
    // Ensure all images are loaded
    const images = element.getElementsByTagName('img')
    const imageLoadPromises = Array.from(images).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve()
        } else {
          img.onload = resolve
          img.onerror = resolve
        }
      })
    })
    
    return Promise.all(imageLoadPromises)
  }
  
  return Promise.resolve()
}

/**
 * Clean up after export
 * @param {string} elementId - ID of element to clean
 */
export const cleanupAfterExport = (elementId = 'resume-preview') => {
  const element = document.getElementById(elementId)
  
  if (element) {
    element.classList.remove('print-mode')
    element.style.backgroundColor = ''
  }
}