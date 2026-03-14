import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useTheme from '@/hooks/useTheme'

// Feature icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const FeatureCard = ({ icon, title, description, delay }) => (
  <div 
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4 text-2xl">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">
      {description}
    </p>
  </div>
)

const StepCard = ({ number, icon, title, description, delay }) => (
  <div 
    className="relative flex flex-col items-center text-center"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Step number badge */}
    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 relative z-10">
      {number}
    </div>
    
    {/* Connecting line (hidden on last item) */}
    {number < 3 && (
      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 to-primary-200 dark:from-primary-700 dark:to-primary-600 -translate-y-4 -z-0"></div>
    )}
    
    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex items-center justify-center mb-4 text-4xl">
      {icon}
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
      {description}
    </p>
  </div>
)

const HomePage = ({ onStartBuilding }) => {
  const { isDark } = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: '✅',
      title: 'ATS-Friendly Templates',
      description: 'Pass applicant tracking systems with professionally designed, clean layouts that recruiters love.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Suggestions',
      description: 'Get intelligent content suggestions and improve your bullet points with built-in AI assistant.'
    },
    {
      icon: '📄',
      title: 'Multiple Export Formats',
      description: 'Download your resume in PDF, DOCX, or TXT format. All exports are completely free.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data stays on your device. No account required, no tracking, complete privacy.'
    },
    {
      icon: '📝',
      title: 'Cover Letter Builder',
      description: 'Create matching cover letters that complement your resume for a complete application.'
    },
    {
      icon: '🎯',
      title: 'JD Match Analyzer',
      description: 'Paste any job description and get personalized suggestions to improve your match score.'
    }
  ]

  const steps = [
    {
      number: 1,
      icon: '📋',
      title: 'Fill Your Details',
      description: 'Enter your information using our easy step-by-step forms. We guide you through each section.'
    },
    {
      number: 2,
      icon: '🎨',
      title: 'Choose a Template',
      description: 'Select from 6+ professionally designed templates. Switch anytime without losing data.'
    },
    {
      number: 3,
      icon: '⬇️',
      title: 'Download Free',
      description: 'Export your resume in PDF, DOCX, or TXT. No payments, no watermarks, completely free.'
    }
  ]

  const stats = [
    { value: '50,000+', label: 'Resumes Created' },
    { value: '100%', label: 'Free Downloads' },
    { value: '4.9/5', label: 'User Rating' },
    { value: '0', label: 'Account Required' }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-fade-in">
              <span>🚀</span>
              <span>100% Free • No Registration Required</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Build a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
                Job-Winning
              </span>
              <br />
              Resume in Minutes
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Create professional, ATS-friendly resumes with AI-powered suggestions. 
              Export in PDF, DOCX, or TXT — completely free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={onStartBuilding}
                className="group relative px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  Build My Resume — Free
                  <ArrowRightIcon />
                </span>
              </button>
              
              <button
                onClick={() => {
                  // Scroll to features
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200"
              >
                See Features
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview mockup */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent -mt-20 z-10"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">Resume Builder</span>
              </div>
              <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-[300px] flex items-center justify-center">
                {/* Simplified preview representation */}
                <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg shadow-lg p-6 sm:p-8">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Create the{' '}
              <span className="text-primary-500">Perfect Resume</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you land your dream job — 
              without any cost or complexity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                {...feature}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It <span className="text-primary-500">Works</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create a professional resume in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                {...step}
                delay={index * 200}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button
              onClick={onStartBuilding}
              className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                Start Building Now — It's Free
                <ArrowRightIcon />
              </span>
            </button>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              No credit card required • No account needed
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by <span className="text-primary-500">Job Seekers</span> Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Got my first interview within 3 days of using this resume! The ATS-friendly template really works.",
                author: "Sarah M.",
                role: "Software Developer"
              },
              {
                quote: "Finally, a free resume builder that doesn't compromise on quality. The AI suggestions are incredibly helpful.",
                author: "James K.",
                role: "Marketing Manager"
              },
              {
                quote: "I was able to create a professional resume in under 10 minutes. The export options are a game-changer.",
                author: "Emily R.",
                role: "Recent Graduate"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of job seekers who have created professional resumes with Resume Builder.
          </p>
          <button
            onClick={onStartBuilding}
            className="px-10 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            Create Your Resume Now — It's Free
          </button>
        </div>
      </section>

      {/* CSS for animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default HomePage
