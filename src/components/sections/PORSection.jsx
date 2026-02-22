import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const PORSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const por = resumeData?.por || []

  const [expandedId, setExpandedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyPOR())
  const [bulletInput, setBulletInput] = useState('')

  function getEmptyPOR() {
    return {
      id: '',
      role: '',
      organization: '',
      type: 'club', // club, student-body, volunteer, community, other
      startDate: '',
      endDate: '',
      current: false,
      bullets: [],
    }
  }

  const generateId = () => {
    return `por_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyPOR(), id: generateId() })
    setExpandedId(null)
  }

  const handleSaveNew = () => {
    if (!newEntry.role || !newEntry.organization) {
      alert('Please fill in Role and Organization')
      return
    }
    addItem('por', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyPOR())
    setBulletInput('')
  }

  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyPOR())
    setBulletInput('')
  }

  const handleUpdate = (id, field, value) => {
    updateItem('por', id, { [field]: value })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      deleteItem('por', id)
      if (expandedId === id) setExpandedId(null)
    }
  }

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

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getTypeLabel = (type) => {
    const types = {
      'club': 'Club/Society',
      'student-body': 'Student Body',
      'volunteer': 'Volunteer',
      'community': 'Community',
      'committee': 'Committee',
      'other': 'Other',
    }
    return types[type] || type
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
            <Label htmlFor={`role-${entry.id}`}>
              Role / Position <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`role-${entry.id}`}
              type="text"
              placeholder="Technical Lead, President, Coordinator"
              value={entry.role || ''}
              onChange={(e) => handleChange('role', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`organization-${entry.id}`}>
              Organization <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`organization-${entry.id}`}
              type="text"
              placeholder="Coding Club, Student Council"
              value={entry.organization || ''}
              onChange={(e) => handleChange('organization', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor={`type-${entry.id}`}>Type</Label>
            <select
              id={`type-${entry.id}`}
              value={entry.type || 'club'}
              onChange={(e) => handleChange('type', e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="club">Club/Society</option>
              <option value="student-body">Student Body</option>
              <option value="committee">Committee</option>
              <option value="volunteer">Volunteer</option>
              <option value="community">Community</option>
              <option value="other">Other</option>
            </select>
          </div>
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
              <span className="text-sm text-gray-700 dark:text-gray-300">Current</span>
            </label>
          </div>
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
              placeholder="Type a responsibility and press Enter"
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
            💡 Use action verbs: Led, Organized, Coordinated, Managed, Mentored
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            👥 Positions of Responsibility
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your leadership roles, club positions, and team management experience.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Position
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Position</CardTitle>
            <CardDescription>Fill in your leadership role details</CardDescription>
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
                Save Position
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {por.length > 0 ? (
        <div className="space-y-4">
          {por.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
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
                    <p className="text-gray-600 dark:text-gray-400">{entry.organization}</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No positions added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Add your leadership roles and responsibilities</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Position
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
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Leadership Tips</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Include club positions, event coordination, and team leads</li>
                <li>• Quantify impact: team size, events organized, people reached</li>
                <li>• Highlight leadership skills: communication, delegation, problem-solving</li>
                <li>• Include volunteer work and community involvement</li>
                <li>• Show progression in responsibility over time</li>
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
      placeholder="Type a responsibility and press Enter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default PORSection