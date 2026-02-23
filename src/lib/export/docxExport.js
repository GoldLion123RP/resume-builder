import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ExternalHyperlink,
} from 'docx'
import { saveAs } from 'file-saver'

// Helper to create a section heading
const createHeading = (text) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 24, // 12pt
        color: '2563EB', // Blue color
      }),
    ],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
    border: {
      bottom: {
        color: '2563EB',
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  })
}

// Helper to create bullet point
const createBullet = (text) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        size: 22, // 11pt
      }),
    ],
    bullet: { level: 0 },
    spacing: { after: 60 },
  })
}

// Helper to create normal paragraph
const createParagraph = (text, options = {}) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        size: options.size || 22,
        bold: options.bold || false,
        italics: options.italics || false,
        color: options.color || '000000',
      }),
    ],
    spacing: { after: options.spacing || 80 },
    alignment: options.alignment || AlignmentType.LEFT,
  })
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

// Generate Profile Section
const generateProfileSection = (profile) => {
  if (!profile) return []

  const elements = []

  // Name - Large and centered
  if (profile.fullName) {
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: profile.fullName,
            bold: true,
            size: 36, // 18pt
            color: '1F2937',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
      })
    )
  }

  // Title
  if (profile.title) {
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: profile.title,
            size: 24,
            color: '4B5563',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      })
    )
  }

  // Contact info line
  const contactParts = []
  if (profile.email) contactParts.push(profile.email)
  if (profile.phone) contactParts.push(profile.phone)
  if (profile.location) contactParts.push(profile.location)

  if (contactParts.length > 0) {
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join(' | '),
            size: 20,
            color: '6B7280',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
      })
    )
  }

  // Links line
  const linkParts = []
  if (profile.linkedin) linkParts.push(`LinkedIn: ${profile.linkedin}`)
  if (profile.github) linkParts.push(`GitHub: ${profile.github}`)
  if (profile.portfolio) linkParts.push(`Portfolio: ${profile.portfolio}`)

  if (linkParts.length > 0) {
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: linkParts.join(' | '),
            size: 20,
            color: '2563EB',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    )
  }

  // Summary
  if (profile.summary) {
    elements.push(createHeading('Professional Summary'))
    elements.push(createParagraph(profile.summary))
  }

  return elements
}

// Generate Education Section
const generateEducationSection = (education) => {
  if (!education || education.length === 0) return []

  const elements = [createHeading('Education')]

  education.forEach((edu, index) => {
    // Degree and Institution
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: edu.degree || 'Degree',
            bold: true,
            size: 24,
          }),
          new TextRun({
            text: edu.institution ? ` — ${edu.institution}` : '',
            size: 24,
          }),
        ],
        spacing: { after: 40 },
      })
    )

    // Date and Location
    const meta = []
    const dateRange = formatDateRange(edu.startDate, edu.endDate, edu.current)
    if (dateRange) meta.push(dateRange)
    if (edu.location) meta.push(edu.location)
    if (edu.gpa) meta.push(`GPA: ${edu.gpa}`)

    if (meta.length > 0) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: meta.join(' | '),
              size: 20,
              italics: true,
              color: '6B7280',
            }),
          ],
          spacing: { after: 60 },
        })
      )
    }

    // Relevant Coursework
    if (edu.coursework) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Coursework: ',
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: edu.coursework,
              size: 20,
            }),
          ],
          spacing: { after: 120 },
        })
      )
    }
  })

  return elements
}

// Generate Experience Section
const generateExperienceSection = (experience) => {
  if (!experience || experience.length === 0) return []

  const elements = [createHeading('Professional Experience')]

  experience.forEach((exp) => {
    // Job Title and Company
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: exp.jobTitle || 'Position',
            bold: true,
            size: 24,
          }),
          new TextRun({
            text: exp.company ? ` — ${exp.company}` : '',
            size: 24,
          }),
        ],
        spacing: { after: 40 },
      })
    )

    // Date and Location
    const meta = []
    const dateRange = formatDateRange(exp.startDate, exp.endDate, exp.current)
    if (dateRange) meta.push(dateRange)
    if (exp.location) meta.push(exp.location)
    if (exp.type) meta.push(exp.type)

    if (meta.length > 0) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: meta.join(' | '),
              size: 20,
              italics: true,
              color: '6B7280',
            }),
          ],
          spacing: { after: 80 },
        })
      )
    }

    // Description bullets
    if (exp.description) {
      const bullets = exp.description
        .split('\n')
        .map((line) => line.replace(/^[-•]\s*/, '').trim())
        .filter((line) => line.length > 0)

      bullets.forEach((bullet) => {
        elements.push(createBullet(bullet))
      })
    }

    // Technologies
    if (exp.technologies) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Technologies: ',
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: exp.technologies,
              size: 20,
              italics: true,
            }),
          ],
          spacing: { after: 160 },
        })
      )
    }
  })

  return elements
}

