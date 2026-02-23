const ATSTemplate = ({ data }) => {
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
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const SectionTitle = ({ children }) => (
    <h2 className="text-sm font-bold uppercase text-black mt-4 mb-2 first:mt-0">
      {children}
    </h2>
  )

  // Get all skills as single list
  const allSkills = []
  if (skills.languages?.length) allSkills.push(...skills.languages)
  if (skills.frameworks?.length) allSkills.push(...skills.frameworks)
  if (skills.tools?.length) allSkills.push(...skills.tools)
  if (skills.databases?.length) allSkills.push(...skills.databases)
  if (skills.other?.length) allSkills.push(...skills.other)

  return (
    <div className="w-full bg-white text-black p-8" style={{ fontFamily: 'Times New Roman, serif', fontSize: '11pt', lineHeight: '1.4' }}>
      {/* Header - Plain Text Only */}
      <header className="text-left mb-4">
        <h1 className="text-xl font-bold uppercase text-black mb-2">
          {profile.fullName || 'YOUR NAME'}
        </h1>
        <div className="text-sm space-y-0.5">
          {profile.email && <p>Email: {profile.email}</p>}
          {profile.phone && <p>Phone: {profile.phone}</p>}
          {profile.location && <p>Location: {profile.location}</p>}
          {profile.linkedin && <p>LinkedIn: {profile.linkedin}</p>}
          {profile.github && <p>GitHub: {profile.github}</p>}
          {profile.portfolio && <p>Portfolio: {profile.portfolio}</p>}
        </div>
      </header>

      {/* Objective */}
      {profile.objective && (
        <>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-sm text-black">{profile.objective}</p>
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, i) => (
            <div key={i} className="mb-3 text-sm">
              <p className="font-bold">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
              <p>{edu.institution}{edu.location && `, ${edu.location}`}</p>
              <p>{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
              {edu.cgpa && <p>CGPA: {edu.cgpa} out of {edu.maxCgpa || '10'}</p>}
              {edu.coursework && edu.coursework.length > 0 && (
                <p>Relevant Coursework: {edu.coursework.join(', ')}</p>
              )}
              {edu.achievements && <p>{edu.achievements}</p>}
            </div>
          ))}
        </>
      )}

      {/* Skills - Simple List */}
      {allSkills.length > 0 && (
        <>
          <SectionTitle>Technical Skills</SectionTitle>
          <p className="text-sm">
            {allSkills.join(', ')}
          </p>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <SectionTitle>Professional Experience</SectionTitle>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3 text-sm">
              <p className="font-bold">{exp.role}</p>
              <p>{exp.company}{exp.location && `, ${exp.location}`}</p>
              <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              {exp.description && <p className="mt-1">{exp.description}</p>}
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>- {b}</li>
                  ))}
                </ul>
              )}
              {exp.techStack && exp.techStack.length > 0 && (
                <p className="mt-1">Technologies Used: {exp.techStack.join(', ')}</p>
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
            <div key={i} className="mb-3 text-sm">
              <p className="font-bold">{proj.name}</p>
              {(proj.startDate || proj.endDate) && (
                <p>{formatDate(proj.startDate)} - {proj.current ? 'Present' : formatDate(proj.endDate)}</p>
              )}
              {proj.description && <p className="mt-1">{proj.description}</p>}
              {proj.highlights && proj.highlights.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {proj.highlights.map((h, j) => (
                    <li key={j}>- {h}</li>
                  ))}
                </ul>
              )}
              {proj.techStack && proj.techStack.length > 0 && (
                <p className="mt-1">Technologies: {proj.techStack.join(', ')}</p>
              )}
              {proj.githubUrl && <p>GitHub: {proj.githubUrl}</p>}
              {proj.liveUrl && <p>Live URL: {proj.liveUrl}</p>}
            </div>
          ))}
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert, i) => (
            <div key={i} className="mb-2 text-sm">
              <p className="font-bold">{cert.name}</p>
              <p>{cert.issuer}</p>
              {cert.issueDate && <p>Issued: {formatDate(cert.issueDate)}</p>}
              {!cert.noExpiry && cert.expiryDate && <p>Expires: {formatDate(cert.expiryDate)}</p>}
              {cert.credentialId && <p>Credential ID: {cert.credentialId}</p>}
              {cert.credentialUrl && <p>Verification URL: {cert.credentialUrl}</p>}
            </div>
          ))}
        </>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <SectionTitle>Achievements and Awards</SectionTitle>
          {achievements.map((ach, i) => (
            <div key={i} className="mb-2 text-sm">
              <p className="font-bold">{ach.title}</p>
              {ach.organization && <p>{ach.organization}</p>}
              {ach.date && <p>{formatDate(ach.date)}</p>}
              {ach.scale && <p>Level: {ach.scale}</p>}
              {ach.description && <p>{ach.description}</p>}
            </div>
          ))}
        </>
      )}

      {/* Leadership / POR */}
      {por.length > 0 && (
        <>
          <SectionTitle>Leadership and Positions of Responsibility</SectionTitle>
          {por.map((p, i) => (
            <div key={i} className="mb-3 text-sm">
              <p className="font-bold">{p.role}</p>
              <p>{p.organization}</p>
              {(p.startDate || p.endDate) && (
                <p>{formatDate(p.startDate)} - {p.current ? 'Present' : formatDate(p.endDate)}</p>
              )}
              {p.bullets && p.bullets.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {p.bullets.map((b, j) => (
                    <li key={j}>- {b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <>
          <SectionTitle>Publications and Research</SectionTitle>
          {publications.map((pub, i) => (
            <div key={i} className="mb-2 text-sm">
              <p className="font-bold">{pub.title}</p>
              {pub.authors && <p>Authors: {pub.authors}</p>}
              {pub.venue && <p>Published in: {pub.venue}</p>}
              {pub.date && <p>Date: {formatDate(pub.date)}</p>}
              {pub.doi && <p>DOI: {pub.doi}</p>}
              {pub.url && <p>URL: {pub.url}</p>}
              {pub.abstract && <p className="mt-1">{pub.abstract}</p>}
            </div>
          ))}
        </>
      )}

      {/* Extracurricular */}
      {extracurricular.length > 0 && (
        <>
          <SectionTitle>Extracurricular Activities</SectionTitle>
          {extracurricular.map((extra, i) => (
            <div key={i} className="mb-2 text-sm">
              <p className="font-bold">{extra.activity}</p>
              {extra.organization && <p>{extra.organization}</p>}
              {extra.role && <p>Role: {extra.role}</p>}
              {(extra.startDate || extra.endDate) && (
                <p>{formatDate(extra.startDate)} - {extra.current ? 'Present' : formatDate(extra.endDate)}</p>
              )}
              {extra.description && <p>{extra.description}</p>}
            </div>
          ))}
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <div className="text-sm space-y-1">
            {languages.map((l, i) => (
              <p key={i}>{l.language} - {l.proficiency}</p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ATSTemplate