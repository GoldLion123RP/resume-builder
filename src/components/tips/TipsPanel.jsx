import { useState } from 'react'
import {
  actionVerbsDatabase,
  actionVerbTips,
  resumeFormulas,
  searchActionVerbs,
} from '../../data/actionVerbs'

// Icons
const LightbulbIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

function TipsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('verbs') // 'verbs', 'tips', 'formulas'
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [copiedVerb, setCopiedVerb] = useState(null)

  // Handle verb copy
  const handleCopyVerb = async (verb) => {
    try {
      await navigator.clipboard.writeText(verb)
      setCopiedVerb(verb)
      setTimeout(() => setCopiedVerb(null), 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Get filtered verbs based on search
  const getDisplayedVerbs = () => {
    if (searchQuery.trim()) {
      return searchActionVerbs(searchQuery)
    }
    return null // Return null to show categories instead
  }

  const searchResults = getDisplayedVerbs()

  // Tab buttons
  const tabs = [
    { id: 'verbs', label: 'Action Verbs', icon: '💪' },
    { id: 'tips', label: 'Tips', icon: '💡' },
    { id: 'formulas', label: 'Formulas', icon: '📝' },
  ]

  return (
    <>
      {/* Toggle Button (visible when panel is closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-l-lg shadow-lg transition-all hover:pr-4 group"
          title="Open Tips Panel"
        >
          <div className="flex items-center gap-2">
            <LightbulbIcon />
            <span className="hidden group-hover:inline text-sm font-medium whitespace-nowrap">
              Tips
            </span>
          </div>
        </button>
      )}

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full w-80 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h2 className="font-bold text-gray-900 dark:text-white">
                Resume Tips
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Close panel"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Action Verbs Tab */}
            {activeTab === 'verbs' && (
              <div className="p-4 space-y-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search verbs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Search Results */}
                {searchResults && (
                  <div className="space-y-3">
                    {searchResults.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                        No verbs found for "{searchQuery}"
                      </p>
                    ) : (
                      searchResults.map((result, idx) => (
                        <div key={idx}>
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            {result.icon} {result.category}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {result.verbs.map((verb) => (
                              <button
                                key={verb}
                                onClick={() => handleCopyVerb(verb)}
                                className={`px-2 py-1 text-xs rounded-md transition-all ${
                                  copiedVerb === verb
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400'
                                }`}
                                title="Click to copy"
                              >
                                {copiedVerb === verb ? '✓ Copied!' : verb}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Categories (when not searching) */}
                {!searchResults && (
                  <div className="space-y-2">
                    {Object.entries(actionVerbsDatabase).map(([key, category]) => (
                      <div
                        key={key}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setExpandedCategory(expandedCategory === key ? null : key)
                          }
                          className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="flex items-center gap-2 font-medium text-sm text-gray-900 dark:text-white">
                            <span>{category.icon}</span>
                            {category.name}
                          </span>
                          <svg
                            className={`w-4 h-4 text-gray-500 transition-transform ${
                              expandedCategory === key ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {expandedCategory === key && (
                          <div className="p-3 bg-white dark:bg-gray-800">
                            <div className="flex flex-wrap gap-1.5">
                              {category.verbs.map((verb) => (
                                <button
                                  key={verb}
                                  onClick={() => handleCopyVerb(verb)}
                                  className={`px-2 py-1 text-xs rounded-md transition-all ${
                                    copiedVerb === verb
                                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400'
                                  }`}
                                  title="Click to copy"
                                >
                                  {copiedVerb === verb ? '✓ Copied!' : verb}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick tip */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    💡 <strong>Tip:</strong> Click any verb to copy it to your clipboard!
                  </p>
                </div>
              </div>
            )}

            {/* Tips Tab */}
            {activeTab === 'tips' && (
              <div className="p-4 space-y-4">
                {actionVerbTips.map((tip, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {tip.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {tip.description}
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded p-2 border border-gray-200 dark:border-gray-600">
                      <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                        {tip.example}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Additional general tips */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    📋 General Resume Tips
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      Keep your resume to 1-2 pages maximum
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      Use consistent formatting throughout
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      Tailor your resume for each job application
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      Include relevant keywords from job descriptions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      Proofread carefully for spelling and grammar
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      Use a professional email address
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      Quantify achievements with numbers when possible
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span>
                      Avoid personal pronouns (I, me, my)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span>
                      Don't include irrelevant personal information
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span>
                      Skip the objective statement - use a summary instead
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Formulas Tab */}
            {activeTab === 'formulas' && (
              <div className="p-4 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use these proven formulas to write impactful bullet points:
                </p>

                {resumeFormulas.map((formula, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {formula.name}
                    </h4>
                    <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded p-2">
                      <p className="text-xs font-medium text-primary-700 dark:text-primary-400">
                        {formula.formula}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Example:
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                        "{formula.example}"
                      </p>
                    </div>
                  </div>
                ))}

                {/* Metrics section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    📊 Metrics to Include
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Revenue ($)',
                      'Percentage (%)',
                      'Time saved',
                      'Team size',
                      'Projects completed',
                      'Users/customers',
                      'Efficiency gains',
                      'Cost reduction',
                      'Rankings',
                      'Ratings/scores',
                    ].map((metric) => (
                      <div
                        key={metric}
                        className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1.5 text-xs text-gray-700 dark:text-gray-300 text-center"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Power words */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    🔥 Power Words
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Significantly',
                      'Successfully',
                      'Effectively',
                      'Consistently',
                      'Strategically',
                      'Proactively',
                      'Independently',
                      'Collaboratively',
                    ].map((word) => (
                      <button
                        key={word}
                        onClick={() => handleCopyVerb(word)}
                        className={`px-2 py-1 text-xs rounded-md transition-all ${
                          copiedVerb === word
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
                        }`}
                        title="Click to copy"
                      >
                        {copiedVerb === word ? '✓ Copied!' : word}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              💡 Use these tips to create an ATS-friendly resume
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default TipsPanel