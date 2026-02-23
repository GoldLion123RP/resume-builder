const CompactTemplate = ({ data }) => {
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
    <h2 className="text-xs font-bold uppercase text-gray-900 bg-gray-200 px-2 py-0.5 mb-1.5 mt-3 first:mt-0">
      {children}
    </h2>
  )

  return (
    <div className="w-full bg-white text-gray-900 p-6" style={{ fontFamily: 'Calibri, Arial, sans-serif', fontSize: '10pt' }}>
      {/* Header */}
      <header className="text-center mb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-0.5">{profile.fullName || 'Your Name'}</h1>
        <div className="text-xs text-gray-600 space-x-2">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>|</span>}
          {profile.phone && <span>{profile.phone}</span>}
          {profile.location && <span>|</span>}
          {profile.location && <span>{profile.location}</span>}
        </div>
        <div className="text-xs text-gray-600 space-x-2">
          {profile.linkedin && <a href={profile.linkedin} className="text-blue-600">LinkedIn</a>}
          {profile.github && <span>|</span>}
          {profile.github && <a href={profile.github} className="text-blue-600">GitHub</a>}
          {profile.portfolio && <span>|</span>}
          {profile.portfolio && <a href={profile.portfolio} className="text-blue-600">Portfolio</a>}
        </div>
      </header>

      {/* Objective */}
      {profile.objective && (
        <p className="text-xs text-gray-700 text-justify mb-2 leading-tight">{profile.objective}</p>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between text-xs">
                <p className="font-semibold">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                <p className="text-gray-600">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
              </div>
              <div className="flex justify-between text-xs">
                <p className="text-gray-600">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                {edu.cgpa && <p className="text-gray-600">CGPA: {edu.cgpa}/{edu.maxCgpa || '10'}</p>}
              </div>
              {edu.coursework && edu.coursework.length > 0 && (
                <p className="text-xs text-gray-600">Coursework: {edu.coursework.join(', ')}</p>
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
            <div key={i} className="mb-1.5">
              <div className="flex justify-between text-xs">
                <p className="font-semibold">{exp.role}</p>
                <p className="text-gray-600">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
              <p className="text-xs text-gray-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="list-disc ml-4 text-xs text-gray-700 mt-0.5 space-y-0">
                  {exp.bullets.map((b, j) => <li key={j} className="leading-tight">{b}</li>)}
                </ul>
              )}
              {exp.techStack && exp.techStack.length > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">Tech: {exp.techStack.join(', ')}</p>
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
            <div key={i} className="mb-1.5">
              <div className="flex justify-between text-xs">
                <p className="font-semibold">
                  {proj.name}
                  {proj.githubUrl && <a href={proj.githubUrl} className="text-blue-600 ml-1">[GitHub]</a>}
                  {proj.liveUrl && <a href={proj.liveUrl} className="text-blue-600 ml-1">[Live]</a>}
                </p>
                {(proj.startDate || proj.endDate) && (
                  <p className="text-gray-600">{formatDate(proj.startDate)} - {proj.current ? 'Present' : formatDate(proj.endDate)}</p>
                )}
              </div>
              {proj.description && <p className="text-xs text-gray-600 leading-tight">{proj.description}</p>}
              {proj.highlights && proj.highlights.length > 0 && (
                <ul className="list-disc ml-4 text-xs text-gray-700 mt-0.5">
                  {proj.highlights.map((h, j) => <li key={j} className="leading-tight">{h}</li>)}
                </ul>
              )}
              {proj.techStack && proj.techStack.length > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">Tech: {proj.techStack.join(', ')}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {Object.values(skills).some(arr => arr?.length > 0) && (
        <>
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="text-xs space-y-0">
            {skills.languages?.length > 0 && <p><span className="font-semibold">Languages:</span> {skills.languages.join(', ')}</p>}
            {skills.frameworks?.length > 0 && <p><span className="font-semibold">Frameworks:</span> {skills.frameworks.join(', ')}</p>}
            {skills.tools?.length > 0 && <p><span className="font-semibold">Tools:</span> {skills.tools.join(', ')}</p>}
            {skills.databases?.length > 0 && <p><span className="font-semibold">Databases:</span> {skills.databases.join(', ')}</p>}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <p key={i} className="text-xs mb-0.5">
              <span className="font-semibold">{cert.name}</span> - {cert.issuer}
              {cert.issueDate && <span className="text-gray-600"> ({formatDate(cert.issueDate)})</span>}
            </p>
          ))}
        </>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <SectionTitle>Achievements</SectionTitle>
          {achievements.map((ach, i) => (
            <p key={i} className="text-xs mb-0.5">
              <span className="font-semibold">{ach.title}</span>
              {ach.organization && <span> - {ach.organization}</span>}
              {ach.scale && <span className="text-gray-600"> ({ach.scale})</span>}
            </p>
          ))}
        </>
      )}

      {/* Leadership */}
      {por.length > 0 && (
        <>
          <SectionTitle>Leadership</SectionTitle>
          {por.map((p, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between text-xs">
                <p className="font-semibold">{p.role} - {p.organization}</p>
                <p className="text-gray-600">{formatDate(p.startDate)} - {p.current ? 'Present' : formatDate(p.endDate)}</p>
              </div>
              {p.bullets && p.bullets.length > 0 && (
                <ul className="list-disc ml-4 text-xs text-gray-700 mt-0.5">
                  {p.bullets.map((b, j) => <li key={j} className="leading-tight">{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <>
          <SectionTitle>Publications</SectionTitle>
          {publications.map((pub, i) => (
            <p key={i} className="text-xs mb-1 leading-tight">
              <span className="font-semibold">{pub.title}</span>
              {pub.authors && <span> - {pub.authors}</span>}
              {pub.venue && <span>, {pub.venue}</span>}
              {pub.date && <span> ({formatDate(pub.date)})</span>}
            </p>
          ))}
        </>
      )}

      {/* Extracurricular */}
      {extracurricular.length > 0 && (
        <>
          <SectionTitle>Extracurricular</SectionTitle>
          {extracurricular.map((extra, i) => (
            <p key={i} className="text-xs mb-0.5">
              <span className="font-semibold">{extra.activity}</span>
              {extra.role && <span> - {extra.role}</span>}
              {extra.organization && <span> at {extra.organization}</span>}
            </p>
          ))}
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p className="text-xs">
            {languages.map((l, i) => (
              <span key={i}>
                {l.language} ({l.proficiency})
                {i < languages.length - 1 && ', '}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  )
}

export default CompactTemplate