import { useMemo } from 'react'
import useResume from '../../hooks/useResume'

// Icons
const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
)

const CircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
  </svg>
)

const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

function ProgressTracker({ onSectionClick }) {
  const { resumeData } = useResume()

  // Define sections to track
  const sections = useMemo(() => {
    const profile = resumeData?.profile || {}
    const education = resumeData?.education || []
    const experience = resumeData?.experience || []
    const projects = resumeData?.projects || []
    const skills = resumeData?.skills || []
    const certifications = resumeData?.certifications || []
    const achievements = resumeData?.achievements || []
    const por = resumeData?.por || []
    const publications = resumeData?.publications || []
    const extracurricular = resumeData?.extracurricular || []
    const languages = resumeData?.languages || []

    return [
      {
        id: 'profile',
        name: 'Profile',
        icon: '👤',
        required: true,
        completed: !!(profile.fullName && profile.email),
        percentage: calculateProfileCompletion(profile),
      },
      {
        id: 'education',
        name: 'Education',
        icon: '🎓',
        required: true,
        completed: education.length > 0,
        count: education.length,
      },
      {
        id: 'experience',
        name: 'Experience',
        icon: '💼',
        required: true,
        completed: experience.length > 0,
        count: experience.length,
      },
      {
        id: 'skills',
        name: 'Skills',
        icon: '⚡',
        required: true,
        completed: skills.length > 0,
        count: skills.length,
      },
      {
        id: 'projects',
        name: 'Projects',
        icon: '🚀',
        required: false,
        completed: projects.length > 0,
        count: projects.length,
      },
      {
        id: 'certifications',
        name: 'Certifications',
        icon: '📜',
        required: false,
        completed: certifications.length > 0,
        count: certifications.length,
      },
      {
        id: 'achievements',
        name: 'Achievements',
        icon: '🏆',
        required: false,
        completed: achievements.length > 0,
        count: achievements.length,
      },
      {
        id: 'por',
        name: 'Leadership',
        icon: '👔',
        required: false,
        completed: por.length > 0,
        count: por.length,
      },
      {
        id: 'publications',
        name: 'Publications',
        icon: '📚',
        required: false,
        completed: publications.length > 0,
        count: publications.length,
      },
      {
        id: 'extracurricular',
        name: 'Extracurricular',
        icon: '🎯',
        required: false,
        completed: extracurricular.length > 0,
        count: extracurricular.length,
      },
      {
        id: 'languages',
        name: 'Languages',
        icon: '🌐',
        required: false,
        completed: languages.length > 0,
        count: languages.length,
      },
    ]
  }, [resumeData])

  // Calculate profile completion percentage
  function calculateProfileCompletion(profile) {
    if (!profile) return 0
    const fields = ['fullName', 'title', 'email', 'phone', 'location', 'summary']
    const filledFields = fields.filter((field) => profile[field]?.trim()).length
    return Math.round((filledFields / fields.length) * 100)
  }

  // Calculate overall progress
  const progress = useMemo(() => {
    const requiredSections = sections.filter((s) => s.required)
    const optionalSections = sections.filter((s) => !s.required)

    const completedRequired = requiredSections.filter((s) => s.completed).length
    const completedOptional = optionalSections.filter((s) => s.completed).length

    const requiredWeight = 0.7 // 70% weight for required sections
    const optionalWeight = 0.3 // 30% weight for optional sections

    const requiredProgress = (completedRequired / requiredSections.length) * requiredWeight
    const optionalProgress = (completedOptional / optionalSections.length) * optionalWeight

    const totalProgress = (requiredProgress + optionalProgress) * 100

    return {
      percentage: Math.round(totalProgress),
      completedRequired,
      totalRequired: requiredSections.length,
      completedOptional,
      totalOptional: optionalSections.length,
      completedTotal: completedRequired + completedOptional,
      total: sections.length,
    }
  }, [sections])

  // Get progress color
  const getProgressColor = (percentage) => {
    if (percentage < 30) return 'bg-red-500'
    if (percentage < 60) return 'bg-yellow-500'
    if (percentage < 90) return 'bg-blue-500'
    return 'bg-green-500'
  }

  // Get progress message
  const getProgressMessage = () => {
    if (progress.percentage === 100) {
      return '🎉 Resume Complete! Ready to export.'
    }
    if (progress.percentage >= 90) {
      return '✨ Almost there! Just a few more touches.'
    }
    if (progress.percentage >= 60) {
      return '💪 Great progress! Keep going.'
    }
    if (progress.percentage >= 30) {
      return '👍 Good start! Continue adding information.'
    }
    return '🚀 Let\'s get started on your resume!'
  }

  // Incomplete required sections
  const incompleteRequired = sections.filter((s) => s.required && !s.completed)

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center">
        {progress.percentage === 100 ? (
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <TrophyIcon />
          </div>
        ) : (
          <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
            {/* Background Circle */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress Circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress.percentage / 100)}`}
                className={`${getProgressColor(progress.percentage)} transition-all duration-500`}
                strokeLinecap="round"
              />
            </svg>
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {progress.percentage}%
              </span>
            </div>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Resume Progress
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {getProgressMessage()}
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Required Sections</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {progress.completedRequired}/{progress.totalRequired}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
          <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Optional Sections</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {progress.completedOptional}/{progress.totalOptional}
          </p>
        </div>
      </div>

      {/* Incomplete Required Sections Alert */}
      {incompleteRequired.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
            ⚠️ Required Sections Incomplete
          </h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-500 mb-3">
            Complete these sections for a professional resume:
          </p>
          <div className="space-y-2">
            {incompleteRequired.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionClick && onSectionClick(section.id)}
                className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors text-left"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                  <span>{section.icon}</span>
                  {section.name}
                </span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All Sections List */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Section Checklist
        </h4>
        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                section.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={section.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}>
                  {section.completed ? <CheckCircleIcon /> : <CircleIcon />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    <span>{section.icon}</span>
                    {section.name}
                    {section.required && (
                      <span className="text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded">
                        Required
                      </span>
                    )}
                  </p>
                  {section.count !== undefined && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {section.count} {section.count === 1 ? 'entry' : 'entries'}
                    </p>
                  )}
                  {section.id === 'profile' && section.percentage !== undefined && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {section.percentage}% complete
                    </p>
                  )}
                </div>
              </div>
              {onSectionClick && (
                <button
                  onClick={() => onSectionClick(section.id)}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {section.completed ? 'Edit' : 'Add'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Quick Tips
        </h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Complete all required sections for a professional resume</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Add 3-5 optional sections to stand out</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Use action verbs and quantify achievements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Preview your resume before exporting</span>
          </li>
        </ul>
      </div>

      {/* Export Button (if complete) */}
      {progress.percentage === 100 && onSectionClick && (
        <button
          onClick={() => onSectionClick('export')}
          className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Resume
        </button>
      )}
    </div>
  )
}

export default ProgressTracker