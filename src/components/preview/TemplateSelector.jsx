import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useResume from '@/hooks/useResume'

const TemplateSelector = () => {
  const { resumeData, updateSettings } = useResume()
  const selectedTemplate = resumeData?.settings?.selectedTemplate || 'modern'

  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional serif font, conservative layout',
      preview: '📜',
      features: ['Serif Font', 'Traditional', 'Academic-Friendly'],
      bestFor: 'Academia, Law, Traditional Industries'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean sans-serif, contemporary design',
      preview: '✨',
      features: ['Sans-Serif', 'Color Accents', 'Contemporary'],
      bestFor: 'Tech, Startups, Creative Roles'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Maximum whitespace, ultra-clean',
      preview: '⚪',
      features: ['Light Weight', 'Generous Spacing', 'No Colors'],
      bestFor: 'Design, Portfolio, Executive'
    },
    {
      id: 'two-column',
      name: 'Two-Column',
      description: 'Sidebar layout, space-efficient',
      preview: '📊',
      features: ['Sidebar', 'Visual Separation', 'Tag-Based Skills'],
      bestFor: 'Experienced Professionals, Multi-Skilled'
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Dense layout, fits more content',
      preview: '📋',
      features: ['Small Font', 'Tight Spacing', 'Max Content'],
      bestFor: 'Experienced, Lots of Content'
    },
    {
      id: 'ats',
      name: 'ATS-Friendly',
      description: 'Plain text optimized for ATS scanners',
      preview: '🤖',
      features: ['No Colors', 'Simple Format', '100% Parseable'],
      bestFor: 'ATS Systems, Large Companies'
    },
  ]

  const handleSelectTemplate = (templateId) => {
    updateSettings({ selectedTemplate: templateId })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Template
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select a resume template that best fits your industry and experience level.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id

          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? 'border-2 border-primary-500 shadow-lg'
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <CardContent className="p-4">
                {/* Template Preview Icon */}
                <div className="text-center mb-3">
                  <div
                    className={`w-full h-32 rounded-lg flex items-center justify-center text-6xl ${
                      isSelected
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    {template.preview}
                  </div>
                </div>

                {/* Template Name */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  {isSelected && (
                    <div className="flex items-center text-primary-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Best For */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Best for:</span> {template.bestFor}
                </p>

                {/* Select Button */}
                <Button
                  className="w-full mt-3"
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectTemplate(template.id)
                  }}
                >
                  {isSelected ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Selected
                    </>
                  ) : (
                    'Select Template'
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                💡 Template Selection Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• <strong>Applying through ATS systems?</strong> Use the ATS-Friendly template for maximum compatibility</li>
                <li>• <strong>Sending to humans directly?</strong> Choose Modern or Minimal for visual appeal</li>
                <li>• <strong>Lots of experience?</strong> Compact or Two-Column templates fit more content</li>
                <li>• <strong>Traditional industries?</strong> Classic template is safer for law, academia, government</li>
                <li>• You can switch templates anytime - your data stays the same!</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TemplateSelector