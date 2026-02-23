const MinimalTemplate = ({ data }) => {
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
    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 mt-6">
      {children}
    </h2>
  )

  return (
    <div className="w-full bg-white text-gray-900 p-12" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-3">
          {profile.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-light">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>{profile.phone}</span>}
          {profile.location && <span>{profile.location}</span>}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-light mt-1">
          {profile.linkedin && <a href={profile.linkedin} className="hover:text-gray-900">{profile.linkedin.replace('https://', '')}</a>}
          {profile.github && <a href={profile.github} className="hover:text-gray-900">{profile.github.replace('https://', '')}</a>}
        </div>
        {profile.objective && (
          <p className="mt-4 text-sm text-gray-700 leading-relaxed max-w-3xl">
            {profile.objective}
          </p>
        )}
      </header>

      {/* Education */}
      {education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-gray-900">{edu.degree}{edu.field && ` · ${edu.field}`}</p>
                <p className="text-xs text-gray-500">{formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{edu.institution}</p>
              {edu.cgpa && <p className="text-sm text-gray-500 mt-0.5">CGPA {edu.cgpa}</p>}
            </div>
          ))}
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-gray-900">{exp.role}</p>
                <p className="text-xs text-gray-500">{formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{exp.company}</p>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
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
            <div key={i} className="mb-4">
              <p className="font-medium text-gray-900">{proj.name}</p>
              {proj.description && <p className="text-sm text-gray-700 mt-1">{proj.description}</p>}
              {proj.techStack && proj.techStack.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">{proj.techStack.join(' · ')}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {Object.values(skills).some(arr => arr?.length > 0) && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <div className="space-y-1 text-sm">
            {skills.languages?.length > 0 && (
              <p className="text-gray-700">
                <span className="text-gray-500 w-24 inline-block">Languages</span>
                {skills.languages.join(' · ')}
              </p>
            )}
            {skills.frameworks?.length > 0 && (
              <p className="text-gray-700">
                <span className="text-gray-500 w-24 inline-block">Frameworks</span>
                {skills.frameworks.join(' · ')}
              </p>
            )}
            {skills.tools?.length > 0 && (
              <p className="text-gray-700">
                <span className="text-gray-500 w-24 inline-block">Tools</span>
                {skills.tools.join(' · ')}
              </p>
            )}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <p key={i} className="text-sm text-gray-700 mb-1">
              {cert.name} · <span className="text-gray-500">{cert.issuer}</span>
            </p>
          ))}
        </>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <SectionTitle>Achievements</SectionTitle>
          {achievements.map((ach, i) => (
            <p key={i} className="text-sm text-gray-700 mb-1">
              {ach.title} · <span className="text-gray-500">{ach.organization}</span>
            </p>
          ))}
        </>
      )}

      {/* Leadership */}
      {por.length > 0 && (
        <>
          <SectionTitle>Leadership</SectionTitle>
          {por.map((p, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-gray-900">{p.role}</p>
                <p className="text-xs text-gray-500">{formatDate(p.startDate)} — {p.current ? 'Present' : formatDate(p.endDate)}</p>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{p.organization}</p>
            </div>
          ))}
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p className="text-sm text-gray-700">
            {languages.map((l, i) => (
              <span key={i}>
                {l.language} ({l.proficiency})
                {i < languages.length - 1 && ' · '}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  )
}

export default MinimalTemplate