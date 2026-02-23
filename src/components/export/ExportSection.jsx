// import { useState } from 'react'
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Label } from '@/components/ui/label'
// import useResume from '@/hooks/useResume'
// import { exportToPDF, getSuggestedFilename, prepareForExport, cleanupAfterExport } from '@/lib/export/pdfExport'

// const ExportSection = () => {
//   const { resumeData } = useResume()
//   const [isExporting, setIsExporting] = useState(false)
//   const [exportFormat, setExportFormat] = useState('letter') // 'letter' or 'a4'
//   const [lastExported, setLastExported] = useState(null)

//   const suggestedFilename = getSuggestedFilename(resumeData?.profile)

//   // Handle PDF Export
//   const handlePDFExport = async () => {
//     setIsExporting(true)
    
//     try {
//       // Prepare element for export
//       await prepareForExport('resume-preview')
      
//       // Small delay to ensure rendering is complete
//       await new Promise(resolve => setTimeout(resolve, 100))
      
//       // Export to PDF
//       await exportToPDF(suggestedFilename, 'resume-preview', exportFormat)
      
//       // Track successful export
//       setLastExported({
//         format: 'PDF',
//         time: new Date(),
//       })
      
//       // Show success notification (you can add toast here)
//       console.log('✅ PDF downloaded successfully!')
      
//     } catch (error) {
//       console.error('Export error:', error)
//       alert(`Failed to export PDF: ${error.message}`)
//     } finally {
//       // Cleanup
//       cleanupAfterExport('resume-preview')
//       setIsExporting(false)
//     }
//   }

//   // Placeholder for DOCX export (will implement in next prompt)
//   const handleDOCXExport = () => {
//     alert('DOCX export will be available in the next update!')
//   }

//   // Placeholder for TXT export (will implement in next prompt)
//   const handleTXTExport = () => {
//     alert('Plain text export will be available in the next update!')
//   }

//   return (
//     <div className="space-y-6">
//       {/* Export Options */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Export Your Resume</CardTitle>
//           <CardDescription>
//             Download your resume in multiple formats. Choose the format that best suits your needs.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* PDF Export */}
//           <div className="space-y-3">
//             <div className="flex items-start gap-3">
//               <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
//                 <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
//                   PDF Format (Recommended)
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                   Universal format, preserves formatting perfectly. Best for email submissions and printing.
//                 </p>
                
//                 {/* Paper Format Selector */}
//                 <div className="mb-3">
//                   <Label className="text-sm mb-2">Paper Format</Label>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setExportFormat('letter')}
//                       className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
//                         exportFormat === 'letter'
//                           ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
//                           : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
//                       }`}
//                     >
//                       Letter (8.5" × 11")
//                     </button>
//                     <button
//                       onClick={() => setExportFormat('a4')}
//                       className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
//                         exportFormat === 'a4'
//                           ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
//                           : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
//                       }`}
//                     >
//                       A4 (210mm × 297mm)
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {exportFormat === 'letter' ? 'Standard in US, Canada' : 'Standard in most countries'}
//                   </p>
//                 </div>

//                 <Button
//                   onClick={handlePDFExport}
//                   disabled={isExporting}
//                   size="lg"
//                   className="w-full sm:w-auto"
//                 >
//                   {isExporting ? (
//                     <>
//                       <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
//                       Exporting PDF...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                       </svg>
//                       Download PDF
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

//           {/* DOCX Export */}
//           <div className="space-y-3">
//             <div className="flex items-start gap-3">
//               <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
//                   DOCX Format (Editable)
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                   Microsoft Word format. Perfect for further customization and editing.
//                 </p>
//                 <Button
//                   onClick={handleDOCXExport}
//                   variant="outline"
//                   size="lg"
//                   className="w-full sm:w-auto"
//                   disabled
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                   </svg>
//                   Download DOCX (Coming Soon)
//                 </Button>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

