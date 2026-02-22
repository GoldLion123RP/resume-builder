import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import useResume from '@/hooks/useResume'

const ProfileSection = () => {
  const { resumeData, updateProfile } = useResume()
  const profile = resumeData?.profile || {}

  const [imagePreview, setImagePreview] = useState(profile.imageUrl || '')
  const [isUploading, setIsUploading] = useState(false)

  // Handle input changes
  const handleChange = (field, value) => {
    updateProfile({ [field]: value })
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, etc.)')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB')
      return
    }

    setIsUploading(true)

    // Convert to base64 for preview and storage
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setImagePreview(base64String)
      updateProfile({ imageUrl: base64String })
      setIsUploading(false)
    }
    reader.onerror = () => {
      alert('Error reading file. Please try again.')
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview('')
    updateProfile({ imageUrl: '' })
    // Reset file input
    const fileInput = document.getElementById('profile-image-upload')
    if (fileInput) fileInput.value = ''
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          👤 Profile Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add your basic contact details and professional summary. This section is required.
        </p>
      </div>

      {/* Profile Image Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Upload a professional photo (optional, but recommended)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            {/* Avatar Preview */}
            <Avatar
              src={imagePreview}
              alt={profile.fullName || 'Profile'}
              size="2xl"
              fallback={profile.fullName?.[0]?.toUpperCase() || '?'}
            />

            {/* Upload Controls */}
            <div className="flex-1 space-y-3">
              <div>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('profile-image-upload')?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Upload Photo
                      </>
                    )}
                  </Button>
                  {imagePreview && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG, PNG or GIF. Max size 2MB. Square images work best.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Your contact details and identifying information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={profile.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={profile.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (234) 567-8900"
                value={profile.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="City, State, Country"
              value={profile.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              e.g., "San Francisco, CA" or "Remote"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social & Professional Links</CardTitle>
          <CardDescription>
            Add your online presence (all optional but recommended)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* LinkedIn */}
          <div>
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/johndoe"
              value={profile.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </div>

          {/* GitHub */}
          <div>
            <Label htmlFor="github">GitHub Profile</Label>
            <Input
              id="github"
              type="url"
              placeholder="https://github.com/johndoe"
              value={profile.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
            />
          </div>

          {/* Portfolio */}
          <div>
            <Label htmlFor="portfolio">Portfolio / Website</Label>
            <Input
              id="portfolio"
              type="url"
              placeholder="https://johndoe.com"
              value={profile.portfolio || ''}
              onChange={(e) => handleChange('portfolio', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Career Objective */}
      <Card>
        <CardHeader>
          <CardTitle>Career Objective / Summary</CardTitle>
          <CardDescription>
            A brief statement about your career goals (optional, 2-3 sentences)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            id="objective"
            placeholder="Passionate Computer Science student seeking a software engineering internship to apply my skills in full-stack development and contribute to innovative projects..."
            value={profile.objective || ''}
            onChange={(e) => handleChange('objective', e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Keep it concise and tailored to your target role. Focus on what you can offer.
          </p>
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
                💡 Profile Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                <li>• Use a professional email address (avoid nicknames)</li>
                <li>• Make sure your phone number is correct and active</li>
                <li>• LinkedIn profile should be complete and up-to-date</li>
                <li>• GitHub should showcase your best projects</li>
                <li>• Use a clear, professional headshot (good lighting, plain background)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileSection