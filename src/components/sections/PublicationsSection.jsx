import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const PublicationsSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const publications = resumeData?.publications || []

  const [expandedId, setExpandedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyPublication())

  function getEmptyPublication() {
    return {
      id: '',
      title: '',
      authors: '',
      venue: '',
      type: 'conference', // conference, journal, workshop, thesis, preprint
      date: '',
      doi: '',
      url: '',
      abstract: '',
      status: 'published', // published, accepted, under-review, preprint
    }
  }

  const generateId = () => {
    return `pub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyPublication(), id: generateId() })
    setExpandedId(null)
  }

  const handleSaveNew = () => {
    if (!newEntry.title) {
      alert('Please fill in the Publication Title')
      return
    }
    addItem('publications', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyPublication())
  }

  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyPublication())
  }

  const handleUpdate = (id, field, value) => {
    updateItem('publications', id, { [field]: value })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      deleteItem('publications', id)
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
      'conference': 'Conference',
      'journal': 'Journal',
      'workshop': 'Workshop',
      'thesis': 'Thesis',
      'preprint': 'Preprint',
      'book-chapter': 'Book Chapter',
    }
    return types[type] || type
  }

  const getStatusLabel = (status) => {
    const statuses = {
      'published': 'Published',
      'accepted': 'Accepted',
      'under-review': 'Under Review',
      'preprint': 'Preprint',
    }
    return statuses[status] || status
  }

  const getStatusBadgeVariant = (status) => {
    const variants = {
      'published': 'success',
      'accepted': 'default',
      'under-review': 'secondary',
      'preprint': 'outline',
    }
    return variants[status] || 'default'
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
        <div>
          <Label htmlFor={`title-${entry.id}`}>
            Paper Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id={`title-${entry.id}`}
            type="text"
            placeholder="A Novel Approach to Machine Learning..."
            value={entry.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor={`authors-${entry.id}`}>Authors</Label>
          <Input
            id={`authors-${entry.id}`}
            type="text"
            placeholder="John Doe, Jane Smith, et al."
            value={entry.authors || ''}
            onChange={(e) => handleChange('authors', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">List all authors in order (highlight your name in bold on resume)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`venue-${entry.id}`}>Venue / Journal</Label>
            <Input
              id={`venue-${entry.id}`}
              type="text"
              placeholder="IEEE Conference on..., Nature, arXiv"
              value={entry.venue || ''}
              onChange={(e) => handleChange('venue', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`date-${entry.id}`}>Publication Date</Label>
            <Input
              id={`date-${entry.id}`}
              type="month"
              value={entry.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`type-${entry.id}`}>Publication Type</Label>
            <select
              id={`type-${entry.id}`}
              value={entry.type || 'conference'}
              onChange={(e) => handleChange('type', e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="conference">Conference Paper</option>
              <option value="journal">Journal Article</option>
              <option value="workshop">Workshop Paper</option>
              <option value="thesis">Thesis/Dissertation</option>
              <option value="preprint">Preprint (arXiv, etc.)</option>
              <option value="book-chapter">Book Chapter</option>
            </select>
          </div>
          <div>
            <Label htmlFor={`status-${entry.id}`}>Status</Label>
            <select
              id={`status-${entry.id}`}
              value={entry.status || 'published'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="published">Published</option>
              <option value="accepted">Accepted</option>
              <option value="under-review">Under Review</option>
              <option value="preprint">Preprint</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`doi-${entry.id}`}>DOI</Label>
            <Input
              id={`doi-${entry.id}`}
              type="text"
              placeholder="10.1000/xyz123"
              value={entry.doi || ''}
              onChange={(e) => handleChange('doi', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`url-${entry.id}`}>Paper URL</Label>
            <Input
              id={`url-${entry.id}`}
              type="url"
              placeholder="https://arxiv.org/abs/..."
              value={entry.url || ''}
              onChange={(e) => handleChange('url', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor={`abstract-${entry.id}`}>Brief Description (Optional)</Label>
          <Textarea
            id={`abstract-${entry.id}`}
            placeholder="One-line summary of your research contribution..."
            value={entry.abstract || ''}
            onChange={(e) => handleChange('abstract', e.target.value)}
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
            📝 Publications & Research
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your research papers, publications, and academic contributions.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Publication
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Publication</CardTitle>
            <CardDescription>Fill in your publication details</CardDescription>
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
                Save Publication
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {publications.length > 0 ? (
        <div className="space-y-4">
          {publications.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {entry.title || 'Publication Title'}
                      </h3>
                      {entry.url && (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-primary-500 hover:text-primary-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{entry.authors}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(entry.type)}
                      </Badge>
                      <Badge variant={getStatusBadgeVariant(entry.status)} className="text-xs">
                        {getStatusLabel(entry.status)}
                      </Badge>
                      {entry.venue && (
                        <span className="text-sm text-gray-500">{entry.venue}</span>
                      )}
                      {entry.date && (
                        <span className="text-sm text-gray-500">• {formatDate(entry.date)}</span>
                      )}
                    </div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No publications added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Add your research papers and academic work</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Publication
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
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Publication Tips</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Include papers under review with status noted</li>
                <li>• Add preprints (arXiv) if no published papers yet</li>
                <li>• Always include DOI or link for verification</li>
                <li>• List all authors; your name will be highlighted</li>
                <li>• Include thesis work if relevant to target role</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PublicationsSection