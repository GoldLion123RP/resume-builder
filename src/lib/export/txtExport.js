// Helper to create section divider
const createDivider = (char = '=', length = 60) => {
  return char.repeat(length)
}

// Helper to format date range
const formatDateRange = (startDate, endDate, current) => {
  const start = startDate || ''
  const end = current ? 'Present' : endDate || ''
  if (start && end) return `${start} - ${end}`
  if (start) return start
  if (end) return end
  return ''
}

// Helper to wrap text at specified width
const wrapText = (text, maxWidth = 80) => {
  if (!text) return ''
  
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  words.forEach((word) => {
    if ((currentLine + ' ' + word).trim().length <= maxWidth) {
      currentLine = (currentLine + ' ' + word).trim()
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  })

  if (currentLine) lines.push(currentLine)
  return lines.join('\n')
}

// Generate Profile Section
const generateProfileSection = (profile) => {
  if (!profile) return ''

  const lines = []

  // Name (centered-ish with emphasis)
  if (profile.fullName) {
    lines.push(createDivider('='))
    lines.push(profile.fullName.toUpperCase())
    lines.push(createDivider('='))
  }

  // Title
  if (profile.title) {
    lines.push(profile.title)
  }

  lines.push('')

  // Contact info
  const contactLines = []
  if (profile.email) contactLines.push(`Email: ${profile.email}`)
  if (profile.phone) contactLines.push(`Phone: ${profile.phone}`)
  if (profile.location) contactLines.push(`Location: ${profile.location}`)

  if (contactLines.length > 0) {
    lines.push(contactLines.join(' | '))
  }

  // Links
  const linkLines = []
  if (profile.linkedin) linkLines.push(`LinkedIn: ${profile.linkedin}`)
  if (profile.github) linkLines.push(`GitHub: ${profile.github}`)
  if (profile.portfolio) linkLines.push(`Portfolio: ${profile.portfolio}`)

  if (linkLines.length > 0) {
    lines.push(linkLines.join(' | '))
  }

  // Summary
  if (profile.summary) {
    lines.push('')
    lines.push('PROFESSIONAL SUMMARY')
    lines.push(createDivider('-', 40))
    lines.push(wrapText(profile.summary))
  }

  return lines.join('\n')
}

// Generate Education Section
const generateEducationSection = (education) => {
  if (!education || education.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('EDUCATION')
  lines.push(createDivider('-', 40))

  education.forEach((edu, index) => {
    if (index > 0) lines.push('')

    // Degree and Institution
    if (edu.degree) {
      lines.push(edu.degree)
    }
    if (edu.institution) {
      lines.push(edu.institution)
    }

    // Meta info
    const meta = []
    const dateRange = formatDateRange(edu.startDate, edu.endDate, edu.current)
    if (dateRange) meta.push(dateRange)
    if (edu.location) meta.push(edu.location)
    if (edu.gpa) meta.push(`GPA: ${edu.gpa}`)

    if (meta.length > 0) {
      lines.push(meta.join(' | '))
    }

    // Coursework
    if (edu.coursework) {
      lines.push(`Relevant Coursework: ${edu.coursework}`)
    }
  })

  return lines.join('\n')
}

// Generate Experience Section
const generateExperienceSection = (experience) => {
  if (!experience || experience.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('PROFESSIONAL EXPERIENCE')
  lines.push(createDivider('-', 40))

  experience.forEach((exp, index) => {
    if (index > 0) lines.push('')

    // Job Title and Company
    if (exp.jobTitle) {
      lines.push(exp.jobTitle)
    }
    if (exp.company) {
      lines.push(exp.company)
    }

    // Meta info
    const meta = []
    const dateRange = formatDateRange(exp.startDate, exp.endDate, exp.current)
    if (dateRange) meta.push(dateRange)
    if (exp.location) meta.push(exp.location)
    if (exp.type) meta.push(exp.type)

    if (meta.length > 0) {
      lines.push(meta.join(' | '))
    }

    // Description
    if (exp.description) {
      lines.push('')
      const bullets = exp.description
        .split('\n')
        .map((line) => line.replace(/^[-•]\s*/, '').trim())
        .filter((line) => line.length > 0)

      bullets.forEach((bullet) => {
        lines.push(`  • ${wrapText(bullet, 76).split('\n').join('\n    ')}`)
      })
    }

    // Technologies
    if (exp.technologies) {
      lines.push(`  Technologies: ${exp.technologies}`)
    }
  })

  return lines.join('\n')
}

// Generate Projects Section
const generateProjectsSection = (projects) => {
  if (!projects || projects.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('PROJECTS')
  lines.push(createDivider('-', 40))

  projects.forEach((project, index) => {
    if (index > 0) lines.push('')

    // Project Name
    if (project.name) {
      lines.push(project.name)
    }

    // Links
    if (project.liveUrl) {
      lines.push(`Live: ${project.liveUrl}`)
    }
    if (project.githubUrl) {
      lines.push(`GitHub: ${project.githubUrl}`)
    }

    // Description
    if (project.description) {
      const bullets = project.description
        .split('\n')
        .map((line) => line.replace(/^[-•]\s*/, '').trim())
        .filter((line) => line.length > 0)

      bullets.forEach((bullet) => {
        lines.push(`  • ${wrapText(bullet, 76).split('\n').join('\n    ')}`)
      })
    }

    // Technologies
    if (project.technologies) {
      lines.push(`  Technologies: ${project.technologies}`)
    }
  })

  return lines.join('\n')
}

// Generate Skills Section
const generateSkillsSection = (skills) => {
  if (!skills || skills.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('SKILLS')
  lines.push(createDivider('-', 40))

  skills.forEach((skillGroup) => {
    if (skillGroup.category && skillGroup.skills) {
      lines.push(`${skillGroup.category}: ${skillGroup.skills}`)
    }
  })

  return lines.join('\n')
}

// Generate Certifications Section
const generateCertificationsSection = (certifications) => {
  if (!certifications || certifications.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('CERTIFICATIONS')
  lines.push(createDivider('-', 40))

  certifications.forEach((cert) => {
    const parts = []
    if (cert.name) parts.push(cert.name)
    if (cert.issuer) parts.push(cert.issuer)
    if (cert.date) parts.push(cert.date)

    lines.push(`• ${parts.join(' - ')}`)

    if (cert.credentialId) {
      lines.push(`  Credential ID: ${cert.credentialId}`)
    }
    if (cert.credentialUrl) {
      lines.push(`  Verify: ${cert.credentialUrl}`)
    }
  })

  return lines.join('\n')
}

// Generate Achievements Section
const generateAchievementsSection = (achievements) => {
  if (!achievements || achievements.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('ACHIEVEMENTS')
  lines.push(createDivider('-', 40))

  achievements.forEach((achievement) => {
    const parts = []
    if (achievement.title) parts.push(achievement.title)
    if (achievement.issuer) parts.push(achievement.issuer)
    if (achievement.date) parts.push(achievement.date)

    lines.push(`• ${parts.join(' - ')}`)

    if (achievement.description) {
      lines.push(`  ${wrapText(achievement.description, 76).split('\n').join('\n  ')}`)
    }
  })

  return lines.join('\n')
}

// Generate POR Section
const generatePORSection = (por) => {
  if (!por || por.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('POSITIONS OF RESPONSIBILITY')
  lines.push(createDivider('-', 40))

  por.forEach((position, index) => {
    if (index > 0) lines.push('')

    if (position.title) {
      lines.push(position.title)
    }
    if (position.organization) {
      lines.push(position.organization)
    }

    const dateRange = formatDateRange(position.startDate, position.endDate, position.current)
    if (dateRange) {
      lines.push(dateRange)
    }

    if (position.description) {
      const bullets = position.description
        .split('\n')
        .map((line) => line.replace(/^[-•]\s*/, '').trim())
        .filter((line) => line.length > 0)

      bullets.forEach((bullet) => {
        lines.push(`  • ${wrapText(bullet, 76).split('\n').join('\n    ')}`)
      })
    }
  })

  return lines.join('\n')
}

// Generate Publications Section
const generatePublicationsSection = (publications) => {
  if (!publications || publications.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('PUBLICATIONS')
  lines.push(createDivider('-', 40))

  publications.forEach((pub, index) => {
    if (index > 0) lines.push('')

    if (pub.title) {
      lines.push(pub.title)
    }

    const meta = []
    if (pub.authors) meta.push(pub.authors)
    if (pub.venue) meta.push(pub.venue)
    if (pub.date) meta.push(pub.date)

    if (meta.length > 0) {
      lines.push(meta.join(' | '))
    }

    if (pub.doi) {
      lines.push(`DOI: ${pub.doi}`)
    }
    if (pub.url) {
      lines.push(`URL: ${pub.url}`)
    }
  })

  return lines.join('\n')
}

// Generate Extracurricular Section
const generateExtracurricularSection = (extracurricular) => {
  if (!extracurricular || extracurricular.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('EXTRACURRICULAR ACTIVITIES')
  lines.push(createDivider('-', 40))

  extracurricular.forEach((activity) => {
    const parts = []
    if (activity.activity) parts.push(activity.activity)
    if (activity.organization) parts.push(activity.organization)
    if (activity.duration) parts.push(activity.duration)

    lines.push(`• ${parts.join(' - ')}`)

    if (activity.description) {
      lines.push(`  ${wrapText(activity.description, 76).split('\n').join('\n  ')}`)
    }
  })

  return lines.join('\n')
}

// Generate Languages Section
const generateLanguagesSection = (languages) => {
  if (!languages || languages.length === 0) return ''

  const lines = []
  lines.push('')
  lines.push('LANGUAGES')
  lines.push(createDivider('-', 40))

  const languageStrings = languages
    .map((lang) => {
      if (lang.language && lang.proficiency) {
        return `${lang.language} (${lang.proficiency})`
      }
      return lang.language || ''
    })
    .filter((l) => l)

  if (languageStrings.length > 0) {
    lines.push(languageStrings.join(', '))
  }

  return lines.join('\n')
}

// Main export function
export const exportToTxt = (resumeData) => {
  try {
    const sections = []

    // Generate all sections
    sections.push(generateProfileSection(resumeData.profile))
    sections.push(generateEducationSection(resumeData.education))
    sections.push(generateExperienceSection(resumeData.experience))
    sections.push(generateProjectsSection(resumeData.projects))
    sections.push(generateSkillsSection(resumeData.skills))
    sections.push(generateCertificationsSection(resumeData.certifications))
    sections.push(generateAchievementsSection(resumeData.achievements))
    sections.push(generatePORSection(resumeData.por))
    sections.push(generatePublicationsSection(resumeData.publications))
    sections.push(generateExtracurricularSection(resumeData.extracurricular))
    sections.push(generateLanguagesSection(resumeData.languages))

    // Filter empty sections and join
    const content = sections.filter((s) => s.trim()).join('\n')

    // Add footer
    const footer = `\n\n${createDivider('=')}\nGenerated by Resume Builder | ${new Date().toLocaleDateString()}\n${createDivider('=')}`

    const fullContent = content + footer

    // Create and download file
    const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' })
    const fileName = `${resumeData.profile?.fullName?.replace(/\s+/g, '_') || 'Resume'}_Resume.txt`

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return { success: true, fileName }
  } catch (error) {
    console.error('TXT export error:', error)
    throw new Error('Failed to generate TXT file. Please try again.')
  }
}

// Function to copy resume text to clipboard
export const copyToClipboard = async (resumeData) => {
  try {
    const sections = []

    sections.push(generateProfileSection(resumeData.profile))
    sections.push(generateEducationSection(resumeData.education))
    sections.push(generateExperienceSection(resumeData.experience))
    sections.push(generateProjectsSection(resumeData.projects))
    sections.push(generateSkillsSection(resumeData.skills))
    sections.push(generateCertificationsSection(resumeData.certifications))
    sections.push(generateAchievementsSection(resumeData.achievements))
    sections.push(generatePORSection(resumeData.por))
    sections.push(generatePublicationsSection(resumeData.publications))
    sections.push(generateExtracurricularSection(resumeData.extracurricular))
    sections.push(generateLanguagesSection(resumeData.languages))

    const content = sections.filter((s) => s.trim()).join('\n')

    await navigator.clipboard.writeText(content)

    return { success: true }
  } catch (error) {
    console.error('Clipboard copy error:', error)
    throw new Error('Failed to copy to clipboard. Please try again.')
  }
}

// Function to get plain text content (for preview)
export const getPlainTextContent = (resumeData) => {
  const sections = []

  sections.push(generateProfileSection(resumeData.profile))
  sections.push(generateEducationSection(resumeData.education))
  sections.push(generateExperienceSection(resumeData.experience))
  sections.push(generateProjectsSection(resumeData.projects))
  sections.push(generateSkillsSection(resumeData.skills))
  sections.push(generateCertificationsSection(resumeData.certifications))
  sections.push(generateAchievementsSection(resumeData.achievements))
  sections.push(generatePORSection(resumeData.por))
  sections.push(generatePublicationsSection(resumeData.publications))
  sections.push(generateExtracurricularSection(resumeData.extracurricular))
  sections.push(generateLanguagesSection(resumeData.languages))

  return sections.filter((s) => s.trim()).join('\n')
}

export default exportToTxt