//           {/* TXT Export */}
//           <div className="space-y-3">
//             <div className="flex items-start gap-3">
//               <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
//                 <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
//                   Plain Text Format
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                   Simple text file. Useful for copy-pasting into application forms or ATS systems.
//                 </p>
//                 <Button
//                   onClick={handleTXTExport}
//                   variant="outline"
//                   size="lg"
//                   className="w-full sm:w-auto"
//                   disabled
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                   </svg>
//                   Download TXT (Coming Soon)
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Last Exported Info */}
//           {lastExported && (
//             <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
//               <p className="text-sm text-green-800 dark:text-green-200">
//                 ✅ Last exported as {lastExported.format} at {lastExported.time.toLocaleTimeString()}
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Export Tips */}
//       <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
//         <CardContent className="pt-6">
//           <div className="flex gap-3">
//             <div className="flex-shrink-0">
//               <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
//                 💡 Export Tips
//               </h4>
//               <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
//                 <li>• <strong>Preview first:</strong> Always check the Preview section before exporting</li>
//                 <li>• <strong>ATS systems:</strong> Use the ATS-Friendly template when applying through job portals</li>
//                 <li>• <strong>Email submissions:</strong> PDF is the safest format (preserves all formatting)</li>
//                 <li>• <strong>File naming:</strong> Use format like "FirstName_LastName_Resume.pdf"</li>
//                 <li>• <strong>Multiple versions:</strong> Create different versions for different job types</li>
//                 <li>• <strong>Paper size:</strong> Use Letter for US/Canada, A4 for rest of the world</li>
//               </ul>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Suggested Filename */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex items-center gap-3">
//             <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <div>
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Your resume will be saved as:
//               </p>
//               <p className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
//                 {suggestedFilename}.pdf
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default ExportSection





import { useState } from 'react'
import useResume from '../../hooks/useResume'
import { exportToPdf } from '../../lib/export/pdfExport'
import { exportToDocx } from '../../lib/export/docxExport'
import { exportToTxt, copyToClipboard, getPlainTextContent } from '../../lib/export/txtExport'

// Icons as simple SVG components
const PdfIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
    <path d="M8 12h1.5v4H8v-4zm2.5 0h1.5l1 2.5 1-2.5h1.5v4h-1v-2.5l-.75 2h-.5l-.75-2V16h-1v-4zm5.5 0h2.5v1h-1.5v.5h1.5v1h-1.5v.5h1.5v1H16v-4z"/>
  </svg>
)

const DocxIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
    <path d="M8 13h1l.5 2.5.5-2.5h1l-.75 3.5h-1.5L8 13zm4 0h1.5c.5 0 1 .5 1 1v1.5c0 .5-.5 1-1 1H12v-3.5zm1 2.5v-1.5h.5v1.5h-.5zm2-2.5h1.5v.5H17v.75h.5v.5H17v.75h.5v.5H16V13z"/>
  </svg>
)

const TxtIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
    <path d="M8 13v1h1.5v3h1v-3H12v-1H8zm4.5 0v4h1v-1.5h.5l.5 1.5h1l-.6-1.7c.4-.2.6-.6.6-1.1 0-.7-.5-1.2-1.2-1.2h-1.8zm1 1.5v-1h.5c.3 0 .5.2.5.5s-.2.5-.5.5h-.5z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const SpinnerIcon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

