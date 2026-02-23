import Layout from './components/layout/Layout'
import useResume from './hooks/useResume'
import ProfileSection from './components/sections/ProfileSection'
import EducationSection from './components/sections/EducationSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import SkillsSection from './components/sections/SkillsSection'
import CertificationsSection from './components/sections/CertificationsSection'
import AchievementsSection from './components/sections/AchievementsSection'
import PORSection from './components/sections/PORSection'
import PublicationsSection from './components/sections/PublicationsSection'
import ExtracurricularSection from './components/sections/ExtracurricularSection'
import LanguagesSection from './components/sections/LanguagesSection'
import ResumePreview from './components/preview/ResumePreview'
import ExportSection from './components/export/ExportSection'
import TipsPanel from './components/tips/TipsPanel'
import ProgressTracker from './components/features/ProgressTracker'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  const { resumeData, loading } = useResume()

  // Render section content based on active section
  const renderSectionContent = (activeSection, setActiveSection) => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <ErrorBoundary
            title="Dashboard Error"
            message="Unable to load dashboard. Please refresh the page."
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  📊 Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your resume progress and get started quickly
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Progress Card - Spans 2 columns */}
                <div className="lg:col-span-2 card p-6">
                  <ErrorBoundary
                    title="Progress Tracker Error"
                    message="Unable to load progress tracker."
                  >
                    <ProgressTracker onSectionClick={setActiveSection} />
                  </ErrorBoundary>
                </div>

                {/* Quick Actions Card */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="card p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      📈 Quick Stats
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Education</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resumeData?.education?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Experience</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resumeData?.experience?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Projects</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resumeData?.projects?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Skills</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resumeData?.skills?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Certifications</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {resumeData?.certifications?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="card p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      ⚡ Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveSection('profile')}
                        className="w-full btn-secondary py-2 text-sm"
                      >
                        ✏️ Edit Profile
                      </button>
                      <button
                        onClick={() => setActiveSection('preview')}
                        className="w-full btn-secondary py-2 text-sm"
                      >
                        👁️ Preview Resume
                      </button>
                      <button
                        onClick={() => setActiveSection('export')}
                        className="w-full btn-primary py-2 text-sm"
                      >
                        📥 Download Resume
                      </button>
                    </div>
                  </div>

                  {/* Tips Card */}
                  <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                      💡 Pro Tip
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Complete all required sections first, then add optional sections to make your resume stand out!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ErrorBoundary>
        )

      case 'profile':
        return (
          <ErrorBoundary title="Profile Section Error">
            <ProfileSection />
          </ErrorBoundary>
        )

      case 'education':
        return (
          <ErrorBoundary title="Education Section Error">
            <EducationSection />
          </ErrorBoundary>
        )

      case 'experience':
        return (
          <ErrorBoundary title="Experience Section Error">
            <ExperienceSection />
          </ErrorBoundary>
        )

      case 'projects':
        return (
          <ErrorBoundary title="Projects Section Error">
            <ProjectsSection />
          </ErrorBoundary>
        )

      case 'skills':
        return (
          <ErrorBoundary title="Skills Section Error">
            <SkillsSection />
          </ErrorBoundary>
        )

      case 'certifications':
        return (
          <ErrorBoundary title="Certifications Section Error">
            <CertificationsSection />
          </ErrorBoundary>
        )

      case 'achievements':
        return (
          <ErrorBoundary title="Achievements Section Error">
            <AchievementsSection />
          </ErrorBoundary>
        )

      case 'por':
        return (
          <ErrorBoundary title="Leadership Section Error">
            <PORSection />
          </ErrorBoundary>
        )

      case 'publications':
        return (
          <ErrorBoundary title="Publications Section Error">
            <PublicationsSection />
          </ErrorBoundary>
        )

      case 'extracurricular':
        return (
          <ErrorBoundary title="Extracurricular Section Error">
            <ExtracurricularSection />
          </ErrorBoundary>
        )

      case 'languages':
        return (
          <ErrorBoundary title="Languages Section Error">
            <LanguagesSection />
          </ErrorBoundary>
        )

      case 'preview':
        return (
          <ErrorBoundary
            title="Preview Error"
            message="Unable to render resume preview. Check your resume data."
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  👁️ Resume Preview
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Preview your resume with different templates. Switch templates anytime!
                </p>
              </div>
              <ResumePreview />
            </div>
          </ErrorBoundary>
        )

      case 'export':
        return (
          <ErrorBoundary
            title="Export Error"
            message="Unable to load export options. Please try again."
          >
            <ExportSection />
          </ErrorBoundary>
        )

      default:
        return (
          <div className="card p-6">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Select a section from the sidebar
            </p>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary
      title="Application Error"
      message="Something went wrong with the application. Please refresh the page."
    >
      <Layout>
        {({ activeSection, setActiveSection }) => renderSectionContent(activeSection, setActiveSection)}
      </Layout>

      {/* Tips Panel - Always accessible */}
      <ErrorBoundary
        title="Tips Panel Error"
        message="Unable to load tips panel."
      >
        <TipsPanel />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}

export default App