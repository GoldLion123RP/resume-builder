import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header - Fixed at top */}
      <Header />

      {/* Content Area - Below Header */}
      <div className="flex">
        {/* Sidebar - Fixed position on desktop */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-72">
          {/* Scrollable Content */}
          <main className="min-h-[calc(100vh-4rem)]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {typeof children === 'function'
                ? children({ activeSection, setActiveSection })
                : children
              }
            </div>
          </main>

          {/* Footer - Full width */}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout