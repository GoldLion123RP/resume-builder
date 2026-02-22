import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const ProjectsSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const projects = resumeData?.projects || []

  const [expandedId, setExpandedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyProject())
  const [techInput, setTechInput] = useState('')
  const [highlightInput, setHighlightInput] = useState('')

  // Empty project template
  function getEmptyProject() {
    return {
      id: '',
      name: '',
      description: '',
      type: 'personal', // personal, academic, hackathon, open-source, freelance
      startDate: '',
      endDate: '',
      current: false,
      githubUrl: '',
      liveUrl: '',
      techStack: [],
      highlights: [],
    }
  }

  // Generate unique ID
  const generateId = () => {
    return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Handle adding new entry
  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyProject(), id: generateId() })
    setExpandedId(null)
  }

  // Handle save new entry
  const handleSaveNew = () => {
    if (!newEntry.name) {
      alert('Please fill in at least the Project Name')
      return
    }
    addItem('projects', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyProject())
    setTechInput('')
    setHighlightInput('')
  }

  // Handle cancel new entry
  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyProject())
    setTechInput('')
    setHighlightInput('')
  }

  // Handle update existing entry
  const handleUpdate = (id, field, value) => {
    updateItem('projects', id, { [field]: value })
  }

  // Handle delete entry
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteItem('projects', id)
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

  // Handle highlights (for new entry)
  const handleAddHighlight = (e) => {
    if (e.key === 'Enter' && highlightInput.trim()) {
      e.preventDefault()
      const newHighlights = [...(newEntry.highlights || []), highlightInput.trim()]
      setNewEntry({ ...newEntry, highlights: newHighlights })
      setHighlightInput('')
    }
  }

  const handleRemoveHighlight = (index) => {
    const newHighlights = newEntry.highlights.filter((_, i) => i !== index)
    setNewEntry({ ...newEntry, highlights: newHighlights })
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  // Get project type label
  const getTypeLabel = (type) => {
    const types = {
      'personal': 'Personal',
      'academic': 'Academic',
      'hackathon': 'Hackathon',
      'open-source': 'Open Source',
      'freelance': 'Freelance',
      'team': 'Team Project',
    }
    return types[type] || type
  }

  // Get type badge color
  const getTypeBadgeVariant = (type) => {
    const variants = {
      'personal': 'default',
      'academic': 'secondary',
      'hackathon': 'success',
      'open-source': 'default',
      'freelance': 'outline',
      'team': 'secondary',
    }
    return variants[type] || 'default'
  }

  // Render project form fields
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
        {/* Project Name and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`name-${entry.id}`}>
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`name-${entry.id}`}
              type="text"
              placeholder="E-commerce Platform, ML Image Classifier"
              value={entry.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`type-${entry.id}`}>Project Type</Label>
            <select
              id={`type-${entry.id}`}
              value={entry.type || 'personal'}
              onChange={(e) => handleChange('type', e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="personal">Personal Project</option>
              <option value="academic">Academic Project</option>
              <option value="hackathon">Hackathon Project</option>
              <option value="open-source">Open Source Contribution</option>
              <option value="freelance">Freelance/Client Work</option>
              <option value="team">Team Project</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor={`description-${entry.id}`}>Description</Label>
          <Textarea
            id={`description-${entry.id}`}
            placeholder="Brief description of the project, its purpose, and your role..."
            value={entry.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            Keep it concise (2-3 sentences). Focus on what problem it solves.
          </p>
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
              <span className="text-sm text-gray-700 dark:text-gray-300">Ongoing project</span>
            </label>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`githubUrl-${entry.id}`}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub Repository
              </span>
            </Label>
            <Input
              id={`githubUrl-${entry.id}`}
              type="url"
              placeholder="https://github.com/username/project"
              value={entry.githubUrl || ''}
              onChange={(e) => handleChange('githubUrl', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`liveUrl-${entry.id}`}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo URL
              </span>
            </Label>
            <Input
              id={`liveUrl-${entry.id}`}
              type="url"
              placeholder="https://myproject.vercel.app"
              value={entry.liveUrl || ''}
              onChange={(e) => handleChange('liveUrl', e.target.value)}
            />
          </div>
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
              placeholder="Type a technology and press Enter (e.g., React, Python, MongoDB)"
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

        {/* Key Highlights / Impact */}
        <div>
          <Label>Key Highlights & Impact</Label>
          <div className="space-y-2 mb-2">
            {(entry.highlights || []).map((highlight, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (isNew) {
                      handleRemoveHighlight(index)
                    } else {
                      const newHighlights = entry.highlights.filter((_, i) => i !== index)
                      handleUpdate(entry.id, 'highlights', newHighlights)
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
              placeholder="Type a highlight and press Enter (e.g., 500+ users, 4.8 star rating)"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyDown={handleAddHighlight}
            />
          ) : (
            <HighlightInput
              entryId={entry.id}
              highlights={entry.highlights || []}
              onUpdate={handleUpdate}
            />
          )}
          <p className="text-xs text-gray-500 mt-1">
            💡 Include metrics: users, stars, downloads, performance improvements, etc.
          </p>
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
            🚀 Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Showcase your personal, academic, and open-source projects.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Project
          </Button>
        )}
      </div>

      {/* Add New Form */}
      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Project</CardTitle>
            <CardDescription>Fill in your project details</CardDescription>
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
                Save Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Entries */}
      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((entry) => (
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
                        {entry.name || 'Project Name'}
                      </h3>
                      <Badge variant={getTypeBadgeVariant(entry.type)} className="text-xs">
                        {getTypeLabel(entry.type)}
                      </Badge>
                      {entry.current && (
                        <Badge variant="success" className="text-xs">Ongoing</Badge>
                      )}
                    </div>
                    {entry.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                        {entry.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {(entry.startDate || entry.endDate) && (
                        <span>
                          {formatDate(entry.startDate)} - {entry.current ? 'Present' : formatDate(entry.endDate)}
                        </span>
                      )}
                      {/* Links */}
                      <div className="flex items-center gap-3">
                        {entry.githubUrl && (
                          <a
                            href={entry.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            title="GitHub"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                        {entry.liveUrl && (
                          <a
                            href={entry.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-500 hover:text-primary-500"
                            title="Live Demo"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Showcase your best work and side projects</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Project
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
                💡 Project Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Include 2-4 of your most impressive projects</li>
                <li>• Always include a GitHub link with clean, documented code</li>
                <li>• Add a live demo link if possible (Vercel, Netlify, GitHub Pages)</li>
                <li>• Quantify impact: users, performance gains, downloads, stars</li>
                <li>• For hackathon projects, mention placement/awards</li>
                <li>• Choose projects that demonstrate skills relevant to your target role</li>
                <li>• Include a mix of individual and team projects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
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

// Separate component for highlight input in existing entries
const HighlightInput = ({ entryId, highlights, onUpdate }) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const newHighlights = [...highlights, inputValue.trim()]
      onUpdate(entryId, 'highlights', newHighlights)
      setInputValue('')
    }
  }

  return (
    <Input
      type="text"
      placeholder="Type a highlight and press Enter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default ProjectsSection