function ExportSection() {
  const { resumeData } = useResume()
  const [loading, setLoading] = useState({
    pdf: false,
    pdfAts: false,
    docx: false,
    txt: false,
  })
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Check if resume has any data
  const hasData = () => {
    if (!resumeData) return false
    
    const { profile, education, experience, projects, skills } = resumeData
    
    return (
      profile?.fullName ||
      profile?.email ||
      (education && education.length > 0) ||
      (experience && experience.length > 0) ||
      (projects && projects.length > 0) ||
      (skills && skills.length > 0)
    )
  }

  // Show message helper
  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  // PDF Export Handler
  const handlePdfExport = async (atsMode = false) => {
    const loadingKey = atsMode ? 'pdfAts' : 'pdf'
    setLoading((prev) => ({ ...prev, [loadingKey]: true }))

    try {
      const result = await exportToPdf(resumeData, { atsMode })
      showMessage('success', `✅ ${result.fileName} downloaded successfully!`)
    } catch (error) {
      showMessage('error', `❌ ${error.message}`)
    } finally {
      setLoading((prev) => ({ ...prev, [loadingKey]: false }))
    }
  }

  // DOCX Export Handler
  const handleDocxExport = async () => {
    setLoading((prev) => ({ ...prev, docx: true }))

    try {
      const result = await exportToDocx(resumeData)
      showMessage('success', `✅ ${result.fileName} downloaded successfully!`)
    } catch (error) {
      showMessage('error', `❌ ${error.message}`)
    } finally {
      setLoading((prev) => ({ ...prev, docx: false }))
    }
  }

  // TXT Export Handler
  const handleTxtExport = async () => {
    setLoading((prev) => ({ ...prev, txt: true }))

    try {
      const result = await exportToTxt(resumeData)
      showMessage('success', `✅ ${result.fileName} downloaded successfully!`)
    } catch (error) {
      showMessage('error', `❌ ${error.message}`)
    } finally {
      setLoading((prev) => ({ ...prev, txt: false }))
    }
  }

  // Copy to Clipboard Handler
  const handleCopyToClipboard = async () => {
    try {
      await copyToClipboard(resumeData)
      setCopied(true)
      showMessage('success', '✅ Resume copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      showMessage('error', `❌ ${error.message}`)
    }
  }

  // Get plain text for preview
  const plainTextContent = showPreview ? getPlainTextContent(resumeData) : ''

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📥 Export Resume
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Download your resume in multiple formats. Choose the format that best suits your needs.
        </p>
      </div>

      {/* Message Display */}
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* No Data Warning */}
      {!hasData() && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-700 dark:text-yellow-400">
            ⚠️ Your resume appears to be empty. Add some content in the sections before exporting.
          </p>
        </div>
      )}

      {/* Export Format Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* PDF Export Card */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <PdfIcon />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">PDF Format</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Best for sharing & printing</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Export a beautifully formatted PDF document. Perfect for email attachments and printing.
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handlePdfExport(false)}
              disabled={loading.pdf || !hasData()}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.pdf ? <SpinnerIcon /> : <DownloadIcon />}
              {loading.pdf ? 'Generating...' : 'Download Beautiful PDF'}
            </button>
            
            <button
              onClick={() => handlePdfExport(true)}
              disabled={loading.pdfAts || !hasData()}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.pdfAts ? <SpinnerIcon /> : <DownloadIcon />}
              {loading.pdfAts ? 'Generating...' : 'Download ATS-Friendly PDF'}
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 Use ATS-Friendly for job application systems
          </p>
        </div>

        {/* DOCX Export Card */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <DocxIcon />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Word Document</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Editable DOCX format</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Export as Microsoft Word document. Ideal when you need to make further edits or customize formatting.
          </p>

          <button
            onClick={handleDocxExport}
            disabled={loading.docx || !hasData()}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading.docx ? <SpinnerIcon /> : <DownloadIcon />}
            {loading.docx ? 'Generating...' : 'Download DOCX'}
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 Opens in Microsoft Word, Google Docs, LibreOffice
          </p>
        </div>

        {/* TXT Export Card */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
              <TxtIcon />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Plain Text</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Simple TXT format</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Export as plain text file. Perfect for copying into online forms or ATS systems.
          </p>

          <div className="space-y-2">
            <button
              onClick={handleTxtExport}
              disabled={loading.txt || !hasData()}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.txt ? <SpinnerIcon /> : <DownloadIcon />}
              {loading.txt ? 'Generating...' : 'Download TXT'}
            </button>

            <button
              onClick={handleCopyToClipboard}
              disabled={!hasData()}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 Best for online application forms
          </p>
        </div>
      </div>

      {/* Plain Text Preview Section */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Plain Text Preview</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Preview how your resume looks in plain text format
            </p>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary flex items-center gap-2"
          >
            <EyeIcon />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {showPreview && (
          <div className="relative">
            <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 max-h-96 overflow-y-auto whitespace-pre-wrap">
              {plainTextContent || 'No content to preview. Add some data to your resume sections.'}
            </pre>
            {plainTextContent && (
              <button
                onClick={handleCopyToClipboard}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600"
                title="Copy to clipboard"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Export Tips */}
      <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 Export Tips
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span><strong>PDF (Beautiful):</strong> Best for direct submissions, portfolio websites, and printing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span><strong>PDF (ATS-Friendly):</strong> Optimized for Applicant Tracking Systems - use when applying through job portals</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span><strong>DOCX:</strong> When employers specifically request an editable document or Word format</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span><strong>Plain Text:</strong> For copying into online application forms or LinkedIn summaries</span>
          </li>
        </ul>
      </div>

      {/* Format Comparison Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Format Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-300 font-medium">Feature</th>
                <th className="px-4 py-3 text-center text-gray-600 dark:text-gray-300 font-medium">PDF</th>
                <th className="px-4 py-3 text-center text-gray-600 dark:text-gray-300 font-medium">DOCX</th>
                <th className="px-4 py-3 text-center text-gray-600 dark:text-gray-300 font-medium">TXT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Visual Formatting</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Full</td>
                <td className="px-4 py-3 text-center text-gray-400">✗ None</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Editable</td>
                <td className="px-4 py-3 text-center text-gray-400">✗ No</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Yes</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">ATS Compatible</td>
                <td className="px-4 py-3 text-center text-yellow-600 dark:text-yellow-400">~ Varies</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Good</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Best</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">File Size</td>
                <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">Medium</td>
                <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">Small</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">Tiny</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Universal Support</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Excellent</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Good</td>
                <td className="px-4 py-3 text-center text-green-600 dark:text-green-400">✓ Universal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExportSection