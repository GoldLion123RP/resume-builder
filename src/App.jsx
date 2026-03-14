import Layout from './components/layout/Layout'
import HomePage from './components/landing/HomePage'
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
import ResumeStepper from './components/features/ResumeStepper'
import ErrorBoundary from './components/common/ErrorBoundary'
import CoverLetterBuilder from './components/coverletter/CoverLetterBuilder'
import SectionReorderer from './components/features/SectionReorderer'
import ResumeScore from './components/features/ResumeScore'
import JDMatchAnalyzer from './components/features/JDMatchAnalyzer'
import ProfileImporter from './components/features/ProfileImporter'

function App() {
  const { resumeData, loading } = useResume()

  // Render section content based on active section
  const renderSectionContent = (activeSection, setActiveSection) => {
    switch (activeSection) {
      case 'home':
        return (
          <ErrorBoundary title="Home Error">
            <HomePage onStartBuilding={() => setActiveSection('dashboard')} />
          </ErrorBoundary>
        )

      case 'dashboard':
        return (
          <ErrorBoundary
            title="Dashboard Error"
            message="Unable to load dashboard. Please refresh the page."
          >
            <div className="min-h-screen flex flex-col">
              {/* Step-by-Step Resume Builder */}
              <div className="flex-1 flex lg:flex-row">
                {/* Left Side: Stepper Navigation */}
                <div className="flex-1 flex flex-col p-6">
                   <div className="flex-0">
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                       📝 Build Your Resume
                     </h2>
                     <p className="text-gray-600 dark:text-gray-400 mb-6">
                       Follow the step-by-step process to create your professional resume
                     </p>
                   </div>
                   
                   <div className="flex-1">
                     {/* Resume Score */}
                     <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                       <ResumeScore />
                     </div>
                     
                     {/* Resume Stepper */}
                     <ResumeStepper 
                       onStepChange={setActiveSection} 
                       currentStep={activeSection} 
                     />
                      
                     {/* Section Reorderer */}
                     <SectionReorderer />
                   </div>
                </div>
                  
                {/* Right Side: Live Preview */}
                <div className="flex-1 hidden lg:block border-l border-gray-200 dark:border-gray-700">
                  <div className="h-full p-6 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          👁️ Live Preview
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="p-1 bg-primary-500/20 dark:bg-primary-500/30 rounded">
                            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a.5.5 0 01-.5.5v1.5a.5.5 0 01-1 0V10a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1.5a.5.5 0 01-1 0v-1.5a.5.5 0 01.5-.5h-1z" />
                            </svg>
                          </span>
                          <span>Updates in real-time</span>
                        </div>
                      </div>
                       
                      {/* Resume Preview Container */}
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-center">
                          <div
                            id="live-resume-preview"
                            className="bg-white shadow-xl rounded overflow-hidden"
                            style={{
                              width: '6in',
                              minHeight: '8in',
                              maxWidth: '100%',
                            }}
                          >
                            {/* Import and use the resume preview component */}
                            {resumeData && (
                              <>
                                {/* We'll render a simplified preview here */}
                                <div className="p-4">
                                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {resumeData?.profile?.fullName || 'Your Name'}
                                  </h2>
                                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {resumeData?.profile?.objective || 'Professional seeking new opportunities'}
                                  </p>
                                   
                                  {/* Experience Section */}
                                  {resumeData?.experience?.length > 0 && (
                                    <>
                                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Experience
                                      </h3>
                                      {resumeData.experience.map((exp, index) => (
                                        <div key={index} className="mb-4">
                                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                                            {exp.position} at {exp.company}
                                          </h4>
                                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                            {exp.startDate} - {exp.endDate || 'Present'}
                                          </p>
                                          {exp.description && (
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                              {exp.description}
                                            </p>
                                          )}
                                          {exp.bullets?.length > 0 && (
                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                              {exp.bullets.map((bullet, bulletIndex) => (
                                                <li key={bulletIndex} className="flex">
                                                  <span className="flex-shrink-0">• </span>
                                                  <span>{bullet}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      ))}
                                    </>
                                  )}
                                   
                                  {/* Education Section */}
                                  {resumeData?.education?.length > 0 && (
                                    <>
                                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6">
                                        Education
                                      </h3>
                                      {resumeData.education.map((edu, index) => (
                                        <div key={index} className="mb-4">
                                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                                            {edu.degree} in {edu.field}
                                          </h4>
                                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                            {edu.institution}
                                          </p>
                                          <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {edu.startDate} - {edu.endDate || 'Present'}
                                          </p>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                   
                                  {/* Skills Section */}
                                  {resumeData?.skills?.length > 0 && (
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6">
                                        Skills
                                      </h3>
                                      <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.map((skill, index) => (
                                          <span key={index} className="bg-primary-500/20 dark:bg-primary-500/30 text-primary-800 dark:text-primary-200 px-3 py-1 rounded text-xs font-medium">
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
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

      case 'cover-letter':
        return (
          <ErrorBoundary title="Cover Letter Section Error">
            <CoverLetterBuilder />
          </ErrorBoundary>
        )

      case 'jd-match':
        return (
          <ErrorBoundary
            title="JD Match Analyzer Error"
            message="Unable to load job description matcher. Please try again."
          >
            <JDMatchAnalyzer />
          </ErrorBoundary>
        )

      case 'import':
        return (
          <ErrorBoundary
            title="Profile Import Error"
            message="Unable to load profile importer. Please try again."
          >
            <ProfileImporter />
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
          {/* Loading skeleton */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-4">Loading your resume...</p>
          </div>
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
