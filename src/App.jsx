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

function App() {
  const { resumeData, loading } = useResume()

  // Render section content based on active section
  const renderSectionContent = (activeSection) => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />

      case 'education':
        return <EducationSection />

      case 'experience':
        return <ExperienceSection />

      case 'projects':
        return <ProjectsSection />

      case 'skills':
        return <SkillsSection />

      case 'certifications':
        return <CertificationsSection />

      case 'achievements':
        return <AchievementsSection />

      case 'por':
        return <PORSection />

      case 'publications':
        return <PublicationsSection />

      case 'extracurricular':
        return <ExtracurricularSection />

      case 'languages':
        return <LanguagesSection />

      case 'preview':
        return (
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
        )

      case 'export':
        return <ExportSection />

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
    <>
      <Layout>
        {({ activeSection }) => renderSectionContent(activeSection)}
      </Layout>
      
      {/* Tips Panel - Always accessible */}
      <TipsPanel />
    </>
  )
}

export default App