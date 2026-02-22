import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const AchievementsSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const achievements = resumeData?.achievements || []

  const [expandedId, setExpandedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyAchievement())

  function getEmptyAchievement() {
    return {
      id: '',
      title: '',
      organization: '',
      date: '',
      type: 'award', // award, competition, scholarship, recognition, other
      description: '',
      scale: '', // national, international, university, state, etc.
    }
  }

  const generateId = () => {
    return `ach_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyAchievement(), id: generateId() })
    setExpandedId(null)
  }

  const handleSaveNew = () => {
    if (!newEntry.title) {
      alert('Please fill in the Achievement Title')
      return
    }
    addItem('achievements', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyAchievement())
  }

  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyAchievement())
  }

  const handleUpdate = (id, field, value) => {
    updateItem('achievements', id, { [field]: value })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      deleteItem('achievements', id)
      if (expandedId === id) setExpandedId(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getTypeLabel = (type) => {
    const types = {
      'award': 'Award',
      'competition': 'Competition',
      'scholarship': 'Scholarship',
      'recognition': 'Recognition',
      'hackathon': 'Hackathon',
      'other': 'Other',
    }
    return types[type] || type
  }

  const getTypeBadgeVariant = (type) => {
    const variants = {
      'award': 'default',
      'competition': 'success',
      'scholarship': 'secondary',
      'recognition': 'outline',
      'hackathon': 'success',
      'other': 'outline',
    }
    return variants[type] || 'default'
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`title-${entry.id}`}>
              Achievement Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`title-${entry.id}`}
              type="text"
              placeholder="Smart India Hackathon Finalist"
              value={entry.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`organization-${entry.id}`}>Organization / Event</Label>
            <Input
              id={`organization-${entry.id}`}
              type="text"
              placeholder="Ministry of Education, India"
              value={entry.organization || ''}
              onChange={(e) => handleChange('organization', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`type-${entry.id}`}>Type</Label>
            <select
              id={`type-${entry.id}`}
              value={entry.type || 'award'}
              onChange={(e) => handleChange('type', e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="award">Award</option>
              <option value="competition">Competition</option>
              <option value="hackathon">Hackathon</option>
              <option value="scholarship">Scholarship</option>
              <option value="recognition">Recognition</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor={`date-${entry.id}`}>Date</Label>
            <Input
              id={`date-${entry.id}`}
              type="month"
              value={entry.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`scale-${entry.id}`}>Scale / Level</Label>
            <select
              id={`scale-${entry.id}`}
              value={entry.scale || ''}
              onChange={(e) => handleChange('scale', e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select level...</option>
              <option value="international">International</option>
              <option value="national">National</option>
              <option value="state">State</option>
              <option value="university">University</option>
              <option value="college">College</option>
              <option value="department">Department</option>
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor={`description-${entry.id}`}>Description (Optional)</Label>
          <Textarea
            id={`description-${entry.id}`}
            placeholder="Brief description of the achievement, your role, and impact..."
            value={entry.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={2}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🏆 Achievements & Awards
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Highlight your competitions, awards, scholarships, and recognitions.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Achievement
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Achievement</CardTitle>
            <CardDescription>Fill in your achievement details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderFormFields(newEntry, true)}
            <Separator className="my-4" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelNew}>Cancel</Button>
              <Button onClick={handleSaveNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Achievement
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {achievements.length > 0 ? (
        <div className="space-y-4">
          {achievements.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {entry.title || 'Achievement Title'}
                      </h3>
                      <Badge variant={getTypeBadgeVariant(entry.type)} className="text-xs">
                        {getTypeLabel(entry.type)}
                      </Badge>
                      {entry.scale && (
                        <Badge variant="outline" className="text-xs capitalize">
                          {entry.scale}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{entry.organization}</p>
                    {entry.date && (
                      <p className="text-sm text-gray-500 mt-1">{formatDate(entry.date)}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === entry.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              {expandedId === entry.id && (
                <>
                  <Separator />
                  <CardContent className="pt-4">{renderFormFields(entry, false)}</CardContent>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No achievements added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Add your awards and accomplishments</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Achievement
              </Button>
            </CardContent>
          </Card>
        )
      )}

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Achievement Tips</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Include hackathons, coding competitions, and olympiads</li>
                <li>• Mention the scale (National, International) to show impact</li>
                <li>• Include placement: "1st Place", "Top 10", "Finalist"</li>
                <li>• Add scholarships and academic honors</li>
                <li>• Quantify when possible: "Among 5000+ participants"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AchievementsSection