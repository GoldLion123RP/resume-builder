import { useState, useRef, useEffect } from 'react'
import useResume from '@/hooks/useResume'
import SampleDataLoader from '@/components/features/SampleDataLoader'

const Sidebar = ({ activeSection, onSectionChange }) => {
  const { resumeData } = useResume()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSampleLoader, setShowSampleLoader] = useState(false)
  
  // Refs to preserve scroll position
  const desktopNavRef = useRef(null)
  const mobileNavRef = useRef(null)
  const scrollPositionRef = useRef(0)

  // Save scroll position before section change
  const saveScrollPosition = () => {
    if (desktopNavRef.current) {
      scrollPositionRef.current = desktopNavRef.current.scrollTop
    }
  }

  // Restore scroll position after render
  useEffect(() => {
    if (desktopNavRef.current && scrollPositionRef.current > 0) {
      desktopNavRef.current.scrollTop = scrollPositionRef.current
    }
    if (mobileNavRef.current && scrollPositionRef.current > 0) {
      mobileNavRef.current.scrollTop = scrollPositionRef.current
    }
  }, [activeSection])

  // Define all sections
  const sections = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: '📊',
      required: false,
      description: 'Overview & progress',
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: '👤',
      required: true,
      description: 'Basic information',
    },
    {
      id: 'education',
      name: 'Education',
      icon: '🎓',
      required: false,
      description: 'Degrees & coursework',
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: '💼',
      required: false,
      description: 'Work & internships',
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: '🚀',
      required: false,
      description: 'Personal & academic',
    },
    {
      id: 'skills',
      name: 'Technical Skills',
      icon: '⚡',
      required: false,
      description: 'Languages, tools, frameworks',
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: '📜',
      required: false,
      description: 'Courses & certificates',
    },
    {
      id: 'achievements',
      name: 'Achievements',
      icon: '🏆',
      required: false,
      description: 'Awards & honors',
    },
    {
      id: 'por',
      name: 'Leadership',
      icon: '👥',
      required: false,
      description: 'Positions of Responsibility',
    },
    {
      id: 'publications',
      name: 'Publications',
      icon: '📄',
      required: false,
      description: 'Research papers',
    },
    {
      id: 'extracurricular',
      name: 'Extracurricular',
      icon: '🎯',
      required: false,
      description: 'Activities & volunteering',
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: '🌐',
      required: false,
      description: 'Language proficiency',
    },
  ]

  // Calculate completion for each section
  const getSectionCompletion = (sectionId) => {
    if (!resumeData) return 0

    switch (sectionId) {
      case 'profile':
        const profileFields = Object.values(resumeData.profile || {}).filter(v => v && v !== '')
        return Math.round((profileFields.length / 8) * 100)

      case 'skills':
        const skillCategories = Object.values(resumeData.skills || {}).filter(arr => arr && arr.length > 0)
        return skillCategories.length > 0 ? 100 : 0

      default:
        const items = resumeData[sectionId] || []
        return items.length > 0 ? 100 : 0
    }
  }

  // Check if section has data
  const hasData = (sectionId) => {
    return getSectionCompletion(sectionId) > 0
  }

  // Handle section click
  const handleSectionClick = (sectionId) => {
    saveScrollPosition()
    onSectionChange(sectionId)
    setIsMobileMenuOpen(false)
  }

  // Render section button
  const renderSectionButton = (section) => {
    const completion = getSectionCompletion(section.id)
    const isActive = activeSection === section.id

    return (
      <button
        key={section.id}
        onClick={() => handleSectionClick(section.id)}
        className={`
          w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200
          ${isActive
            ? 'bg-primary-500 text-white shadow-md'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }
        `}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <span className="text-xl flex-shrink-0">{section.icon}</span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm truncate">
                {section.name}
              </span>
              {section.required && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20' : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'}`}>
                  Required
                </span>
              )}
            </div>
            <p className={`text-xs mt-0.5 truncate ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
              {section.description}
            </p>
          </div>

          {/* Completion Indicator */}
          {!section.required && section.id !== 'dashboard' && (
            <div className="flex-shrink-0">
              {hasData(section.id) ? (
                <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <div className={`w-5 h-5 rounded-full border-2 ${isActive ? 'border-white' : 'border-gray-300 dark:border-gray-600'}`}></div>
              )}
            </div>
          )}
        </div>

        {/* Progress Bar (only for profile) */}
        {section.id === 'profile' && completion < 100 && isActive && (
          <div className="mt-2">
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 text-white/80">{completion}% complete</p>
          </div>
        )}
      </button>
    )
  }

  // Sidebar content JSX (not a component to prevent re-creation)
  const sidebarContent = (navRef) => (
    <div className="flex flex-col h-full">
      {/* Load Sample Data Button - At top */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowSampleLoader(true)}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Load Sample Data
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          Quick start with example resume
        </p>
      </div>

      {/* Section List - Scrollable */}
      <nav 
        ref={navRef}
        className="flex-1 overflow-y-auto scrollbar-thin py-4"
      >
        <div className="space-y-1 px-3">
          {sections.map(renderSectionButton)}
        </div>
      </nav>

      {/* Bottom: Preview & Export - Fixed at bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2 bg-white dark:bg-gray-800">
        <button
          onClick={() => handleSectionClick('preview')}
          className={`
            w-full px-4 py-2.5 rounded-lg font-medium transition-all
            ${activeSection === 'preview'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
        >
          👁️ Preview Resume
        </button>
        <button
          onClick={() => handleSectionClick('export')}
          className={`
            w-full px-4 py-2.5 rounded-lg font-medium transition-all
            ${activeSection === 'export'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
        >
          📥 Download
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden lg:block fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30">
        {sidebarContent(desktopNavRef)}
      </aside>

      {/* Mobile Sidebar - Slide in */}
      <aside
        className={`
          lg:hidden fixed top-16 left-0 w-72 h-[calc(100vh-4rem)]
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent(mobileNavRef)}
      </aside>

      {/* Sample Data Loader Modal */}
      {showSampleLoader && (
        <SampleDataLoader onClose={() => setShowSampleLoader(false)} />
      )}
    </>
  )
}

export default Sidebar