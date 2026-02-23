import jsPDF from 'jspdf'

// Helper to format date range
const formatDateRange = (startDate, endDate, current) => {
  const start = startDate || ''
  const end = current ? 'Present' : endDate || ''
  if (start && end) return `${start} - ${end}`
  if (start) return start
  if (end) return end
  return ''
}

// Color schemes
const colors = {
  beautiful: {
    primary: [37, 99, 235], // Blue
    secondary: [75, 85, 99], // Gray
    text: [31, 41, 55], // Dark gray
    light: [107, 114, 128], // Light gray
    accent: [59, 130, 246], // Light blue
  },
  ats: {
    primary: [0, 0, 0], // Black
    secondary: [0, 0, 0], // Black
    text: [0, 0, 0], // Black
    light: [75, 75, 75], // Dark gray
    accent: [0, 0, 0], // Black
  },
}

// Main PDF export function
export const exportToPdf = async (resumeData, options = {}) => {
  const { atsMode = false } = options
  const colorScheme = atsMode ? colors.ats : colors.beautiful

  try {
    // Create new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    const contentWidth = pageWidth - margin * 2
    let yPosition = margin

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace = 20) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
        return true
      }
      return false
    }

    // Helper to set text color
    const setColor = (colorArray) => {
      doc.setTextColor(colorArray[0], colorArray[1], colorArray[2])
    }

    // Helper to draw a line
    const drawLine = (y, color = colorScheme.primary) => {
      doc.setDrawColor(color[0], color[1], color[2])
      doc.setLineWidth(0.5)
      doc.line(margin, y, pageWidth - margin, y)
    }

    // Helper to add section heading
    const addSectionHeading = (title) => {
      checkPageBreak(15)
      yPosition += 6
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      setColor(colorScheme.primary)
      doc.text(title.toUpperCase(), margin, yPosition)
      yPosition += 2
      drawLine(yPosition, colorScheme.primary)
      yPosition += 6
    }

    // Helper to add wrapped text
    const addWrappedText = (text, x, fontSize = 10, fontStyle = 'normal', color = colorScheme.text) => {
      doc.setFont('helvetica', fontStyle)
      doc.setFontSize(fontSize)
      setColor(color)
      const lines = doc.splitTextToSize(text, contentWidth - (x - margin))
      lines.forEach((line) => {
        checkPageBreak(6)
        doc.text(line, x, yPosition)
        yPosition += 5
      })
    }

    // ==================== PROFILE SECTION ====================
    const profile = resumeData.profile || {}

    if (profile.fullName) {
      // Name
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(atsMode ? 18 : 24)
      setColor(colorScheme.text)
      doc.text(profile.fullName, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += atsMode ? 8 : 10
    }

    if (profile.title) {
      // Title
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(atsMode ? 11 : 12)
      setColor(colorScheme.secondary)
      doc.text(profile.title, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 6
    }

    // Contact info line
    const contactParts = []
    if (profile.email) contactParts.push(profile.email)
    if (profile.phone) contactParts.push(profile.phone)
    if (profile.location) contactParts.push(profile.location)

    if (contactParts.length > 0) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      setColor(colorScheme.light)
      doc.text(contactParts.join('  |  '), pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 5
    }

    // Links line
    const linkParts = []
    if (profile.linkedin) linkParts.push(`LinkedIn: ${profile.linkedin}`)
    if (profile.github) linkParts.push(`GitHub: ${profile.github}`)
    if (profile.portfolio) linkParts.push(`Portfolio: ${profile.portfolio}`)

    if (linkParts.length > 0) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      setColor(atsMode ? colorScheme.text : colorScheme.accent)
      const linkText = linkParts.join('  |  ')
      const linkLines = doc.splitTextToSize(linkText, contentWidth)
      linkLines.forEach((line) => {
        doc.text(line, pageWidth / 2, yPosition, { align: 'center' })
        yPosition += 4
      })
    }

    yPosition += 4

    // Summary
    if (profile.summary) {
      addSectionHeading('Professional Summary')
      addWrappedText(profile.summary, margin, 10, 'normal', colorScheme.text)
    }

    // ==================== EDUCATION SECTION ====================
    const education = resumeData.education || []
    if (education.length > 0) {
      addSectionHeading('Education')

      education.forEach((edu) => {
        checkPageBreak(20)

        // Degree
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        setColor(colorScheme.text)
        doc.text(edu.degree || 'Degree', margin, yPosition)

        // Date on right
        const dateRange = formatDateRange(edu.startDate, edu.endDate, edu.current)
        if (dateRange) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          setColor(colorScheme.light)
          doc.text(dateRange, pageWidth - margin, yPosition, { align: 'right' })
        }
        yPosition += 5

        // Institution
        if (edu.institution) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          setColor(colorScheme.secondary)
          doc.text(edu.institution, margin, yPosition)
          yPosition += 5
        }

        // GPA and Location
        const details = []
        if (edu.gpa) details.push(`GPA: ${edu.gpa}`)
        if (edu.location) details.push(edu.location)
        if (details.length > 0) {
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(9)
          setColor(colorScheme.light)
          doc.text(details.join('  |  '), margin, yPosition)
          yPosition += 5
        }

        // Coursework
        if (edu.coursework) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          setColor(colorScheme.text)
          addWrappedText(`Relevant Coursework: ${edu.coursework}`, margin, 9)
        }

        yPosition += 3
      })
    }

    // ==================== EXPERIENCE SECTION ====================
    const experience = resumeData.experience || []
    if (experience.length > 0) {
      addSectionHeading('Professional Experience')

      experience.forEach((exp) => {
        checkPageBreak(25)

        // Job Title
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        setColor(colorScheme.text)
        doc.text(exp.jobTitle || 'Position', margin, yPosition)

        // Date on right
        const dateRange = formatDateRange(exp.startDate, exp.endDate, exp.current)
        if (dateRange) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          setColor(colorScheme.light)
          doc.text(dateRange, pageWidth - margin, yPosition, { align: 'right' })
        }
        yPosition += 5

        // Company and Location
        const companyLine = [exp.company, exp.location, exp.type].filter(Boolean).join('  |  ')
        if (companyLine) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          setColor(colorScheme.secondary)
          doc.text(companyLine, margin, yPosition)
          yPosition += 6
        }

        // Description bullets
        if (exp.description) {
          const bullets = exp.description
            .split('\n')
            .map((line) => line.replace(/^[-•]\s*/, '').trim())
            .filter((line) => line.length > 0)

          bullets.forEach((bullet) => {
            checkPageBreak(8)
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(9)
            setColor(colorScheme.text)
            doc.text('•', margin + 2, yPosition)
            const bulletLines = doc.splitTextToSize(bullet, contentWidth - 8)
            bulletLines.forEach((line, idx) => {
              doc.text(line, margin + 6, yPosition)
              yPosition += 4
            })
          })
        }

        // Technologies
        if (exp.technologies) {
          checkPageBreak(8)
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(8)
          setColor(colorScheme.light)
          addWrappedText(`Technologies: ${exp.technologies}`, margin, 8, 'italic', colorScheme.light)
        }

        yPosition += 4
      })
    }

    // ==================== PROJECTS SECTION ====================
    const projects = resumeData.projects || []
    if (projects.length > 0) {
      addSectionHeading('Projects')

      projects.forEach((project) => {
        checkPageBreak(20)

        // Project Name
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        setColor(colorScheme.text)
        doc.text(project.name || 'Project', margin, yPosition)
        yPosition += 5

        // Links
        const links = []
        if (project.liveUrl) links.push(`Live: ${project.liveUrl}`)
        if (project.githubUrl) links.push(`GitHub: ${project.githubUrl}`)
        if (links.length > 0) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(8)
          setColor(atsMode ? colorScheme.text : colorScheme.accent)
          doc.text(links.join('  |  '), margin, yPosition)
          yPosition += 5
        }

        // Description
        if (project.description) {
          const bullets = project.description
            .split('\n')
            .map((line) => line.replace(/^[-•]\s*/, '').trim())
            .filter((line) => line.length > 0)

          bullets.forEach((bullet) => {
            checkPageBreak(8)
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(9)
            setColor(colorScheme.text)
            doc.text('•', margin + 2, yPosition)
            const bulletLines = doc.splitTextToSize(bullet, contentWidth - 8)
            bulletLines.forEach((line) => {
              doc.text(line, margin + 6, yPosition)
              yPosition += 4
            })
          })
        }

        // Technologies
        if (project.technologies) {
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(8)
          setColor(colorScheme.light)
          addWrappedText(`Technologies: ${project.technologies}`, margin, 8, 'italic', colorScheme.light)
        }

        yPosition += 4
      })
    }

    // ==================== SKILLS SECTION ====================
    const skills = resumeData.skills || []
    if (skills.length > 0) {
      addSectionHeading('Skills')

      skills.forEach((skillGroup) => {
        if (skillGroup.category && skillGroup.skills) {
          checkPageBreak(8)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(10)
          setColor(colorScheme.text)
          doc.text(`${skillGroup.category}: `, margin, yPosition)

          const categoryWidth = doc.getTextWidth(`${skillGroup.category}: `)
          doc.setFont('helvetica', 'normal')
          setColor(colorScheme.secondary)
          
          const skillLines = doc.splitTextToSize(skillGroup.skills, contentWidth - categoryWidth)
          doc.text(skillLines[0], margin + categoryWidth, yPosition)
          yPosition += 5

          if (skillLines.length > 1) {
            skillLines.slice(1).forEach((line) => {
              doc.text(line, margin, yPosition)
              yPosition += 5
            })
          }
        }
      })
      yPosition += 2
    }

    // ==================== CERTIFICATIONS SECTION ====================
    const certifications = resumeData.certifications || []
    if (certifications.length > 0) {
      addSectionHeading('Certifications')

      certifications.forEach((cert) => {
        checkPageBreak(10)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        setColor(colorScheme.text)

        const certLine = [cert.name, cert.issuer, cert.date].filter(Boolean).join(' — ')
        doc.text('•', margin + 2, yPosition)
        const certLines = doc.splitTextToSize(certLine, contentWidth - 8)
        certLines.forEach((line) => {
          doc.text(line, margin + 6, yPosition)
          yPosition += 5
        })

        if (cert.credentialId) {
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(8)
          setColor(colorScheme.light)
          doc.text(`Credential ID: ${cert.credentialId}`, margin + 6, yPosition)
          yPosition += 4
        }
      })
      yPosition += 2
    }

    // ==================== ACHIEVEMENTS SECTION ====================
    const achievements = resumeData.achievements || []
    if (achievements.length > 0) {
      addSectionHeading('Achievements')

      achievements.forEach((achievement) => {
        checkPageBreak(10)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        setColor(colorScheme.text)

        const achieveLine = [achievement.title, achievement.issuer, achievement.date].filter(Boolean).join(' — ')
        doc.text('•', margin + 2, yPosition)
        const achieveLines = doc.splitTextToSize(achieveLine, contentWidth - 8)
        achieveLines.forEach((line) => {
          doc.text(line, margin + 6, yPosition)
          yPosition += 5
        })

        if (achievement.description) {
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(9)
          setColor(colorScheme.secondary)
          addWrappedText(achievement.description, margin + 6, 9, 'italic', colorScheme.secondary)
        }
      })
      yPosition += 2
    }

    // ==================== POR SECTION ====================
    const por = resumeData.por || []
    if (por.length > 0) {
      addSectionHeading('Positions of Responsibility')

      por.forEach((position) => {
        checkPageBreak(15)

        // Title
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        setColor(colorScheme.text)
        doc.text(position.title || 'Position', margin, yPosition)

        // Date on right
        const dateRange = formatDateRange(position.startDate, position.endDate, position.current)
        if (dateRange) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          setColor(colorScheme.light)
          doc.text(dateRange, pageWidth - margin, yPosition, { align: 'right' })
        }
        yPosition += 5

        // Organization
        if (position.organization) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          setColor(colorScheme.secondary)
          doc.text(position.organization, margin, yPosition)
          yPosition += 5
        }

        // Description
        if (position.description) {
          const bullets = position.description
            .split('\n')
            .map((line) => line.replace(/^[-•]\s*/, '').trim())
            .filter((line) => line.length > 0)

          bullets.forEach((bullet) => {
            checkPageBreak(8)
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(9)
            setColor(colorScheme.text)
            doc.text('•', margin + 2, yPosition)
            const bulletLines = doc.splitTextToSize(bullet, contentWidth - 8)
            bulletLines.forEach((line) => {
              doc.text(line, margin + 6, yPosition)
              yPosition += 4
            })
          })
        }

        yPosition += 4
      })
    }

    // ==================== PUBLICATIONS SECTION ====================
    const publications = resumeData.publications || []
    if (publications.length > 0) {
      addSectionHeading('Publications')

      publications.forEach((pub) => {
        checkPageBreak(12)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        setColor(colorScheme.text)
        const titleLines = doc.splitTextToSize(pub.title || 'Publication', contentWidth)
        titleLines.forEach((line) => {
          doc.text(line, margin, yPosition)
          yPosition += 5
        })

        const meta = [pub.authors, pub.venue, pub.date].filter(Boolean).join(' | ')
        if (meta) {
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(9)
          setColor(colorScheme.light)
          const metaLines = doc.splitTextToSize(meta, contentWidth)
          metaLines.forEach((line) => {
            doc.text(line, margin, yPosition)
            yPosition += 4
          })
        }

        if (pub.url) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(8)
          setColor(atsMode ? colorScheme.text : colorScheme.accent)
          doc.text(pub.url, margin, yPosition)
          yPosition += 5
        }

        yPosition += 3
      })
    }

    // ==================== EXTRACURRICULAR SECTION ====================
    const extracurricular = resumeData.extracurricular || []
    if (extracurricular.length > 0) {
      addSectionHeading('Extracurricular Activities')

      extracurricular.forEach((activity) => {
        checkPageBreak(10)

        const activityLine = [activity.activity, activity.organization, activity.duration].filter(Boolean).join(' — ')
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        setColor(colorScheme.text)
        doc.text('•', margin + 2, yPosition)
        const activityLines = doc.splitTextToSize(activityLine, contentWidth - 8)
        activityLines.forEach((line) => {
          doc.text(line, margin + 6, yPosition)
          yPosition += 5
        })

        if (activity.description) {
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(9)
          setColor(colorScheme.secondary)
          addWrappedText(activity.description, margin + 6, 9, 'italic', colorScheme.secondary)
        }
      })
      yPosition += 2
    }

    // ==================== LANGUAGES SECTION ====================
    const languages = resumeData.languages || []
    if (languages.length > 0) {
      addSectionHeading('Languages')

      const languageStrings = languages
        .map((lang) => {
          if (lang.language && lang.proficiency) {
            return `${lang.language} (${lang.proficiency})`
          }
          return lang.language || ''
        })
        .filter((l) => l)

      if (languageStrings.length > 0) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        setColor(colorScheme.text)
        doc.text(languageStrings.join('  •  '), margin, yPosition)
        yPosition += 6
      }
    }

    // ==================== SAVE PDF ====================
    const fileName = `${resumeData.profile?.fullName?.replace(/\s+/g, '_') || 'Resume'}_Resume${atsMode ? '_ATS' : ''}.pdf`
    doc.save(fileName)

    return { success: true, fileName }
  } catch (error) {
    console.error('PDF export error:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}

export default exportToPdf