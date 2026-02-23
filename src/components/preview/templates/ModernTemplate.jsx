const ModernTemplate = ({ data }) => {
  const {
    profile = {},
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
    achievements = [],
    por = [],
    publications = [],
    extracurricular = [],
    languages = [],
  } = data

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return ''
    // Check if it's already a formatted string like "July 2020"
    if (typeof dateString === 'string' && dateString.match(/^[A-Za-z]+ \d{4}$/)) {
      return dateString
    }
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString // Return as-is if invalid
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    } catch {
      return dateString
    }
  }

  // Helper function to convert array or string to displayable string
  const toDisplayString = (value, separator = ', ') => {
    if (!value) return ''
    if (Array.isArray(value)) return value.join(separator)
    return String(value)
  }

  // Helper function to convert to array for bullet rendering
  const toArray = (value) => {
    if (!value) return []
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
      // Split by newlines or bullet points
      return value.split(/[\n\r]+/).map(item => item.replace(/^[-•]\s*/, '').trim()).filter(Boolean)
    }
    return []
  }

  // Helper function to check if value has content
  const hasContent = (value) => {
    if (!value) return false
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'string') return value.trim().length > 0
    if (typeof value === 'object') return Object.values(value).some(v => hasContent(v))
    return Boolean(value)
  }

  const SectionTitle = ({ children }) => (
    <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b-2 border-blue-600 pb-1 mb-2 mt-4">
      {children}
    </h2>
  )

  return (
    <div className="w-full bg-white text-gray-900 p-8" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600">
          {profile.email && <span className="flex items-center gap-1">✉ {profile.email}</span>}
          {profile.phone && <span className="flex items-center gap-1">📱 {profile.phone}</span>}
          {profile.location && <span className="flex items-center gap-1">📍 {profile.location}</span>}
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-blue-600 mt-1">
          {profile.linkedin && <a href={profile.linkedin} className="hover:underline">LinkedIn</a>}
          {profile.github && <a href={profile.github} className="hover:underline">GitHub</a>}
          {profile.portfolio && <a href={profile.portfolio} className="hover:underline">Portfolio</a>}
        </div>
        {(profile.objective || profile.summary) && (
          <p className="mt-2 text-sm text-gray-700 text-justify">{profile.objective || profile.summary}</p>
        )}
      </header>

      {/* Education */}
      {education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {edu.institution}{edu.location && `, ${edu.location}`}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </p>
                  {(edu.cgpa || edu.gpa) && (
                    <p>
                      {edu.cgpa ? `CGPA: ${edu.cgpa}/${edu.maxCgpa || '10'}` : `GPA: ${edu.gpa}`}
                    </p>
                  )}
                </div>
              </div>
              {hasContent(edu.coursework) && (
                <p className="text-sm text-gray-600 mt-1">
                  Coursework: {toDisplayString(edu.coursework)}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, i) => {
            const bullets = toArray(exp.bullets || exp.description)
            const techStack = toDisplayString(exp.techStack || exp.technologies)
            
            return (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{exp.role || exp.jobTitle}</p>
                    <p className="text-sm text-gray-600">
                      {exp.company}{exp.location && `, ${exp.location}`}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                {bullets.length > 0 && (
                  <ul className="list-disc ml-4 text-sm text-gray-700 mt-1 space-y-0.5">
                    {bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
                {techStack && (
                  <p className="text-sm text-gray-600 mt-1">Tech: {techStack}</p>
                )}
              </div>
            )
          })}
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj, i) => {
            const highlights = toArray(proj.highlights || proj.description)
            const techStack = toDisplayString(proj.techStack || proj.technologies)
            
            return (
              <div key={i} className="mb-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{proj.name}</p>
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} className="text-blue-600 text-xs hover:underline">[GitHub]</a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} className="text-blue-600 text-xs hover:underline">[Live]</a>
                  )}
                </div>
                {highlights.length > 0 && (
                  <ul className="list-disc ml-4 text-sm text-gray-700 mt-1">
                    {highlights.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
                {techStack && (
                  <p className="text-sm text-gray-600 mt-1">Tech: {techStack}</p>
                )}
              </div>
            )
          })}
        </>
      )}

      {/* Skills */}
      {hasContent(skills) && (
        <>
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="text-sm space-y-1">
            {/* Handle both object format {languages: [], frameworks: []} and array format [{category, skills}] */}
            {Array.isArray(skills) ? (
              skills.map((skill, i) => (
                <p key={i}>
                  <span className="font-semibold text-gray-900">{skill.category}:</span>{' '}
                  {toDisplayString(skill.skills)}
                </p>
              ))
            ) : (
              <>
                {hasContent(skills.languages) && (
                  <p><span className="font-semibold text-gray-900">Languages:</span> {toDisplayString(skills.languages)}</p>
                )}
                {hasContent(skills.frameworks) && (
                  <p><span className="font-semibold text-gray-900">Frameworks:</span> {toDisplayString(skills.frameworks)}</p>
                )}
                {hasContent(skills.tools) && (
                  <p><span className="font-semibold text-gray-900">Tools:</span> {toDisplayString(skills.tools)}</p>
                )}
                {hasContent(skills.databases) && (
                  <p><span className="font-semibold text-gray-900">Databases:</span> {toDisplayString(skills.databases)}</p>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <div key={i} className="mb-1 text-sm">
              <span className="font-medium text-gray-900">{cert.name}</span>
              {cert.issuer && <span> - {cert.issuer}</span>}
              {(cert.issueDate || cert.date) && (
                <span className="text-gray-600"> ({formatDate(cert.issueDate || cert.date)})</span>
              )}
            </div>
          ))}
        </>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <SectionTitle>Achievements</SectionTitle>
          {achievements.map((ach, i) => (
            <div key={i} className="mb-1 text-sm">
              <span className="font-medium text-gray-900">{ach.title}</span>
              {(ach.organization || ach.issuer) && <span> - {ach.organization || ach.issuer}</span>}
              {ach.scale && <span className="text-gray-600"> ({ach.scale})</span>}
              {ach.date && <span className="text-gray-600"> ({formatDate(ach.date)})</span>}
            </div>
          ))}
        </>
      )}

      {/* Leadership / POR */}
      {por.length > 0 && (
        <>
          <SectionTitle>Leadership</SectionTitle>
          {por.map((p, i) => {
            const bullets = toArray(p.bullets || p.description)
            
            return (
              <div key={i} className="mb-2">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-900">
                    {p.role || p.title} - {p.organization}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(p.startDate)} - {p.current ? 'Present' : formatDate(p.endDate)}
                  </p>
                </div>
                {bullets.length > 0 && (
                  <ul className="list-disc ml-4 text-sm text-gray-700 mt-1">
                    {bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </div>
            )
          })}
        </>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <>
          <SectionTitle>Publications</SectionTitle>
          {publications.map((pub, i) => (
            <div key={i} className="mb-2 text-sm">
              <p className="font-medium text-gray-900">{pub.title}</p>
              {pub.authors && <p className="text-gray-600">{pub.authors}</p>}
              {pub.venue && <p className="text-gray-600 italic">{pub.venue}</p>}
              {pub.date && <p className="text-gray-600">{formatDate(pub.date)}</p>}
              {pub.url && (
                <a href={pub.url} className="text-blue-600 hover:underline text-xs">{pub.url}</a>
              )}
            </div>
          ))}
        </>
      )}

      {/* Extracurricular */}
      {extracurricular.length > 0 && (
        <>
          <SectionTitle>Extracurricular Activities</SectionTitle>
          {extracurricular.map((activity, i) => (
            <div key={i} className="mb-1 text-sm">
              <span className="font-medium text-gray-900">{activity.activity}</span>
              {activity.organization && <span> - {activity.organization}</span>}
              {activity.duration && <span className="text-gray-600"> ({activity.duration})</span>}
              {activity.description && (
                <p className="text-gray-600 ml-2">{activity.description}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p className="text-sm">
            {languages.map((l, i) => (
              <span key={i}>
                {l.language} ({l.proficiency})
                {i < languages.length - 1 && ' • '}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  )
}

export default ModernTemplate