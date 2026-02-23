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

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
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
        {profile.objective && (
          <p className="mt-2 text-sm text-gray-700 text-justify">{profile.objective}</p>
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
                  <p className="font-semibold text-gray-900">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                  <p className="text-sm text-gray-600">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
                  {edu.cgpa && <p>CGPA: {edu.cgpa}/{edu.maxCgpa || '10'}</p>}
                </div>
              </div>
              {edu.coursework && edu.coursework.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">Coursework: {edu.coursework.join(', ')}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{exp.role}</p>
                  <p className="text-sm text-gray-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                </div>
                <p className="text-sm text-gray-600">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="list-disc ml-4 text-sm text-gray-700 mt-1 space-y-0.5">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
              {exp.techStack && exp.techStack.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">Tech: {exp.techStack.join(', ')}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{proj.name}</p>
                {proj.githubUrl && <a href={proj.githubUrl} className="text-blue-600 text-xs hover:underline">[GitHub]</a>}
                {proj.liveUrl && <a href={proj.liveUrl} className="text-blue-600 text-xs hover:underline">[Live]</a>}
              </div>
              {proj.description && <p className="text-sm text-gray-600">{proj.description}</p>}
              {proj.highlights && proj.highlights.length > 0 && (
                <ul className="list-disc ml-4 text-sm text-gray-700 mt-1">
                  {proj.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
              {proj.techStack && proj.techStack.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">Tech: {proj.techStack.join(', ')}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {Object.values(skills).some(arr => arr?.length > 0) && (
        <>
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="text-sm space-y-1">
            {skills.languages?.length > 0 && <p><span className="font-semibold text-gray-900">Languages:</span> {skills.languages.join(', ')}</p>}
            {skills.frameworks?.length > 0 && <p><span className="font-semibold text-gray-900">Frameworks:</span> {skills.frameworks.join(', ')}</p>}
            {skills.tools?.length > 0 && <p><span className="font-semibold text-gray-900">Tools:</span> {skills.tools.join(', ')}</p>}
            {skills.databases?.length > 0 && <p><span className="font-semibold text-gray-900">Databases:</span> {skills.databases.join(', ')}</p>}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <div key={i} className="mb-1 text-sm">
              <span className="font-medium text-gray-900">{cert.name}</span> - {cert.issuer}
              {cert.issueDate && <span className="text-gray-600"> ({formatDate(cert.issueDate)})</span>}
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
              {ach.organization && <span> - {ach.organization}</span>}
              {ach.scale && <span className="text-gray-600"> ({ach.scale})</span>}
            </div>
          ))}
        </>
      )}

      {/* Leadership */}
      {por.length > 0 && (
        <>
          <SectionTitle>Leadership</SectionTitle>
          {por.map((p, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-900">{p.role} - {p.organization}</p>
                <p className="text-sm text-gray-600">{formatDate(p.startDate)} - {p.current ? 'Present' : formatDate(p.endDate)}</p>
              </div>
              {p.bullets && p.bullets.length > 0 && (
                <ul className="list-disc ml-4 text-sm text-gray-700 mt-1">
                  {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
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