import { useResume } from '@/hooks/useResume'

const ResumeScore = () => {
  const { resumeData } = useResume()

  if (!resumeData) {
    return null
  }

  const sections = [
    {
      id: 'profile',
      label: 'Profile',
      check: (data) => 
        data?.profile?.fullName?.trim() !== '' && 
        data?.profile?.email?.trim() !== ''
    },
    {
      id: 'education',
      label: 'Education',
      check: (data) => 
        Array.isArray(data?.education) && 
        data.education.length > 0 && 
        data.education[0]?.degree?.trim() !== '' && 
        data.education[0]?.institution?.trim() !== ''
    },
    {
      id: 'experience',
      label: 'Experience',
      check: (data) => 
        Array.isArray(data?.experience) && 
        data.experience.length > 0 && 
        data.experience[0]?.jobTitle?.trim() !== '' && 
        data.experience[0]?.company?.trim() !== ''
    },
    {
      id: 'projects',
      label: 'Projects',
      check: (data) => 
        Array.isArray(data?.projects) && 
        data.projects.length > 0 && 
        data.projects[0]?.name?.trim() !== '' && 
        data.projects[0]?.description?.trim() !== ''
    },
    {
      id: 'skills',
      label: 'Skills',
      check: (data) => 
        data?.skills && 
        Object.values(data.skills).some(category => 
          Array.isArray(category) && category.length > 0
        )
    },
    {
      id: 'certifications',
      label: 'Certifications',
      check: (data) => 
        Array.isArray(data?.certifications) && 
        data.certifications.length > 0 && 
        data.certifications[0]?.name?.trim() !== '' && 
        data.certifications[0]?.issuer?.trim() !== ''
    },
    {
      id: 'achievements',
      label: 'Achievements',
      check: (data) => 
        Array.isArray(data?.achievements) && 
        data.achievements.length > 0 && 
        data.achievements[0]?.title?.trim() !== '' && 
        data.achievements[0]?.issuer?.trim() !== ''
    },
    {
      id: 'por',
      label: 'Positions of Responsibility',
      check: (data) => 
        Array.isArray(data?.por) && 
        data.por.length > 0 && 
        data.por[0]?.title?.trim() !== '' && 
        data.por[0]?.organization?.trim() !== ''
    },
    {
      id: 'publications',
      label: 'Publications',
      check: (data) => 
        Array.isArray(data?.publications) && 
        data.publications.length > 0 && 
        data.publications[0]?.title?.trim() !== '' && 
        data.publications[0]?.authors?.trim() !== ''
    },
    {
      id: 'extracurricular',
      label: 'Extracurricular Activities',
      check: (data) => 
        Array.isArray(data?.extracurricular) && 
        data.extracurricular.length > 0 && 
        data.extracurricular[0]?.activity?.trim() !== '' && 
        data.extracurricular[0]?.organization?.trim() !== ''
    },
    {
      id: 'languages',
      label: 'Languages',
      check: (data) => 
        Array.isArray(data?.languages) && 
        data.languages.length > 0 && 
        data.languages[0]?.language?.trim() !== '' && 
        data.languages[0]?.proficiency?.trim() !== ''
    }
  ]

  const completedSections = sections.filter(section => 
    section.check(resumeData)
  ).length

  const totalSections = sections.length
  const score = Math.round((completedSections / totalSections) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Resume Completeness
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {score}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className={`bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      {score < 100 && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {completedSections}/{totalSections} sections complete
        </div>
      )}
    </div>
  )
}

export default ResumeScore