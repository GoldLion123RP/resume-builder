import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import useResume from '@/hooks/useResume'
import { exportToPDF, getSuggestedFilename, prepareForExport, cleanupAfterExport } from '@/lib/export/pdfExport'

const ExportSection = () => {
  const { resumeData } = useResume()
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState('letter') // 'letter' or 'a4'
  const [lastExported, setLastExported] = useState(null)

  const suggestedFilename = getSuggestedFilename(resumeData?.profile)

  // Handle PDF Export
  const handlePDFExport = async () => {
    setIsExporting(true)
    
    try {
      // Prepare element for export
      await prepareForExport('resume-preview')
      
      // Small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Export to PDF
      await exportToPDF(suggestedFilename, 'resume-preview', exportFormat)
      
      // Track successful export
      setLastExported({
        format: 'PDF',
        time: new Date(),
      })
      
      // Show success notification (you can add toast here)
      console.log('✅ PDF downloaded successfully!')
      
    } catch (error) {
      console.error('Export error:', error)
      alert(`Failed to export PDF: ${error.message}`)
    } finally {
      // Cleanup
      cleanupAfterExport('resume-preview')
      setIsExporting(false)
    }
  }

  // Placeholder for DOCX export (will implement in next prompt)
  const handleDOCXExport = () => {
    alert('DOCX export will be available in the next update!')
  }

  // Placeholder for TXT export (will implement in next prompt)
  const handleTXTExport = () => {
    alert('Plain text export will be available in the next update!')
  }

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Your Resume</CardTitle>
          <CardDescription>
            Download your resume in multiple formats. Choose the format that best suits your needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* PDF Export */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  PDF Format (Recommended)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Universal format, preserves formatting perfectly. Best for email submissions and printing.
                </p>
                
                {/* Paper Format Selector */}
                <div className="mb-3">
                  <Label className="text-sm mb-2">Paper Format</Label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExportFormat('letter')}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        exportFormat === 'letter'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      Letter (8.5" × 11")
                    </button>
                    <button
                      onClick={() => setExportFormat('a4')}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        exportFormat === 'a4'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      A4 (210mm × 297mm)
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {exportFormat === 'letter' ? 'Standard in US, Canada' : 'Standard in most countries'}
                  </p>
                </div>

                <Button
                  onClick={handlePDFExport}
                  disabled={isExporting}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Exporting PDF...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

          {/* DOCX Export */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  DOCX Format (Editable)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Microsoft Word format. Perfect for further customization and editing.
                </p>
                <Button
                  onClick={handleDOCXExport}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download DOCX (Coming Soon)
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

          {/* TXT Export */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Plain Text Format
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Simple text file. Useful for copy-pasting into application forms or ATS systems.
                </p>
                <Button
                  onClick={handleTXTExport}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download TXT (Coming Soon)
                </Button>
              </div>
            </div>
          </div>

          {/* Last Exported Info */}
          {lastExported && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                ✅ Last exported as {lastExported.format} at {lastExported.time.toLocaleTimeString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Tips */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                💡 Export Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• <strong>Preview first:</strong> Always check the Preview section before exporting</li>
                <li>• <strong>ATS systems:</strong> Use the ATS-Friendly template when applying through job portals</li>
                <li>• <strong>Email submissions:</strong> PDF is the safest format (preserves all formatting)</li>
                <li>• <strong>File naming:</strong> Use format like "FirstName_LastName_Resume.pdf"</li>
                <li>• <strong>Multiple versions:</strong> Create different versions for different job types</li>
                <li>• <strong>Paper size:</strong> Use Letter for US/Canada, A4 for rest of the world</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Filename */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your resume will be saved as:
              </p>
              <p className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
                {suggestedFilename}.pdf
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExportSection