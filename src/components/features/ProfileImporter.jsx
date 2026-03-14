import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useResume from '@/hooks/useResume'

// Icons
const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const ImportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
)

const ProfileImporter = () => {
  const { resumeData, updateProfile, updateSection } = useResume()
  const [githubUrl, setGithubUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState(null)

  // Import GitHub profile data (no API needed - uses public API)
  const handleGithubImport = async () => {
    if (!githubUrl.trim()) return

    setIsImporting(true)
    setImportStatus(null)

    try {
      // Extract username from URL
      const username = githubUrl
        .replace(/https?:\/\/(www\.)?github\.com\//, '')
        .replace(/\/$/, '')
        .trim()

      if (!username) {
        throw new Error('Invalid GitHub URL')
      }

      // Fetch GitHub user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later or add a GitHub token.')
        }
        if (userResponse.status === 404) {
          throw new Error('GitHub user not found')
        }
        throw new Error('Failed to fetch GitHub profile')
      }
      const userData = await userResponse.json()

      // Update profile with GitHub data
      updateProfile({
        github: `https://github.com/${username}`,
        portfolio: userData.blog || '',
        location: userData.location || '',
        objective: userData.bio || resumeData?.profile?.objective || ''
      })

      // Fetch repositories for projects section
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
      )
      if (reposResponse.ok) {
        const repos = await reposResponse.json()
        
        if (repos.length > 0) {
          const projects = repos.map(repo => ({
            id: crypto.randomUUID(),
            name: repo.name,
            description: repo.description || 'No description',
            startDate: repo.created_at ? new Date(repo.created_at).toISOString().split('T')[0].slice(0, 7) : '',
            endDate: repo.language ? 'Present' : '',
            technologies: repo.language ? [repo.language] : [],
            link: repo.html_url,
            bullets: [
              repo.description || '',
              `⭐ ${repo.stargazers_count} stars`,
              repo.language ? `💻 ${repo.language}` : ''
            ].filter(Boolean)
          }))

          // Add projects to resume
          const existingProjects = resumeData?.projects || []
          updateSection('projects', [...existingProjects, ...projects])
        }
      }

      setImportStatus({ type: 'success', message: 'GitHub profile imported successfully!' })
    } catch (error) {
      console.error('GitHub import error:', error)
      setImportStatus({ type: 'error', message: error.message || 'Failed to import GitHub profile' })
    } finally {
      setIsImporting(false)
    }
  }

  // Import LinkedIn using AI parsing with OpenRouter
  const handleLinkedInImport = async () => {
    if (!linkedinUrl.trim()) return

    setIsImporting(true)
    setImportStatus(null)

    try {
      // Check if we have an API key configured
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
      
      if (!apiKey) {
        // Fallback: Ask user to manually paste their profile info
        setImportStatus({ 
          type: 'info', 
          message: 'No AI API configured. Please manually paste your LinkedIn profile information in the Profile section.' 
        })
        return
      }

      // Use OpenRouter API to parse LinkedIn profile
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Resume Builder'
        },
        body: JSON.stringify({
          model: 'google/gemma-3n-e4b:free',
          messages: [
            {
              role: 'system',
              content: 'You are a resume parser. Extract structured information from LinkedIn profile text. Return JSON with: fullName, email, phone, headline, objective, location, experience (array with company, position, duration), education (array with school, degree, field, year), skills (array of strings).'
            },
            {
              role: 'user',
              content: `Extract the resume data from this LinkedIn profile URL or text: ${linkedinUrl}. Return only valid JSON.`
            }
          ],
          temperature: 0.3
        })
      })

      if (!response.ok) {
        throw new Error('AI parsing failed')
      }

      const data = await response.json()
      const parsedContent = data.choices?.[0]?.message?.content

      if (parsedContent) {
        try {
          const parsed = JSON.parse(parsedContent)
          
          // Update profile
          if (parsed.fullName || parsed.headline) {
            updateProfile({
              fullName: parsed.fullName || resumeData?.profile?.fullName || '',
              email: parsed.email || resumeData?.profile?.email || '',
              phone: parsed.phone || resumeData?.profile?.phone || '',
              objective: parsed.objective || parsed.headline || '',
              location: parsed.location || resumeData?.profile?.location || '',
              linkedin: linkedinUrl
            })
          }

          // Update experience
          if (parsed.experience && Array.isArray(parsed.experience)) {
            const experience = parsed.experience.map(exp => ({
              id: crypto.randomUUID(),
              company: exp.company || '',
              position: exp.position || '',
              startDate: exp.startDate || '',
              endDate: exp.endDate || 'Present',
              description: '',
              bullets: []
            }))
            updateSection('experience', [...(resumeData?.experience || []), ...experience])
          }

          // Update education
          if (parsed.education && Array.isArray(parsed.education)) {
            const education = parsed.education.map(edu => ({
              id: crypto.randomUUID(),
              institution: edu.school || '',
              degree: edu.degree || '',
              field: edu.field || '',
              startDate: edu.year || '',
              endDate: edu.year || ''
            }))
            updateSection('education', [...(resumeData?.education || []), ...education])
          }

          // Update skills
          if (parsed.skills && Array.isArray(parsed.skills)) {
            const currentSkills = resumeData?.skills || { languages: [], frameworks: [], tools: [], databases: [], other: [] }
            const newSkills = parsed.skills.filter(s => !currentSkills.other.includes(s))
            updateProfile({
              skills: {
                ...currentSkills,
                other: [...currentSkills.other, ...newSkills]
              }
            })
          }

          setImportStatus({ type: 'success', message: 'LinkedIn profile imported successfully!' })
        } catch (parseError) {
          console.error('Parse error:', parseError)
          throw new Error('Failed to parse AI response')
        }
      } else {
        throw new Error('No data returned from AI')
      }
    } catch (error) {
      console.error('LinkedIn import error:', error)
      setImportStatus({ 
        type: 'error', 
        message: error.message || 'Failed to import LinkedIn profile. Try pasting your profile info manually.' 
      })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImportIcon />
          Import Profile Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Import your profile from GitHub or LinkedIn to auto-fill your resume.
        </p>

        {/* GitHub Import */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            GitHub Username/URL
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="Enter GitHub username or URL"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <GithubIcon />
              </div>
            </div>
            <Button
              onClick={handleGithubImport}
              disabled={isImporting || !githubUrl.trim()}
              variant="outline"
            >
              Import
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Fetches profile, bio, and top repositories automatically
          </p>
        </div>

        {/* LinkedIn Import */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            LinkedIn Profile URL
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                <LinkedInIcon />
              </div>
            </div>
            <Button
              onClick={handleLinkedInImport}
              disabled={isImporting || !linkedinUrl.trim()}
              variant="outline"
            >
              Import
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            AI-powered extraction (requires OpenRouter API key)
          </p>
        </div>

        {/* Status Message */}
        {importStatus && (
          <div className={`p-3 rounded-lg ${
            importStatus.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
            importStatus.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
            'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
          }`}>
            {importStatus.message}
          </div>
        )}

        {/* Loading Indicator */}
        {isImporting && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
            <span>Importing profile data...</span>
          </div>
        )}

        {/* API Key Setup Info */}
        {!import.meta.env.VITE_OPENROUTER_API_KEY && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              💡 <strong>Tip:</strong> To enable LinkedIn AI import, add your OpenRouter API key to the .env file:
              <code className="block mt-1 bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded text-xs">
                VITE_OPENROUTER_API_KEY=your_api_key_here
              </code>
              <a 
                href="https://openrouter.ai/settings/keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-yellow-600"
              >
                Get a free API key here
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ProfileImporter
