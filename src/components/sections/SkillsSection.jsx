import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import useResume from '@/hooks/useResume'

const SkillsSection = () => {
  const { resumeData, updateSkills } = useResume()
  const skills = resumeData?.skills || {
    languages: [],
    frameworks: [],
    tools: [],
    databases: [],
    other: [],
  }

  // Skill categories configuration
  const categories = [
    {
      id: 'languages',
      name: 'Programming Languages',
      icon: '💻',
      placeholder: 'e.g., Python, JavaScript, Java, C++',
      suggestions: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'C#', 'R', 'MATLAB', 'Scala'],
      color: 'blue',
    },
    {
      id: 'frameworks',
      name: 'Frameworks & Libraries',
      icon: '🧩',
      placeholder: 'e.g., React, Node.js, Django, TensorFlow',
      suggestions: ['React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Bootstrap', 'Tailwind CSS', 'jQuery', 'Redux', 'GraphQL'],
      color: 'green',
    },
    {
      id: 'tools',
      name: 'Tools & Platforms',
      icon: '🔧',
      placeholder: 'e.g., Git, Docker, AWS, Linux',
      suggestions: ['Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Linux', 'Windows', 'VS Code', 'IntelliJ', 'Postman', 'Jira', 'Figma', 'Webpack', 'Vite', 'npm', 'Yarn', 'CI/CD', 'Jenkins', 'Terraform', 'Nginx', 'Heroku', 'Vercel', 'Netlify'],
      color: 'orange',
    },
    {
      id: 'databases',
      name: 'Databases',
      icon: '🗄️',
      placeholder: 'e.g., MySQL, MongoDB, PostgreSQL, Redis',
      suggestions: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'Firebase', 'Supabase', 'DynamoDB', 'Cassandra', 'Elasticsearch', 'Neo4j', 'MariaDB'],
      color: 'purple',
    },
    {
      id: 'other',
      name: 'Other Skills',
      icon: '✨',
      placeholder: 'e.g., REST APIs, Agile, Problem Solving',
      suggestions: ['REST APIs', 'GraphQL', 'Microservices', 'Agile', 'Scrum', 'Data Structures', 'Algorithms', 'OOP', 'System Design', 'Machine Learning', 'Deep Learning', 'Data Analysis', 'Web Scraping', 'Testing', 'Debugging', 'Technical Writing', 'UI/UX', 'Responsive Design'],
      color: 'gray',
    },
  ]

  // Get badge variant based on color
  const getBadgeVariant = (color) => {
    const variants = {
      blue: 'default',
      green: 'success',
      orange: 'secondary',
      purple: 'default',
      gray: 'outline',
    }
    return variants[color] || 'default'
  }

  // Get custom badge classes for colors
  const getBadgeClasses = (color) => {
    const classes = {
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
      orange: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      gray: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    }
    return classes[color] || classes.gray
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ⚡ Technical Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add your programming languages, frameworks, tools, and other technical skills.
        </p>
      </div>

      {/* Skill Categories */}
      {categories.map((category) => (
        <SkillCategory
          key={category.id}
          category={category}
          skills={skills[category.id] || []}
          onUpdate={(newSkills) => updateSkills(category.id, newSkills)}
          getBadgeClasses={getBadgeClasses}
        />
      ))}

      {/* Summary */}
      <Card className="bg-gray-50 dark:bg-gray-800/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Total Skills</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Across all categories
              </p>
            </div>
            <div className="text-3xl font-bold text-primary-500">
              {Object.values(skills).flat().length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                💡 Skills Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Only list skills you can confidently discuss in an interview</li>
                <li>• Tailor skills to the job description you're applying for</li>
                <li>• Put your strongest skills first in each category</li>
                <li>• Include both hard skills (technical) and relevant soft skills</li>
                <li>• Keep it focused: 15-25 total skills is usually ideal</li>
                <li>• Use industry-standard names (e.g., "React" not "ReactJS")</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Separate component for each skill category
const SkillCategory = ({ category, skills, onUpdate, getBadgeClasses }) => {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Handle adding skill
  const handleAddSkill = (skill) => {
    const trimmedSkill = skill.trim()
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      onUpdate([...skills, trimmedSkill])
    }
    setInputValue('')
    setShowSuggestions(false)
  }

  // Handle key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      handleAddSkill(inputValue)
    }
  }

  // Handle remove skill
  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index)
    onUpdate(newSkills)
  }

  // Filter suggestions based on input
  const filteredSuggestions = category.suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !skills.includes(suggestion)
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <span>{category.icon}</span>
          {category.name}
          {skills.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {skills.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                className={`${getBadgeClasses(category.color)} gap-1 px-3 py-1`}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-1 hover:opacity-70 transition-opacity"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder={category.placeholder}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setShowSuggestions(e.target.value.length > 0)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(inputValue.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAddSkill(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add Suggestions */}
        {skills.length < 3 && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-1">
              {category.suggestions
                .filter((s) => !skills.includes(s))
                .slice(0, 6)
                .map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAddSkill(suggestion)}
                    className="text-xs px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-primary-500 transition-colors"
                  >
                    + {suggestion}
                  </button>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SkillsSection