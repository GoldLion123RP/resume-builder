import { useState } from 'react'
import useResume from '@/hooks/useResume'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

// Define the step order
const STEPS = [
  { id: 'profile', name: 'Profile Information', description: 'Add your basic contact details' },
  { id: 'education', name: 'Education', description: 'Add your educational background' },
  { id: 'experience', name: 'Work Experience', description: 'Add your professional experience' },
  { id: 'skills', name: 'Skills', description: 'Add your technical and soft skills' },
  { id: 'projects', name: 'Projects', description: 'Add your personal and academic projects' },
  { id: 'certifications', name: 'Certifications', description: 'Add your certifications and courses' },
  { id: 'achievements', name: 'Achievements', description: 'Add your awards and honors' },
  { id: 'por', name: 'Leadership', description: 'Add positions of responsibility' },
  { id: 'publications', name: 'Publications', description: 'Add your research papers and publications' },
  { id: 'extracurricular', name: 'Extracurricular', description: 'Add activities and volunteering' },
  { id: 'languages', name: 'Languages', description: 'Add your language proficiency' },
  { id: 'preview', name: 'Preview', description: 'Review your resume before downloading' },
  { id: 'jd-match', name: 'Job Description Match', description: 'Analyze your resume against a job description' },
  { id: 'export', name: 'Download', description: 'Download your resume in various formats' }
]

const ResumeStepper = ({ onStepChange, currentStep }) => {
  const { resumeData } = useResume()
  
  // Calculate completion for each step
  const getStepCompletion = (stepId) => {
    if (!resumeData) return 0

    switch (stepId) {
      case 'profile':
        const profileFields = Object.values(resumeData.profile || {}).filter(v => v && v !== '')
        return Math.round((profileFields.length / 8) * 100)
      case 'skills':
        const skillCategories = Object.values(resumeData.skills || {}).filter(arr => arr && arr.length > 0)
        return skillCategories.length > 0 ? 100 : 0
      case 'jd-match':
        // JD Match step completion is based on whether a job description has been provided
        const jdText = resumeData?.jobDescription?.text || ''
        return jdText.trim().length > 0 ? 100 : 0
      default:
        const items = resumeData[stepId] || []
        return items.length > 0 ? 100 : 0
    }
  }

  // Check if step has data
  const hasData = (stepId) => {
    return getStepCompletion(stepId) > 0
  }

  // Determine if step is valid (has minimum required data)
  const isStepValid = (stepId) => {
    // For now, we'll consider a step valid if it has any data
    // In a more advanced implementation, we could validate specific fields
    return hasData(stepId)
  }

  // Get current step index
  const currentStepIndex = STEPS.findIndex(step => step.id === currentStep)
  const validStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex

  // Handle next step
  const handleNext = () => {
    if (validStepIndex < STEPS.length - 1) {
      const nextStep = STEPS[validStepIndex + 1].id
      onStepChange(nextStep)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (validStepIndex > 0) {
      const prevStep = STEPS[validStepIndex - 1].id
      onStepChange(prevStep)
    }
  }

  return (
    <div className="space-y-6">
      {/* Step Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Build Your Resume
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Step {validStepIndex + 1} of {STEPS.length}
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-primary-500 h-full transition-all duration-500"
            style={{ width: `${((validStepIndex + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0">
              <div className="flex items-center justify-center w-full h-full bg-primary-500 text-white rounded-full">
                {validStepIndex + 1}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {STEPS[validStepIndex].name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {STEPS[validStepIndex].description}
              </p>
            </div>
          </div>

          {/* Step Completion Indicator */}
          {STEPS[validStepIndex].id !== 'preview' && STEPS[validStepIndex].id !== 'export' && (
            <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {hasData(STEPS[validStepIndex].id) ? (
                <>
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {getStepCompletion(STEPS[validStepIndex].id)}% complete
                  </span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 10a9 9 0 1118 0M9 19l6-6m0 0l-6-6M5 9a1 1 0 112-2h2a1 1 0 010 2H5z" />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Not started
                  </span>
                </>
              )}
            </div>
          )}

          {/* Step-Specific Content */}
          <div id="step-content">
            {/* This will be replaced by the actual section component */}
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p>Loading section content...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Previous Button */}
        {validStepIndex > 0 && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ChevronRight className="rotate-180 h-4 w-4" />
            Previous Step
          </Button>
        )}
        
        {/* Next/Finish Button */}
        {validStepIndex < STEPS.length - 1 && (
          <Button
            onClick={handleNext}
            className="flex items-center gap-2"
            disabled={!isStepValid(STEPS[validStepIndex].id) && STEPS[validStepIndex].id !== 'preview'}
          >
            {validStepIndex === STEPS.length - 2 ? 'Finish' : 'Next Step'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        
        {/* Skip to Preview/Export for completed resumes */}
        {validStepIndex >= STEPS.length - 2 && (
          <Button
            variant="outline"
            onClick={() => onStepChange('preview')}
            className="flex items-center gap-2"
          >
            Preview Resume
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ResumeStepper