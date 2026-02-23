import { useState } from 'react'
import useResume from '@/hooks/useResume'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Import all templates
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import TwoColumnTemplate from './templates/TwoColumnTemplate'
import CompactTemplate from './templates/CompactTemplate'
import ATSTemplate from './templates/ATSTemplate'

const ResumePreview = () => {
  const { resumeData, updateSettings } = useResume()
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading resume data...</p>
      </div>
    )
  }

  const selectedTemplate = resumeData?.settings?.selectedTemplate || 'modern'

  // Template configuration
  const templates = [
    { id: 'classic', name: 'Classic', icon: '📜', component: ClassicTemplate },
    { id: 'modern', name: 'Modern', icon: '✨', component: ModernTemplate },
    { id: 'minimal', name: 'Minimal', icon: '⚪', component: MinimalTemplate },
    { id: 'two-column', name: 'Two-Column', icon: '📊', component: TwoColumnTemplate },
    { id: 'compact', name: 'Compact', icon: '📋', component: CompactTemplate },
    { id: 'ats', name: 'ATS-Friendly', icon: '🤖', component: ATSTemplate },
  ]

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[1]
  const TemplateComponent = currentTemplate.component

  const handleSelectTemplate = (templateId) => {
    updateSettings({ selectedTemplate: templateId })
    setShowTemplateSelector(false)
  }

  return (
    <div className="space-y-4">
      {/* Template Selector Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentTemplate.icon}</span>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {currentTemplate.name} Template
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Currently selected
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowTemplateSelector(!showTemplateSelector)}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          Change Template
        </Button>
      </div>

      {/* Template Quick Selector */}
      {showTemplateSelector && (
        <Card className="border-primary-200 dark:border-primary-800">
          <CardContent className="pt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Choose a template:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-center hover:border-primary-400 ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className="text-2xl block mb-1">{template.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {template.name}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resume Preview Container */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 overflow-auto">
        <div className="flex justify-center">
          <div 
            id="resume-preview"
            className="bg-white shadow-xl rounded overflow-hidden"
            style={{ 
              width: '8.5in', 
              minHeight: '11in',
              maxWidth: '100%',
            }}
          >
            <TemplateComponent data={resumeData} />
          </div>
        </div>
      </div>

      {/* Preview Tips */}
      <Card className="bg-gray-50 dark:bg-gray-800/50">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-900 dark:text-white mb-1">Preview Tips:</p>
              <ul className="space-y-1">
                <li>• This preview shows how your resume will look when exported</li>
                <li>• Only sections with data are displayed</li>
                <li>• Click "Download" in the sidebar to export your resume</li>
                <li>• Use ATS-Friendly template when applying through job portals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResumePreview