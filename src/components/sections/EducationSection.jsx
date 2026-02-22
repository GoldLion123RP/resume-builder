import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const EducationSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const education = resumeData?.education || []

  const [expandedId, setExpandedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyEducation())
  const [courseworkInput, setCourseworkInput] = useState('')

  // Empty education template
  function getEmptyEducation() {
    return {
      id: '',
      degree: '',
      field: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      cgpa: '',
      maxCgpa: '10',
      coursework: [],
      achievements: '',
    }
  }

  // Generate unique ID
  const generateId = () => {
    return `edu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Handle adding new entry
  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyEducation(), id: generateId() })
    setExpandedId(null)
  }

  // Handle save new entry
  const handleSaveNew = () => {
    if (!newEntry.degree || !newEntry.institution) {
      alert('Please fill in at least Degree and Institution')
      return
    }
    addItem('education', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyEducation())
    setCourseworkInput('')
  }

  // Handle cancel new entry
  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyEducation())
    setCourseworkInput('')
  }

  // Handle update existing entry
  const handleUpdate = (id, field, value) => {
    updateItem('education', id, { [field]: value })
  }

  // Handle delete entry
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      deleteItem('education', id)
      if (expandedId === id) setExpandedId(null)
    }
  }

  // Handle coursework tags (for new entry)
  const handleAddCoursework = (e) => {
    if (e.key === 'Enter' && courseworkInput.trim()) {
      e.preventDefault()
      const newCoursework = [...(newEntry.coursework || []), courseworkInput.trim()]
      setNewEntry({ ...newEntry, coursework: newCoursework })
      setCourseworkInput('')
    }
  }

  const handleRemoveCoursework = (index) => {
    const newCoursework = newEntry.coursework.filter((_, i) => i !== index)
    setNewEntry({ ...newEntry, coursework: newCoursework })
  }

  // Handle coursework tags (for existing entry)
  const handleAddCourseworkExisting = (id, currentCoursework, inputValue, setInputValue) => {
    if (inputValue.trim()) {
      const newCoursework = [...(currentCoursework || []), inputValue.trim()]
      updateItem('education', id, { coursework: newCoursework })
      setInputValue('')
    }
  }

  const handleRemoveCourseworkExisting = (id, currentCoursework, index) => {
    const newCoursework = currentCoursework.filter((_, i) => i !== index)
    updateItem('education', id, { coursework: newCoursework })
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  // Render education form fields
  const renderFormFields = (entry, isNew = false, courseworkInputState = null) => {
    const handleChange = (field, value) => {
      if (isNew) {
        setNewEntry({ ...newEntry, [field]: value })
      } else {
        handleUpdate(entry.id, field, value)
      }
    }

    return (
      <div className="space-y-4">
        {/* Degree and Field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`degree-${entry.id}`}>
              Degree <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`degree-${entry.id}`}
              type="text"
              placeholder="Bachelor of Technology (B.Tech)"
              value={entry.degree || ''}
              onChange={(e) => handleChange('degree', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`field-${entry.id}`}>Field of Study</Label>
            <Input
              id={`field-${entry.id}`}
              type="text"
              placeholder="Computer Science and Engineering"
              value={entry.field || ''}
              onChange={(e) => handleChange('field', e.target.value)}
            />
          </div>
        </div>

        {/* Institution and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`institution-${entry.id}`}>
              Institution <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`institution-${entry.id}`}
              type="text"
              placeholder="Indian Institute of Technology Delhi"
              value={entry.institution || ''}
              onChange={(e) => handleChange('institution', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`location-${entry.id}`}>Location</Label>
            <Input
              id={`location-${entry.id}`}
              type="text"
              placeholder="New Delhi, India"
              value={entry.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
            />
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
              <span className="text-sm text-gray-700 dark:text-gray-300">Currently studying</span>
            </label>
          </div>
        </div>

        {/* CGPA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`cgpa-${entry.id}`}>CGPA / Percentage</Label>
            <div className="flex gap-2 items-center">
              <Input
                id={`cgpa-${entry.id}`}
                type="text"
                placeholder="8.5"
                value={entry.cgpa || ''}
                onChange={(e) => handleChange('cgpa', e.target.value)}
                className="w-24"
              />
              <span className="text-gray-500">/</span>
              <Input
                type="text"
                placeholder="10"
                value={entry.maxCgpa || '10'}
                onChange={(e) => handleChange('maxCgpa', e.target.value)}
                className="w-20"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">e.g., 8.5/10 or 85/100</p>
          </div>
        </div>

        {/* Coursework */}
        <div>
          <Label>Relevant Coursework</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(entry.coursework || []).map((course, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {course}
                <button
                  type="button"
                  onClick={() => {
                    if (isNew) {
                      handleRemoveCoursework(index)
                    } else {
                      handleRemoveCourseworkExisting(entry.id, entry.coursework, index)
                    }
                  }}
                  className="ml-1 hover:text-red-500"
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
              placeholder="Type a course and press Enter"
              value={courseworkInput}
              onChange={(e) => setCourseworkInput(e.target.value)}
              onKeyDown={handleAddCoursework}
            />
          ) : (
            <CourseworkInput
              entryId={entry.id}
              coursework={entry.coursework || []}
              onAdd={handleAddCourseworkExisting}
            />
          )}
          <p className="text-xs text-gray-500 mt-1">Press Enter to add each course</p>
        </div>

        {/* Achievements */}
        <div>
          <Label htmlFor={`achievements-${entry.id}`}>Achievements / Notes</Label>
          <Textarea
            id={`achievements-${entry.id}`}
            placeholder="Dean's List, Academic scholarships, relevant honors..."
            value={entry.achievements || ''}
            onChange={(e) => handleChange('achievements', e.target.value)}
            rows={2}
          />
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
            🎓 Education
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your degrees, universities, and academic achievements.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Education
          </Button>
        )}
      </div>

      {/* Add New Form */}
      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Education</CardTitle>
            <CardDescription>Fill in your education details</CardDescription>
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
                Save Education
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Entries */}
      {education.length > 0 ? (
        <div className="space-y-4">
          {education.map((entry, index) => (
            <Card key={entry.id} className="overflow-hidden">
              {/* Collapsed View */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {entry.degree || 'Degree'}
                        {entry.field && <span className="font-normal text-gray-600 dark:text-gray-400"> in {entry.field}</span>}
                      </h3>
                      {entry.current && (
                        <Badge variant="success" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{entry.institution || 'Institution'}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {(entry.startDate || entry.endDate) && (
                        <span>
                          {formatDate(entry.startDate)} - {entry.current ? 'Present' : formatDate(entry.endDate)}
                        </span>
                      )}
                      {entry.cgpa && (
                        <span>CGPA: {entry.cgpa}/{entry.maxCgpa || '10'}</span>
                      )}
                    </div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No education added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Start by adding your most recent degree</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Education
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
                💡 Education Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• List education in reverse chronological order (most recent first)</li>
                <li>• Include relevant coursework that matches the job description</li>
                <li>• Only include CGPA if it's above 7.0/10 or 3.0/4.0</li>
                <li>• For students, education goes before experience</li>
                <li>• Add academic achievements, honors, or Dean's List mentions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Separate component for coursework input in existing entries (to manage local state)
const CourseworkInput = ({ entryId, coursework, onAdd }) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      onAdd(entryId, coursework, inputValue, setInputValue)
    }
  }

  return (
    <Input
      type="text"
      placeholder="Type a course and press Enter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default EducationSection