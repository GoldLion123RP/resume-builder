const TwoColumnTemplate = ({ data }) => {
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

  const LeftSectionTitle = ({ children }) => (
    <h2 className="text-xs font-bold uppercase tracking-wide text-white mb-2 mt-4 first:mt-0">
      {children}
    </h2>
  )

  const RightSectionTitle = ({ children }) => (
    <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 border-b-2 border-gray-300 pb-1 mb-2 mt-4 first:mt-0">
      {children}
    </h2>
  )

  return (
    <div className="w-full bg-white flex" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* LEFT SIDEBAR */}
      <aside className="w-1/3 bg-gray-800 text-white p-6">
        {/* Profile Image Placeholder */}
        {profile.imageUrl && (
          <div className="mb-4">
            <img src={profile.imageUrl} alt={profile.fullName} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white" />
          </div>
        )}

        {/* Contact */}
        <LeftSectionTitle>Contact</LeftSectionTitle>
        <div className="text-xs space-y-1 text-gray-300">
          {profile.email && (
            <p className="break-words">
              <span className="block font-semibold text-white text-xs mb-0.5">Email</span>
              {profile.email}
            </p>
          )}
          {profile.phone && (
            <p className="mt-2">
              <span className="block font-semibold text-white text-xs mb-0.5">Phone</span>
              {profile.phone}
            </p>
          )}
          {profile.location && (
            <p className="mt-2">
              <span className="block font-semibold text-white text-xs mb-0.5">Location</span>
              {profile.location}
            </p>
          )}
        </div>

        {/* Links */}
        {(profile.linkedin || profile.github || profile.portfolio) && (
          <>
            <LeftSectionTitle>Links</LeftSectionTitle>
            <div className="text-xs space-y-1">
              {profile.linkedin && (
                <a href={profile.linkedin} className="block text-blue-300 hover:text-blue-200 break-words">
                  LinkedIn
                </a>
              )}
              {profile.github && (
                <a href={profile.github} className="block text-blue-300 hover:text-blue-200 break-words">
                  GitHub
                </a>
              )}
              {profile.portfolio && (
                <a href={profile.portfolio} className="block text-blue-300 hover:text-blue-200 break-words">
                  Portfolio
                </a>
              )}
            </div>
          </>
        )}

        {/* Skills */}
        {Object.values(skills).some(arr => arr?.length > 0) && (
          <>
            <LeftSectionTitle>Skills</LeftSectionTitle>
            <div className="text-xs space-y-2">
              {skills.languages?.length > 0 && (
                <div>
                  <p className="font-semibold text-white mb-1">Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.languages.map((s, i) => (
                      <span key={i} className="bg-gray-700 px-2 py-0.5 rounded text-gray-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.frameworks?.length > 0 && (
                <div>
                  <p className="font-semibold text-white mb-1">Frameworks</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.frameworks.map((s, i) => (
                      <span key={i} className="bg-gray-700 px-2 py-0.5 rounded text-gray-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.tools?.length > 0 && (
                <div>
                  <p className="font-semibold text-white mb-1">Tools</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.tools.map((s, i) => (
                      <span key={i} className="bg-gray-700 px-2 py-0.5 rounded text-gray-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <LeftSectionTitle>Languages</LeftSectionTitle>
            <div className="text-xs space-y-1 text-gray-300">
              {languages.map((l, i) => (
                <p key={i}>
                  <span className="text-white font-semibold">{l.language}</span>
                  <br />
                  <span className="text-gray-400 text-xs capitalize">{l.proficiency}</span>
                </p>
              ))}
            </div>
          </>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <>
            <LeftSectionTitle>Certifications</LeftSectionTitle>
            <div className="text-xs space-y-2 text-gray-300">
              {certifications.map((cert, i) => (
                <div key={i}>
                  <p className="text-white font-semibold">{cert.name}</p>
                  <p className="text-gray-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="w-2/3 p-6">
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{profile.fullName || 'Your Name'}</h1>
          {profile.objective && (
            <p className="text-sm text-gray-700 mt-2 text-justify">{profile.objective}</p>
          )}
        </header>

        {/* Education */}
        {education.length > 0 && (
          <>
            <RightSectionTitle>Education</RightSectionTitle>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-900">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                  <p className="text-xs text-gray-600">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
                </div>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                {edu.cgpa && <p className="text-sm text-gray-600">CGPA: {edu.cgpa}/{edu.maxCgpa || '10'}</p>}
              </div>
            ))}
          </>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <>
            <RightSectionTitle>Experience</RightSectionTitle>
            {experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-900">{exp.role}</p>
                  <p className="text-xs text-gray-600">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                </div>
                <p className="text-sm text-gray-600">{exp.company}</p>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 text-sm text-gray-700 mt-1 space-y-0.5">
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
            <RightSectionTitle>Projects</RightSectionTitle>
            {projects.map((proj, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-gray-900">{proj.name}</p>
                {proj.description && <p className="text-sm text-gray-600">{proj.description}</p>}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="list-disc ml-4 text-sm text-gray-700 mt-1">
                    {proj.highlights.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
                {proj.techStack && proj.techStack.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">Tech: {proj.techStack.join(', ')}</p>
                )}
              </div>
            ))}
          </>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <>
            <RightSectionTitle>Achievements</RightSectionTitle>
            {achievements.map((ach, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold text-gray-900">{ach.title}</p>
                <p className="text-sm text-gray-600">{ach.organization}</p>
              </div>
            ))}
          </>
        )}

        {/* Leadership */}
        {por.length > 0 && (
          <>
            <RightSectionTitle>Leadership</RightSectionTitle>
            {por.map((p, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-900">{p.role}</p>
                  <p className="text-xs text-gray-600">{formatDate(p.startDate)} - {p.current ? 'Present' : formatDate(p.endDate)}</p>
                </div>
                <p className="text-sm text-gray-600">{p.organization}</p>
                {p.bullets && p.bullets.length > 0 && (
                  <ul className="list-disc ml-4 text-sm text-gray-700 mt-1">
                    {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  )
}

export default TwoColumnTemplate