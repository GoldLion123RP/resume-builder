import { useState } from 'react'
import useResume from '../../hooks/useResume'
import sampleResumeData, { sampleResumeData2 } from '../../data/sampleData'

// Icons
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const AcademicCapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const WarningIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const SpinnerIcon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

function SampleDataLoader({ onClose }) {
  const { loadCompleteResumeData } = useResume()
  const [selectedSample, setSelectedSample] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const samples = [
    {
      id: 'sample1',
      data: sampleResumeData,
      profile: sampleResumeData.profile,
      stats: {
        experience: sampleResumeData.experience.length,
        education: sampleResumeData.education.length,
        projects: sampleResumeData.projects.length,
        skills: sampleResumeData.skills.length,
      },
    },
    {
      id: 'sample2',
      data: sampleResumeData2,
      profile: sampleResumeData2.profile,
      stats: {
        experience: sampleResumeData2.experience.length,
        education: sampleResumeData2.education.length,
        projects: sampleResumeData2.projects.length,
        skills: sampleResumeData2.skills.length,
      },
    },
  ]

  const handleLoadSample = (sample) => {
    setSelectedSample(sample)
    setShowConfirm(true)
  }

  const confirmLoad = async () => {
    if (!selectedSample) return

    setLoading(true)
    try {
      // Load the sample data
      await loadCompleteResumeData(selectedSample.data)
      
      // Close dialogs
      setShowConfirm(false)
      setTimeout(() => {
        if (onClose) onClose()
      }, 500)
    } catch (error) {
      console.error('Error loading sample data:', error)
    } finally {
      setLoading(false)
    }
  }

  const cancelLoad = () => {
    setShowConfirm(false)
    setSelectedSample(null)
  }

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Content */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📋 Load Sample Resume
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Get started quickly with pre-filled resume examples
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="px-6 py-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <WarningIcon />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                  Loading sample data will replace your current resume
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-1">
                  Make sure to save your current work before proceeding. You can always start fresh later.
                </p>
              </div>
            </div>
          </div>

          {/* Sample Cards */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid md:grid-cols-2 gap-6">
              {samples.map((sample) => (
                <div
                  key={sample.id}
                  className="card p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white flex-shrink-0">
                      <UserIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                        {sample.profile.fullName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {sample.profile.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <LocationIcon />
                        <span className="truncate">{sample.profile.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Preview */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {sample.profile.summary}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                        <BriefcaseIcon />
                        <span className="text-xs font-medium">Experience</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {sample.stats.experience}
                      </p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                        <AcademicCapIcon />
                        <span className="text-xs font-medium">Education</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {sample.stats.education}
                      </p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                        <StarIcon />
                        <span className="text-xs font-medium">Projects</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {sample.stats.projects}
                      </p>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="text-xs font-medium">Skills</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {sample.stats.skills}
                      </p>
                    </div>
                  </div>

                  {/* Load Button */}
                  <button
                    onClick={() => handleLoadSample(sample)}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                  >
                    <CheckIcon />
                    Load This Resume
                  </button>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 What happens when you load sample data?
              </h4>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>All sections will be filled with realistic sample content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>You can edit any section after loading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Great for understanding how to structure your own resume</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Your current data will be replaced (make sure to save first!)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && selectedSample && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={cancelLoad} />
          
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <WarningIcon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Replace Current Resume?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Loading sample data will overwrite your current resume. This action cannot be undone.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                You're about to load:
              </p>
              <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {selectedSample.profile.fullName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedSample.profile.title}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancelLoad}
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmLoad}
                disabled={loading}
                className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <SpinnerIcon />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <CheckIcon />
                    <span>Confirm & Load</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SampleDataLoader