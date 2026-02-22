import Layout from './components/layout/Layout'
import useResume from './hooks/useResume'

function App() {
  const { resumeData, loading } = useResume()

  // Render section content based on active section
  const renderSectionContent = (activeSection) => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Profile Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add your basic contact details and professional summary.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Profile form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'education':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🎓 Education
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add your degrees, universities, and academic achievements.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Education form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'experience':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                💼 Work Experience
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add internships, jobs, and professional experience.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Experience form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🚀 Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Showcase your personal and academic projects.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Projects form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ⚡ Technical Skills
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                List your programming languages, frameworks, tools, and technologies.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Skills form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'certifications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                📜 Certifications
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add online courses, certificates, and professional credentials.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Certifications form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'achievements':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🏆 Achievements & Awards
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Highlight your awards, competitions, and recognitions.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Achievements form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'por':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                👥 Positions of Responsibility
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Leadership roles, club positions, and team management experience.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Leadership form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'publications':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                📝 Publications & Research
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Research papers, publications, and academic contributions.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Publications form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'extracurricular':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🎯 Extracurricular Activities
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Clubs, volunteering, sports, and community involvement.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Extracurricular form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'languages':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🌐 Languages
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Spoken languages and proficiency levels.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📝 Languages form will be added in the next phase
              </p>
            </div>
          </div>
        )

      case 'preview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                👁️ Resume Preview
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                See how your resume will look when exported.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                👁️ Preview will be added in Phase 4
              </p>
            </div>
          </div>
        )

      case 'export':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                📥 Download Resume
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Export your resume as PDF, DOCX, or plain text.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                📥 Export functionality will be added in Phase 5
              </p>
            </div>
          </div>
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
    <Layout>
      {({ activeSection }) => renderSectionContent(activeSection)}
    </Layout>
  )
}

export default App