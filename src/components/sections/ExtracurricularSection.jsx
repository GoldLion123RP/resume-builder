import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const ExtracurricularSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const extracurricular = resumeData?.extracurricular || []

  const [expandedId, setExpandedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyActivity())

  function getEmptyActivity() {
    return {
      id: '',
      activity: '',
      organization: '',
      role: '',
      type: 'club', // club, sports, volunteer, hobby, community, other
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }
  }

  const generateId = () => {
    return `extra_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyActivity(), id: generateId() })
    setExpandedId(null)
  }

  const handleSaveNew = () => {
    if (!newEntry.activity) {
      alert('Please fill in the Activity Name')
      return
    }
    addItem('extracurricular', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyActivity())
  }

  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyActivity())
  }

  const handleUpdate = (id, field, value) => {
    updateItem('extracurricular', id, { [field]: value })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      deleteItem('extracurricular', id)
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
      'club': 'Club',
      'sports': 'Sports',
      'volunteer': 'Volunteer',
      'hobby': 'Hobby',
      'community': 'Community',
      'cultural': 'Cultural',
      'other': 'Other',
    }
    return types[type] || type
  }

  const getTypeIcon = (type) => {
    const icons = {
      'club': '🎭',
      'sports': '⚽',
      'volunteer': '🤝',
      'hobby': '🎨',
      'community': '🌍',
      'cultural': '🎵',
      'other': '✨',
    }
    return icons[type] || '✨'
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
            <Label htmlFor={`activity-${entry.id}`}>
              Activity Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`activity-${entry.id}`}
              type="text"
              placeholder="Basketball, Drama Club, Volunteering"
              value={entry.activity || ''}
              onChange={(e) => handleChange('activity', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`organization-${entry.id}`}>Organization / Team</Label>
            <Input
              id={`organization-${entry.id}`}
              type="text"
              placeholder="University Team, NGO Name"
              value={entry.organization || ''}
              onChange={(e) => handleChange('organization', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`role-${entry.id}`}>Your Role</Label>
            <Input
              id={`role-${entry.id}`}
              type="text"
              placeholder="Team Captain, Member, Volunteer"
              value={entry.role || ''}
              onChange={(e) => handleChange('role', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`type-${entry.id}`}>Category</Label>
            <select
              id={`type-${entry.id}`}
              value={entry.type || 'club'}
              onChange={(e) => handleChange('type', e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="club">Club</option>
              <option value="sports">Sports</option>
              <option value="volunteer">Volunteer Work</option>
              <option value="hobby">Hobby</option>
              <option value="community">Community Service</option>
              <option value="cultural">Cultural Activity</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

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
              <span className="text-sm text-gray-700 dark:text-gray-300">Ongoing</span>
            </label>
          </div>
        </div>

        <div>
          <Label htmlFor={`description-${entry.id}`}>Description (Optional)</Label>
          <Textarea
            id={`description-${entry.id}`}
            placeholder="Brief description of your involvement, achievements, or learnings..."
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
            🎯 Extracurricular Activities
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your clubs, sports, volunteering, hobbies, and community involvement.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Activity
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Activity</CardTitle>
            <CardDescription>Fill in your extracurricular activity details</CardDescription>
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
                Save Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {extracurricular.length > 0 ? (
        <div className="space-y-4">
          {extracurricular.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xl">{getTypeIcon(entry.type)}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {entry.activity || 'Activity Name'}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(entry.type)}
                      </Badge>
                      {entry.current && (
                        <Badge variant="success" className="text-xs">Ongoing</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {entry.role && <span>{entry.role}</span>}
                      {entry.role && entry.organization && <span> at </span>}
                      {entry.organization && <span>{entry.organization}</span>}
                    </p>
                    {(entry.startDate || entry.endDate) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(entry.startDate)} - {entry.current ? 'Present' : formatDate(entry.endDate)}
                      </p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No activities added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Add your extracurricular activities and interests</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Activity
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
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Extracurricular Tips</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Include sports, music, arts, and creative pursuits</li>
                <li>• Volunteer work shows community involvement</li>
                <li>• Hobbies can be conversation starters in interviews</li>
                <li>• Show diversity in interests beyond academics</li>
                <li>• Include any leadership roles within activities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExtracurricularSection