import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const LanguagesSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const languages = resumeData?.languages || []

  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyLanguage())

  function getEmptyLanguage() {
    return {
      id: '',
      language: '',
      proficiency: 'intermediate', // native, fluent, professional, intermediate, basic
    }
  }

  const generateId = () => {
    return `lang_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyLanguage(), id: generateId() })
  }

  const handleSaveNew = () => {
    if (!newEntry.language) {
      alert('Please fill in the Language Name')
      return
    }
    // Check for duplicate
    if (languages.some(l => l.language.toLowerCase() === newEntry.language.toLowerCase())) {
      alert('This language is already added')
      return
    }
    addItem('languages', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyLanguage())
  }

  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyLanguage())
  }

  const handleUpdate = (id, field, value) => {
    updateItem('languages', id, { [field]: value })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this language?')) {
      deleteItem('languages', id)
    }
  }

  const getProficiencyLabel = (level) => {
    const labels = {
      'native': 'Native',
      'fluent': 'Fluent',
      'professional': 'Professional',
      'intermediate': 'Intermediate',
      'basic': 'Basic',
    }
    return labels[level] || level
  }

  const getProficiencyBadgeVariant = (level) => {
    const variants = {
      'native': 'default',
      'fluent': 'success',
      'professional': 'secondary',
      'intermediate': 'outline',
      'basic': 'outline',
    }
    return variants[level] || 'outline'
  }

  const getProficiencyDescription = (level) => {
    const descriptions = {
      'native': 'Native speaker or bilingual proficiency',
      'fluent': 'Full professional fluency, like a native',
      'professional': 'Can work effectively in this language',
      'intermediate': 'Can hold conversations, some limitations',
      'basic': 'Basic understanding and simple communication',
    }
    return descriptions[level] || ''
  }

  const getProficiencyPercent = (level) => {
    const percents = {
      'native': 100,
      'fluent': 90,
      'professional': 75,
      'intermediate': 50,
      'basic': 25,
    }
    return percents[level] || 50
  }

  const getProficiencyColor = (level) => {
    const colors = {
      'native': 'bg-green-500',
      'fluent': 'bg-blue-500',
      'professional': 'bg-primary-500',
      'intermediate': 'bg-yellow-500',
      'basic': 'bg-gray-400',
    }
    return colors[level] || 'bg-gray-400'
  }

  // Common languages for quick add
  const commonLanguages = [
    'English', 'Hindi', 'Spanish', 'French', 'German', 
    'Mandarin', 'Japanese', 'Arabic', 'Portuguese', 'Russian',
    'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Kannada',
  ]

  const availableLanguages = commonLanguages.filter(
    lang => !languages.some(l => l.language.toLowerCase() === lang.toLowerCase())
  )

  const handleQuickAdd = (language) => {
    const entry = {
      id: generateId(),
      language: language,
      proficiency: 'intermediate',
    }
    addItem('languages', entry)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🌐 Languages
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add languages you speak and your proficiency level.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Language
          </Button>
        )}
      </div>

      {/* Add New Form */}
      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Language</CardTitle>
            <CardDescription>Select language and proficiency level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-language">
                  Language <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="new-language"
                  type="text"
                  placeholder="English, Hindi, Spanish..."
                  value={newEntry.language || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, language: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="new-proficiency">Proficiency Level</Label>
                <select
                  id="new-proficiency"
                  value={newEntry.proficiency || 'intermediate'}
                  onChange={(e) => setNewEntry({ ...newEntry, proficiency: e.target.value })}
                  className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="native">Native</option>
                  <option value="fluent">Fluent</option>
                  <option value="professional">Professional</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="basic">Basic</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {getProficiencyDescription(newEntry.proficiency)}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelNew}>Cancel</Button>
              <Button onClick={handleSaveNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Language
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Languages */}
      {languages.length > 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {languages.map((entry) => (
                <div key={entry.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  {/* Language Flag/Icon */}
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🗣️</span>
                  </div>

                  {/* Language Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {entry.language}
                      </h3>
                      <Badge variant={getProficiencyBadgeVariant(entry.proficiency)} className="text-xs">
                        {getProficiencyLabel(entry.proficiency)}
                      </Badge>
                    </div>
                    {/* Proficiency Bar */}
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProficiencyColor(entry.proficiency)} transition-all duration-300`}
                        style={{ width: `${getProficiencyPercent(entry.proficiency)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Proficiency Selector */}
                  <select
                    value={entry.proficiency}
                    onChange={(e) => handleUpdate(entry.id, 'proficiency', e.target.value)}
                    className="h-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="native">Native</option>
                    <option value="fluent">Fluent</option>
                    <option value="professional">Professional</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="basic">Basic</option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    title="Remove language"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        !isAdding && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No languages added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Add languages you speak</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Language
              </Button>
            </CardContent>
          </Card>
        )
      )}

      {/* Quick Add Common Languages */}
      {availableLanguages.length > 0 && languages.length < 6 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Quick Add</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {availableLanguages.slice(0, 8).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleQuickAdd(lang)}
                  className="px-3 py-1.5 text-sm rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  + {lang}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
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
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Language Tips</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• <strong>Native:</strong> Grew up speaking this language</li>
                <li>• <strong>Fluent:</strong> Can work and converse comfortably</li>
                <li>• <strong>Professional:</strong> Can use in work settings</li>
                <li>• <strong>Intermediate:</strong> Can hold basic conversations</li>
                <li>• <strong>Basic:</strong> Know fundamentals, learning</li>
                <li>• Only list languages you can actually demonstrate</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LanguagesSection