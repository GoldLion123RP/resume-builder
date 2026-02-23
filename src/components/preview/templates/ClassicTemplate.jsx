const ClassicTemplate = ({ data }) => {
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
    <h2 className="text-base font-bold uppercase tracking-wide border-b-2 border-gray-900 pb-1 mb-2 mt-4">
      {children}
    </h2>
  )

  return (
    <div className="w-full bg-white text-gray-900 p-8" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
      {/* Header */}
      <header className="text-center border-b-2 border-gray-900 pb-3 mb-4">
        <h1 className="text-3xl font-bold mb-2">{profile.fullName || 'Your Name'}</h1>
        <div className="text-sm space-x-3">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>•</span>}
          {profile.phone && <span>{profile.phone}</span>}
          {profile.location && <span>•</span>}
          {profile.location && <span>{profile.location}</span>}
        </div>
        <div className="text-sm space-x-3 mt-1">
          {profile.linkedin && <a href={profile.linkedin} className="underline">LinkedIn</a>}
          {profile.github && <span>•</span>}
          {profile.github && <a href={profile.github} className="underline">GitHub</a>}
          {profile.portfolio && <span>•</span>}
          {profile.portfolio && <a href={profile.portfolio} className="underline">Portfolio</a>}
        </div>
      </header>

      {/* Objective */}
      {profile.objective && (
        <>
          <SectionTitle>Objective</SectionTitle>
          <p className="text-sm text-justify mb-2">{profile.objective}</p>
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <p className="font-semibold">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                <p className="text-sm italic">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
              </div>
              <p className="text-sm italic">{edu.institution}{edu.location && `, ${edu.location}`}</p>
              {edu.cgpa && <p className="text-sm">CGPA: {edu.cgpa}/{edu.maxCgpa || '10'}</p>}
            </div>
          ))}
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <SectionTitle>Professional Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <p className="font-semibold">{exp.role}</p>
                <p className="text-sm italic">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
              <p className="text-sm italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="list-disc ml-5 text-sm mt-1">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
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
            <div key={i} className="mb-2">
              <p className="font-semibold">{proj.name}</p>
              <p className="text-sm">{proj.description}</p>
              {proj.techStack && proj.techStack.length > 0 && (
                <p className="text-sm italic">Technologies: {proj.techStack.join(', ')}</p>
              )}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {Object.values(skills).some(arr => arr?.length > 0) && (
        <>
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="text-sm">
            {skills.languages?.length > 0 && <p><span className="font-semibold">Languages:</span> {skills.languages.join(', ')}</p>}
            {skills.frameworks?.length > 0 && <p><span className="font-semibold">Frameworks:</span> {skills.frameworks.join(', ')}</p>}
            {skills.tools?.length > 0 && <p><span className="font-semibold">Tools:</span> {skills.tools.join(', ')}</p>}
          </div>
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <p key={i} className="text-sm mb-1">
              <span className="font-semibold">{cert.name}</span> - {cert.issuer} ({formatDate(cert.issueDate)})
            </p>
          ))}
        </>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <SectionTitle>Achievements</SectionTitle>
          {achievements.map((ach, i) => (
            <p key={i} className="text-sm mb-1">
              <span className="font-semibold">{ach.title}</span> - {ach.organization}
            </p>
          ))}
        </>
      )}
    </div>
  )
}

export default ClassicTemplate