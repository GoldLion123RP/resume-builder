import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useResume from '@/hooks/useResume'

const CertificationsSection = () => {
  const { resumeData, addItem, updateItem, deleteItem } = useResume()
  const certifications = resumeData?.certifications || []

  const [expandedId, setExpandedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState(getEmptyCertification())

  function getEmptyCertification() {
    return {
      id: '',
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      noExpiry: true,
      credentialId: '',
      credentialUrl: '',
    }
  }

  const generateId = () => {
    return `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setNewEntry({ ...getEmptyCertification(), id: generateId() })
    setExpandedId(null)
  }

  const handleSaveNew = () => {
    if (!newEntry.name || !newEntry.issuer) {
      alert('Please fill in Certificate Name and Issuing Organization')
      return
    }
    addItem('certifications', newEntry)
    setIsAdding(false)
    setNewEntry(getEmptyCertification())
  }

  const handleCancelNew = () => {
    setIsAdding(false)
    setNewEntry(getEmptyCertification())
  }

  const handleUpdate = (id, field, value) => {
    updateItem('certifications', id, { [field]: value })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      deleteItem('certifications', id)
      if (expandedId === id) setExpandedId(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
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
            <Label htmlFor={`name-${entry.id}`}>
              Certificate Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`name-${entry.id}`}
              type="text"
              placeholder="AWS Certified Cloud Practitioner"
              value={entry.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`issuer-${entry.id}`}>
              Issuing Organization <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`issuer-${entry.id}`}
              type="text"
              placeholder="Amazon Web Services"
              value={entry.issuer || ''}
              onChange={(e) => handleChange('issuer', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`issueDate-${entry.id}`}>Issue Date</Label>
            <Input
              id={`issueDate-${entry.id}`}
              type="month"
              value={entry.issueDate || ''}
              onChange={(e) => handleChange('issueDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`expiryDate-${entry.id}`}>Expiry Date</Label>
            <Input
              id={`expiryDate-${entry.id}`}
              type="month"
              value={entry.expiryDate || ''}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              disabled={entry.noExpiry}
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer h-10">
              <input
                type="checkbox"
                checked={entry.noExpiry || false}
                onChange={(e) => handleChange('noExpiry', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">No Expiry</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`credentialId-${entry.id}`}>Credential ID</Label>
            <Input
              id={`credentialId-${entry.id}`}
              type="text"
              placeholder="ABC123XYZ"
              value={entry.credentialId || ''}
              onChange={(e) => handleChange('credentialId', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`credentialUrl-${entry.id}`}>Credential URL</Label>
            <Input
              id={`credentialUrl-${entry.id}`}
              type="url"
              placeholder="https://www.credential.net/..."
              value={entry.credentialUrl || ''}
              onChange={(e) => handleChange('credentialUrl', e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            📜 Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your professional certifications and online course completions.
          </p>
        </div>
        {!isAdding && (
          <Button onClick={handleAddNew}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Certification
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Add New Certification</CardTitle>
            <CardDescription>Fill in your certification details</CardDescription>
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
                Save Certification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {certifications.length > 0 ? (
        <div className="space-y-4">
          {certifications.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {entry.name || 'Certificate Name'}
                      </h3>
                      {entry.credentialUrl && (
                        <a
                          href={entry.credentialUrl}
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
                    <p className="text-gray-600 dark:text-gray-400">{entry.issuer}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      {entry.issueDate && <span>Issued: {formatDate(entry.issueDate)}</span>}
                      {entry.credentialId && <span>ID: {entry.credentialId}</span>}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No certifications added yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Add your professional certificates</p>
              <Button onClick={handleAddNew}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Certification
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
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Certification Tips</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Include certifications relevant to your target role</li>
                <li>• Popular platforms: Coursera, Udemy, AWS, Google, Microsoft</li>
                <li>• Always include verification links when available</li>
                <li>• List most recent or most relevant certifications first</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CertificationsSection