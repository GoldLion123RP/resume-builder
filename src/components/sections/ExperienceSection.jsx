import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const ExperienceSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const experience = resumeData?.experience || []

  const [expandedId, setExpandedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyExperience())
  const [techInput, setTechInput] = useState('')
  const [bulletInput, setBulletInput] = useState('')

  // Empty experience template
  function getEmptyExperience() {
    return {
      id: '',
      company: '',
      role: '',
      location: '',
      type: 'internship', // internship, full-time, part-time, contract
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bullets: [],
      techStack: [],
    }
  }

  // Generate unique ID
  const generateId = () => {
    return `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Handle adding new entry
  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyExperience(), id: generateId() })
    setExpandedId(null)
  }

  // Handle save new entry
  const handleSaveNew = () => {
    if (!newEntry.company || !newEntry.role) {
      alert('Please fill in at least Company and Role')
      return
    }
    addItem('experience', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyExperience())
    setTechInput('')
    setBulletInput('')
  }

  // Handle cancel new entry
  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyExperience())
    setTechInput('')
    setBulletInput('')
  }

  // Handle update existing entry
  const handleUpdate = (id, field, value) => {
    updateItem('experience', id, { [field]: value })
  }

  // Handle delete entry
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      deleteItem('experience', id)
      if (expandedId === id) setExpandedId(null)
    }
  }

  // Handle tech stack tags (for new entry)
  const handleAddTech = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault()
      const newTechStack = [...(newEntry.techStack || []), techInput.trim()]
      setNewEntry({ ...newEntry, techStack: newTechStack })
      setTechInput('')
    }
  }

  const handleRemoveTech = (index) => {
    const newTechStack = newEntry.techStack.filter((_, i) => i !== index)
    setNewEntry({ ...newEntry, techStack: newTechStack })
  }

  // Handle bullets (for new entry)
  const handleAddBullet = (e) => {
    if (e.key === 'Enter' && bulletInput.trim()) {
      e.preventDefault()
      const newBullets = [...(newEntry.bullets || []), bulletInput.trim()]
      setNewEntry({ ...newEntry, bullets: newBullets })
      setBulletInput('')
    }
  }

  const handleRemoveBullet = (index) => {
    const newBullets = newEntry.bullets.filter((_, i) => i !== index)
    setNewEntry({ ...newEntry, bullets: newBullets })
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  // Get employment type label
  const getTypeLabel = (type) => {
    const types = {
      'internship': 'Internship',
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      'contract': 'Contract',
      'freelance': 'Freelance',
    }
    return types[type] || type
  }

  // Render experience form fields
  const renderFormFields = (entry, isNew = false) => {
    const handleChange = (field, value) => {
      if (isNew) {
        setNewEntry({ ...newEntry, [field]: value })
      } else {
        handleUpdate(entry.id, field, value)
      }
    }

    return (
      <div className="space-y-4">
        {/* Company and Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`company-${entry.id}`}>
              Company / Organization <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`company-${entry.id}`}
              type="text"
              placeholder="Google, Microsoft, Startup XYZ"
              value={entry.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`role-${entry.id}`}>
              Role / Position <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`role-${entry.id}`}
              type="text"
              placeholder="Software Engineering Intern"
              value={entry.role || ''}
              onChange={(e) => handleChange('role', e.target.value)}
            />
          </div>
        </div>

        {/* Location and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`location-${entry.id}`}>Location</Label>
            <Input
              id={`location-${entry.id}`}
              type="text"
              placeholder="San Francisco, CA (or Remote)"
              value={entry.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`type-${entry.id}`}>Employment Type</Label>
            <select
              id={`type-${entry.id}`}
              value={entry.type || 'internship'}
              onChange={(e) => handleChange('type', e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="internship">Internship</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`startDate-${entry.id}`}>Start Date</Label>
            <Input
              id={`startDate-${entry.id}`}
              type="month"
              value={entry.startDate || ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`endDate-${entry.id}`}>End Date</Label>
            <Input
              id={`endDate-${entry.id}`}
              type="month"
              value={entry.endDate || ''}
              onChange={(e) => handleChange('endDate', e.target.value)}
              disabled={entry.current}
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer h-10">
              <input
                type="checkbox"
                checked={entry.current || false}
                onChange={(e) => handleChange('current', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Currently working here</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor={`description-${entry.id}`}>Brief Description (Optional)</Label>
          <Textarea
            id={`description-${entry.id}`}
            placeholder="Short overview of your role and team..."
            value={entry.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
          />
        </div>

        {/* Bullet Points */}
        <div>
          <Label>Key Responsibilities & Achievements</Label>
          <div className="space-y-2 mb-2">
            {(entry.bullets || []).map((bullet, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-primary-500 mt-0.5">•</span>
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{bullet}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (isNew) {
                      handleRemoveBullet(index)
                    } else {
                      const newBullets = entry.bullets.filter((_, i) => i !== index)
                      handleUpdate(entry.id, 'bullets', newBullets)
                    }
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {isNew ? (
            <Input
              type="text"
              placeholder="Type an achievement and press Enter (e.g., Increased API performance by 40%)"
              value={bulletInput}
              onChange={(e) => setBulletInput(e.target.value)}
              onKeyDown={handleAddBullet}
            />
          ) : (
            <BulletInput
              entryId={entry.id}
              bullets={entry.bullets || []}
              onUpdate={handleUpdate}
            />
          )}
          <p className="text-xs text-gray-500 mt-1">
            💡 Use action verbs: Developed, Implemented, Increased, Reduced, Led, etc.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <Label>Technologies Used</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(entry.techStack || []).map((tech, index) => (
              <Badge key={index} variant="default" className="gap-1">
                {tech}
                <button
                  type="button"
                  onClick={() => {
                    if (isNew) {
                      handleRemoveTech(index)
                    } else {
                      const newTechStack = entry.techStack.filter((_, i) => i !== index)
                      handleUpdate(entry.id, 'techStack', newTechStack)
                    }
                  }}
                  className="ml-1 hover:text-red-300"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Badge>
            ))}
          </div>
          {isNew ? (
            <Input
              type="text"
              placeholder="Type a technology and press Enter (e.g., React, Node.js, AWS)"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleAddTech}
            />
          ) : (
            <TechInput
              entryId={entry.id}
              techStack={entry.techStack || []}
              onUpdate={handleUpdate}
            />
          )}
          <p className="text-xs text-gray-500 mt-1">Press Enter to add each technology</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            💼 Work Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your internships, jobs, and professional experience.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Experience
          </Button>
        )}
      </div>

      {/* Add New Form */}
      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Experience</CardTitle>
            <CardDescription>Fill in your work or internship details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderFormFields(newEntry, true)}
            <Separator className="my-4" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelNew}>
                Cancel
              </Button>
              <Button onClick={handleSaveNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Experience
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Entries */}
      {experience.length > 0 ? (
        <div className="space-y-4">
          {experience.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              {/* Collapsed View */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {entry.role || 'Role'}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(entry.type)}
                      </Badge>
                      {entry.current && (
                        <Badge variant="success" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {entry.company || 'Company'}
                      {entry.location && <span className="text-gray-400"> • {entry.location}</span>}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {(entry.startDate || entry.endDate) && (
                        <span>
                          {formatDate(entry.startDate)} - {entry.current ? 'Present' : formatDate(entry.endDate)}
                        </span>
                      )}
                    </div>
                    {/* Tech stack preview */}
                    {entry.techStack && entry.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.techStack.slice(0, 5).map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {entry.techStack.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{entry.techStack.length - 5} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(entry.id)
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === entry.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded View */}
              {expandedId === entry.id && (
                <>
                  <Separator />
                  <CardContent className="pt-4">
                    {renderFormFields(entry, false)}
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      ) : (
        !isAdding && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No experience added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Add your internships and work experience</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Experience
              </Button>
            </CardContent>
          </Card>
        )
      )}

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
                💡 Experience Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• List experience in reverse chronological order (most recent first)</li>
                <li>• Use the XYZ formula: Accomplished [X] measured by [Y] by doing [Z]</li>
                <li>• Quantify achievements: "Reduced load time by 40%" is better than "Improved performance"</li>
                <li>• Start bullets with action verbs: Developed, Implemented, Led, Designed, etc.</li>
                <li>• Include relevant technologies used in each role</li>
                <li>• For internships, highlight learning and impact on real projects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Separate component for bullet input in existing entries
const BulletInput = ({ entryId, bullets, onUpdate }) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const newBullets = [...bullets, inputValue.trim()]
      onUpdate(entryId, 'bullets', newBullets)
      setInputValue('')
    }
  }

  return (
    <Input
      type="text"
      placeholder="Type an achievement and press Enter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

// Separate component for tech input in existing entries
const TechInput = ({ entryId, techStack, onUpdate }) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const newTechStack = [...techStack, inputValue.trim()]
      onUpdate(entryId, 'techStack', newTechStack)
      setInputValue('')
    }
  }

  return (
    <Input
      type="text"
      placeholder="Type a technology and press Enter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default ExperienceSection