// Generate Projects Section
const generateProjectsSection = (projects) => {
  if (!projects || projects.length === 0) return []

  const elements = [createHeading('Projects')]

  projects.forEach((project) => {
    // Project Name
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: project.name || 'Project',
            bold: true,
            size: 24,
          }),
        ],
        spacing: { after: 40 },
      })
    )

    // Links
    const links = []
    if (project.liveUrl) links.push(`Live: ${project.liveUrl}`)
    if (project.githubUrl) links.push(`GitHub: ${project.githubUrl}`)

    if (links.length > 0) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: links.join(' | '),
              size: 20,
              color: '2563EB',
            }),
          ],
          spacing: { after: 60 },
        })
      )
    }

    // Description
    if (project.description) {
      const bullets = project.description
        .split('\n')
        .map((line) => line.replace(/^[-•]\s*/, '').trim())
        .filter((line) => line.length > 0)

      bullets.forEach((bullet) => {
        elements.push(createBullet(bullet))
      })
    }

    // Technologies
    if (project.technologies) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Technologies: ',
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: project.technologies,
              size: 20,
              italics: true,
            }),
          ],
          spacing: { after: 160 },
        })
      )
    }
  })

  return elements
}

// Generate Skills Section
const generateSkillsSection = (skills) => {
  if (!skills || skills.length === 0) return []

  const elements = [createHeading('Skills')]

  skills.forEach((skillGroup) => {
    if (skillGroup.category && skillGroup.skills) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${skillGroup.category}: `,
              bold: true,
              size: 22,
            }),
            new TextRun({
              text: skillGroup.skills,
              size: 22,
            }),
          ],
          spacing: { after: 80 },
        })
      )
    }
  })

  return elements
}

// Generate Certifications Section
const generateCertificationsSection = (certifications) => {
  if (!certifications || certifications.length === 0) return []

  const elements = [createHeading('Certifications')]

  certifications.forEach((cert) => {
    const parts = []
    if (cert.name) parts.push(cert.name)
    if (cert.issuer) parts.push(cert.issuer)
    if (cert.date) parts.push(cert.date)

    elements.push(createBullet(parts.join(' — ')))

    if (cert.credentialId) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `  Credential ID: ${cert.credentialId}`,
              size: 18,
              color: '6B7280',
            }),
          ],
          spacing: { after: 60 },
        })
      )
    }
  })

  return elements
}

// Generate Achievements Section
const generateAchievementsSection = (achievements) => {
  if (!achievements || achievements.length === 0) return []

  const elements = [createHeading('Achievements')]

  achievements.forEach((achievement) => {
    const parts = []
    if (achievement.title) parts.push(achievement.title)
    if (achievement.issuer) parts.push(achievement.issuer)
    if (achievement.date) parts.push(achievement.date)

    elements.push(createBullet(parts.join(' — ')))

    if (achievement.description) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `  ${achievement.description}`,
              size: 20,
              color: '4B5563',
            }),
          ],
          spacing: { after: 80 },
        })
      )
    }
  })

  return elements
}

// Generate POR Section
const generatePORSection = (por) => {
  if (!por || por.length === 0) return []

  const elements = [createHeading('Positions of Responsibility')]

  por.forEach((position) => {
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: position.title || 'Position',
            bold: true,
            size: 24,
          }),
          new TextRun({
            text: position.organization ? ` — ${position.organization}` : '',
            size: 24,
          }),
        ],
        spacing: { after: 40 },
      })
    )

    const dateRange = formatDateRange(position.startDate, position.endDate, position.current)
    if (dateRange) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: dateRange,
              size: 20,
              italics: true,
              color: '6B7280',
            }),
          ],
          spacing: { after: 60 },
        })
      )
    }

    if (position.description) {
      const bullets = position.description
        .split('\n')
        .map((line) => line.replace(/^[-•]\s*/, '').trim())
        .filter((line) => line.length > 0)

      bullets.forEach((bullet) => {
        elements.push(createBullet(bullet))
      })
    }
  })

  return elements
}

// Generate Publications Section
const generatePublicationsSection = (publications) => {
  if (!publications || publications.length === 0) return []

  const elements = [createHeading('Publications')]

  publications.forEach((pub) => {
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: pub.title || 'Publication',
            bold: true,
            size: 22,
          }),
        ],
        spacing: { after: 40 },
      })
    )

    const meta = []
    if (pub.authors) meta.push(pub.authors)
    if (pub.venue) meta.push(pub.venue)
    if (pub.date) meta.push(pub.date)

    if (meta.length > 0) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: meta.join(' | '),
              size: 20,
              italics: true,
              color: '6B7280',
            }),
          ],
          spacing: { after: 80 },
        })
      )
    }

    if (pub.url) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: pub.url,
              size: 18,
              color: '2563EB',
            }),
          ],
          spacing: { after: 120 },
        })
      )
    }
  })

  return elements
}

// Generate Extracurricular Section
const generateExtracurricularSection = (extracurricular) => {
  if (!extracurricular || extracurricular.length === 0) return []

  const elements = [createHeading('Extracurricular Activities')]

  extracurricular.forEach((activity) => {
    const parts = []
    if (activity.activity) parts.push(activity.activity)
    if (activity.organization) parts.push(activity.organization)
    if (activity.duration) parts.push(activity.duration)

    elements.push(createBullet(parts.join(' — ')))

    if (activity.description) {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `  ${activity.description}`,
              size: 20,
              color: '4B5563',
            }),
          ],
          spacing: { after: 80 },
        })
      )
    }
  })

  return elements
}

// Generate Languages Section
const generateLanguagesSection = (languages) => {
  if (!languages || languages.length === 0) return []

  const elements = [createHeading('Languages')]

  const languageStrings = languages
    .map((lang) => {
      if (lang.language && lang.proficiency) {
        return `${lang.language} (${lang.proficiency})`
      }
      return lang.language || ''
    })
    .filter((l) => l)

  if (languageStrings.length > 0) {
    elements.push(createParagraph(languageStrings.join(' • ')))
  }

  return elements
}

// Main export function
export const exportToDocx = async (resumeData) => {
  try {
    const sections = []

    // Generate all sections
    sections.push(...generateProfileSection(resumeData.profile))
    sections.push(...generateEducationSection(resumeData.education))
    sections.push(...generateExperienceSection(resumeData.experience))
    sections.push(...generateProjectsSection(resumeData.projects))
    sections.push(...generateSkillsSection(resumeData.skills))
    sections.push(...generateCertificationsSection(resumeData.certifications))
    sections.push(...generateAchievementsSection(resumeData.achievements))
    sections.push(...generatePORSection(resumeData.por))
    sections.push(...generatePublicationsSection(resumeData.publications))
    sections.push(...generateExtracurricularSection(resumeData.extracurricular))
    sections.push(...generateLanguagesSection(resumeData.languages))

    // Create document
    const doc = new Document({
      creator: 'Resume Builder',
      title: `${resumeData.profile?.fullName || 'Resume'} - Resume`,
      description: 'Resume generated by Resume Builder',
      styles: {
        default: {
          document: {
            run: {
              font: 'Calibri',
              size: 22,
            },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720, // 0.5 inch
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
          children: sections,
        },
      ],
    })

    // Generate and save
    const blob = await Packer.toBlob(doc)
    const fileName = `${resumeData.profile?.fullName?.replace(/\s+/g, '_') || 'Resume'}_Resume.docx`
    saveAs(blob, fileName)

    return { success: true, fileName }
  } catch (error) {
    console.error('DOCX export error:', error)
    throw new Error('Failed to generate DOCX. Please try again.')
  }
}

export default exportToDocx