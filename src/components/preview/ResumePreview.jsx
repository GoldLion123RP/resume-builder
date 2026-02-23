import useResume from '@/hooks/useResume'
import PreviewSection from './PreviewSection'

const ResumePreview = () => {
  const { resumeData } = useResume()

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading resume data...</p>
      </div>
    )
  }

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
  } = resumeData

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  // Check if section has data
  const hasEducation = education.length > 0
  const hasExperience = experience.length > 0
  const hasProjects = projects.length > 0
  const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0)
  const hasCertifications = certifications.length > 0
  const hasAchievements = achievements.length > 0
  const hasPOR = por.length > 0
  const hasPublications = publications.length > 0
  const hasExtracurricular = extracurricular.length > 0
  const hasLanguages = languages.length > 0

  // Get all skills as flat array
  const getAllSkills = () => {
    const allSkills = []
    if (skills.languages?.length) allSkills.push(...skills.languages)
    if (skills.frameworks?.length) allSkills.push(...skills.frameworks)
    if (skills.tools?.length) allSkills.push(...skills.tools)
    if (skills.databases?.length) allSkills.push(...skills.databases)
    if (skills.other?.length) allSkills.push(...skills.other)
    return allSkills
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      {/* Resume Container */}
      <div 
        id="resume-preview"
        className="w-full max-w-[8.5in] mx-auto bg-white text-gray-900 p-8 min-h-[11in]"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {/* ===== HEADER / PROFILE ===== */}
        <header className="text-center mb-6">
          {/* Name */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {profile.fullName || 'Your Name'}
          </h1>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm text-gray-600">
            {profile.email && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile.email}
              </span>
            )}
            {profile.phone && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {profile.phone}
              </span>
            )}
            {profile.location && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm text-gray-600 mt-1">
            {profile.linkedin && (
              <a href={profile.linkedin} className="flex items-center gap-1 text-blue-600 hover:underline">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a href={profile.github} className="flex items-center gap-1 text-blue-600 hover:underline">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            )}
            {profile.portfolio && (
              <a href={profile.portfolio} className="flex items-center gap-1 text-blue-600 hover:underline">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Portfolio
              </a>
            )}
          </div>

          {/* Objective */}
          {profile.objective && (
            <p className="mt-3 text-sm text-gray-700 max-w-2xl mx-auto text-justify">
              {profile.objective}
            </p>
          )}
        </header>

        {/* ===== EDUCATION ===== */}
        <PreviewSection title="Education" icon="🎓" show={hasEducation}>
          {education.map((edu, index) => (
            <div key={edu.id || index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {edu.institution}{edu.location && `, ${edu.location}`}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </p>
                  {edu.cgpa && <p>CGPA: {edu.cgpa}/{edu.maxCgpa || '10'}</p>}
                </div>
              </div>
              {edu.coursework && edu.coursework.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Relevant Coursework:</span> {edu.coursework.join(', ')}
                </p>
              )}
              {edu.achievements && (
                <p className="text-sm text-gray-600 mt-1">{edu.achievements}</p>
              )}
            </div>
          ))}
        </PreviewSection>

        {/* ===== EXPERIENCE ===== */}
        <PreviewSection title="Experience" icon="💼" show={hasExperience}>
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-sm text-gray-600">
                    {exp.company}{exp.location && `, ${exp.location}`}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
              </div>
              {exp.description && (
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              )}
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-1 text-sm text-gray-700 space-y-0.5">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
              {exp.techStack && exp.techStack.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Tech:</span> {exp.techStack.join(', ')}
                </p>
              )}
            </div>
          ))}
        </PreviewSection>

        {/* ===== PROJECTS ===== */}
        <PreviewSection title="Projects" icon="🚀" show={hasProjects}>
          {projects.map((proj, index) => (
            <div key={proj.id || index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} className="text-blue-600 text-xs hover:underline">[GitHub]</a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} className="text-blue-600 text-xs hover:underline">[Live]</a>
                  )}
                </div>
                <div className="text-right text-sm text-gray-600">
                  {(proj.startDate || proj.endDate) && (
                    <p>
                      {formatDate(proj.startDate)} - {proj.current ? 'Present' : formatDate(proj.endDate)}
                    </p>
                  )}
                </div>
              </div>
              {proj.description && (
                <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
              )}
              {proj.highlights && proj.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-1 text-sm text-gray-700 space-y-0.5">
                  {proj.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
              {proj.techStack && proj.techStack.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Tech:</span> {proj.techStack.join(', ')}
                </p>
              )}
            </div>
          ))}
        </PreviewSection>

        {/* ===== SKILLS ===== */}
        <PreviewSection title="Technical Skills" icon="⚡" show={hasSkills}>
          <div className="text-sm space-y-1">
            {skills.languages?.length > 0 && (
              <p><span className="font-medium">Languages:</span> {skills.languages.join(', ')}</p>
            )}
            {skills.frameworks?.length > 0 && (
              <p><span className="font-medium">Frameworks:</span> {skills.frameworks.join(', ')}</p>
            )}
            {skills.tools?.length > 0 && (
              <p><span className="font-medium">Tools:</span> {skills.tools.join(', ')}</p>
            )}
            {skills.databases?.length > 0 && (
              <p><span className="font-medium">Databases:</span> {skills.databases.join(', ')}</p>
            )}
            {skills.other?.length > 0 && (
              <p><span className="font-medium">Other:</span> {skills.other.join(', ')}</p>
            )}
          </div>
        </PreviewSection>

        {/* ===== CERTIFICATIONS ===== */}
        <PreviewSection title="Certifications" icon="📜" show={hasCertifications}>
          {certifications.map((cert, index) => (
            <div key={cert.id || index} className="mb-2 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  <span className="text-gray-600"> - {cert.issuer}</span>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} className="text-blue-600 text-xs ml-2 hover:underline">[Verify]</a>
                  )}
                </div>
                {cert.issueDate && (
                  <span className="text-sm text-gray-600">{formatDate(cert.issueDate)}</span>
                )}
              </div>
            </div>
          ))}
        </PreviewSection>

        {/* ===== ACHIEVEMENTS ===== */}
        <PreviewSection title="Achievements" icon="🏆" show={hasAchievements}>
          {achievements.map((ach, index) => (
            <div key={ach.id || index} className="mb-2 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-gray-900">{ach.title}</span>
                  {ach.organization && <span className="text-gray-600"> - {ach.organization}</span>}
                  {ach.scale && <span className="text-gray-500 text-sm"> ({ach.scale})</span>}
                </div>
                {ach.date && (
                  <span className="text-sm text-gray-600">{formatDate(ach.date)}</span>
                )}
              </div>
              {ach.description && (
                <p className="text-sm text-gray-600 mt-0.5">{ach.description}</p>
              )}
            </div>
          ))}
        </PreviewSection>

        {/* ===== POSITIONS OF RESPONSIBILITY ===== */}
        <PreviewSection title="Leadership" icon="👥" show={hasPOR}>
          {por.map((p, index) => (
            <div key={p.id || index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{p.role}</h3>
                  <p className="text-sm text-gray-600">{p.organization}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {(p.startDate || p.endDate) && (
                    <p>
                      {formatDate(p.startDate)} - {p.current ? 'Present' : formatDate(p.endDate)}
                    </p>
                  )}
                </div>
              </div>
              {p.bullets && p.bullets.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-1 text-sm text-gray-700 space-y-0.5">
                  {p.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </PreviewSection>

        {/* ===== PUBLICATIONS ===== */}
        <PreviewSection title="Publications" icon="📝" show={hasPublications}>
          {publications.map((pub, index) => (
            <div key={pub.id || index} className="mb-2 last:mb-0">
              <p className="text-sm">
                <span className="font-medium text-gray-900">{pub.title}</span>
                {pub.authors && <span className="text-gray-600"> - {pub.authors}</span>}
              </p>
              <p className="text-sm text-gray-600">
                {pub.venue && <span>{pub.venue}</span>}
                {pub.date && <span> ({formatDate(pub.date)})</span>}
                {pub.url && (
                  <a href={pub.url} className="text-blue-600 ml-2 hover:underline">[Link]</a>
                )}
              </p>
            </div>
          ))}
        </PreviewSection>

        {/* ===== EXTRACURRICULAR ===== */}
        <PreviewSection title="Extracurricular" icon="🎯" show={hasExtracurricular}>
          {extracurricular.map((extra, index) => (
            <div key={extra.id || index} className="mb-2 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-gray-900">{extra.activity}</span>
                  {extra.role && <span className="text-gray-600"> - {extra.role}</span>}
                  {extra.organization && <span className="text-gray-600"> at {extra.organization}</span>}
                </div>
                {(extra.startDate || extra.endDate) && (
                  <span className="text-sm text-gray-600">
                    {formatDate(extra.startDate)} - {extra.current ? 'Present' : formatDate(extra.endDate)}
                  </span>
                )}
              </div>
              {extra.description && (
                <p className="text-sm text-gray-600 mt-0.5">{extra.description}</p>
              )}
            </div>
          ))}
        </PreviewSection>

        {/* ===== LANGUAGES ===== */}
        <PreviewSection title="Languages" icon="🌐" show={hasLanguages}>
          <p className="text-sm">
            {languages.map((lang, index) => (
              <span key={lang.id || index}>
                {lang.language} ({lang.proficiency})
                {index < languages.length - 1 && ' • '}
              </span>
            ))}
          </p>
        </PreviewSection>

      </div>
    </div>
  )
}

export default ResumePreview