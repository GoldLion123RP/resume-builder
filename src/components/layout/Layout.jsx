import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home')

  // Hide header and sidebar on home page
  const isHomePage = activeSection === 'home'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header - Hidden on home page */}
      {!isHomePage && (
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      )}

      {/* Content Area */}
      <div className={isHomePage ? '' : 'flex'}>
        {/* Sidebar - Hidden on home page */}
        {!isHomePage && (
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        )}

        {/* Main Content Area */}
        <div className={isHomePage ? '' : 'flex-1 lg:ml-72'}>
          {/* Scrollable Content */}
          <main className={isHomePage ? 'min-h-screen' : 'min-h-[calc(100vh-4rem)]'}>
            <div className={isHomePage ? '' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
              {typeof children === 'function'
                ? children({ activeSection, setActiveSection })
                : children
              }
            </div>
          </main>

          {/* Footer - Hidden on home page (home page has its own footer) */}
          {!isHomePage && <Footer />}
        </div>
      </div>
    </div>
  )
}

export default Layout
