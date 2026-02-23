// Action Verbs Database for Resume Writing
// Categorized by skill type to help write powerful, ATS-friendly resume bullets

export const actionVerbsDatabase = {
  leadership: {
    name: 'Leadership & Management',
    icon: '👔',
    verbs: [
      'Led',
      'Managed',
      'Directed',
      'Coordinated',
      'Supervised',
      'Spearheaded',
      'Orchestrated',
      'Oversaw',
      'Guided',
      'Mentored',
      'Coached',
      'Trained',
      'Facilitated',
      'Delegated',
      'Motivated',
      'Inspired',
      'Empowered',
      'Championed',
      'Pioneered',
      'Established',
    ],
  },
  technical: {
    name: 'Technical & Development',
    icon: '💻',
    verbs: [
      'Developed',
      'Engineered',
      'Programmed',
      'Coded',
      'Built',
      'Designed',
      'Implemented',
      'Architected',
      'Deployed',
      'Debugged',
      'Optimized',
      'Automated',
      'Integrated',
      'Migrated',
      'Refactored',
      'Tested',
      'Configured',
      'Maintained',
      'Upgraded',
      'Scaled',
    ],
  },
  analytical: {
    name: 'Analytical & Problem-Solving',
    icon: '📊',
    verbs: [
      'Analyzed',
      'Evaluated',
      'Assessed',
      'Investigated',
      'Researched',
      'Identified',
      'Diagnosed',
      'Solved',
      'Resolved',
      'Troubleshot',
      'Forecasted',
      'Predicted',
      'Measured',
      'Quantified',
      'Calculated',
      'Modeled',
      'Validated',
      'Verified',
      'Audited',
      'Examined',
    ],
  },
  creative: {
    name: 'Creative & Design',
    icon: '🎨',
    verbs: [
      'Designed',
      'Created',
      'Conceptualized',
      'Crafted',
      'Illustrated',
      'Composed',
      'Produced',
      'Authored',
      'Wrote',
      'Published',
      'Branded',
      'Redesigned',
      'Revamped',
      'Innovated',
      'Invented',
      'Prototyped',
      'Visualized',
      'Styled',
      'Curated',
      'Animated',
    ],
  },
  communication: {
    name: 'Communication & Collaboration',
    icon: '💬',
    verbs: [
      'Communicated',
      'Presented',
      'Articulated',
      'Conveyed',
      'Briefed',
      'Reported',
      'Documented',
      'Collaborated',
      'Partnered',
      'Liaised',
      'Negotiated',
      'Persuaded',
      'Influenced',
      'Advocated',
      'Consulted',
      'Advised',
      'Counseled',
      'Educated',
      'Informed',
      'Clarified',
    ],
  },
  achievement: {
    name: 'Achievement & Results',
    icon: '🏆',
    verbs: [
      'Achieved',
      'Accomplished',
      'Delivered',
      'Exceeded',
      'Surpassed',
      'Outperformed',
      'Increased',
      'Boosted',
      'Improved',
      'Enhanced',
      'Maximized',
      'Accelerated',
      'Expanded',
      'Grew',
      'Generated',
      'Drove',
      'Elevated',
      'Advanced',
      'Won',
      'Earned',
    ],
  },
  efficiency: {
    name: 'Efficiency & Optimization',
    icon: '⚡',
    verbs: [
      'Streamlined',
      'Optimized',
      'Reduced',
      'Minimized',
      'Eliminated',
      'Simplified',
      'Consolidated',
      'Restructured',
      'Reorganized',
      'Standardized',
      'Automated',
      'Accelerated',
      'Enhanced',
      'Refined',
      'Fine-tuned',
      'Upgraded',
      'Modernized',
      'Transformed',
      'Revitalized',
      'Expedited',
    ],
  },
  data: {
    name: 'Data & Analytics',
    icon: '📈',
    verbs: [
      'Analyzed',
      'Tracked',
      'Monitored',
      'Measured',
      'Reported',
      'Visualized',
      'Interpreted',
      'Correlated',
      'Forecasted',
      'Predicted',
      'Segmented',
      'Categorized',
      'Aggregated',
      'Synthesized',
      'Modeled',
      'Simulated',
      'Benchmarked',
      'Projected',
      'Extrapolated',
      'Mined',
    ],
  },
  initiative: {
    name: 'Initiative & Innovation',
    icon: '💡',
    verbs: [
      'Initiated',
      'Launched',
      'Pioneered',
      'Founded',
      'Established',
      'Introduced',
      'Instituted',
      'Originated',
      'Innovated',
      'Invented',
      'Devised',
      'Formulated',
      'Conceived',
      'Envisioned',
      'Proposed',
      'Recommended',
      'Suggested',
      'Championed',
      'Promoted',
      'Advocated',
    ],
  },
  financial: {
    name: 'Financial & Business',
    icon: '💰',
    verbs: [
      'Budgeted',
      'Forecasted',
      'Allocated',
      'Invested',
      'Saved',
      'Reduced',
      'Increased',
      'Generated',
      'Maximized',
      'Profited',
      'Audited',
      'Reconciled',
      'Balanced',
      'Projected',
      'Estimated',
      'Calculated',
      'Financed',
      'Funded',
      'Negotiated',
      'Procured',
    ],
  },
  customer: {
    name: 'Customer & Client Relations',
    icon: '🤝',
    verbs: [
      'Served',
      'Assisted',
      'Supported',
      'Helped',
      'Resolved',
      'Addressed',
      'Satisfied',
      'Retained',
      'Acquired',
      'Onboarded',
      'Engaged',
      'Cultivated',
      'Nurtured',
      'Strengthened',
      'Built',
      'Maintained',
      'Managed',
      'Handled',
      'Responded',
      'Followed-up',
    ],
  },
  organization: {
    name: 'Organization & Planning',
    icon: '📋',
    verbs: [
      'Organized',
      'Planned',
      'Scheduled',
      'Arranged',
      'Coordinated',
      'Executed',
      'Implemented',
      'Administered',
      'Managed',
      'Maintained',
      'Cataloged',
      'Systematized',
      'Prioritized',
      'Structured',
      'Formulated',
      'Prepared',
      'Compiled',
      'Assembled',
      'Gathered',
      'Collected',
    ],
  },
}

// Get all verbs as a flat array
export const getAllActionVerbs = () => {
  const allVerbs = []
  Object.values(actionVerbsDatabase).forEach((category) => {
    allVerbs.push(...category.verbs)
  })
  return [...new Set(allVerbs)].sort()
}

// Get random verb from a category
export const getRandomVerb = (categoryKey) => {
  const category = actionVerbsDatabase[categoryKey]
  if (!category) return null
  const verbs = category.verbs
  return verbs[Math.floor(Math.random() * verbs.length)]
}

// Search verbs
export const searchActionVerbs = (query) => {
  if (!query) return []
  const lowerQuery = query.toLowerCase()
  const results = []

  Object.entries(actionVerbsDatabase).forEach(([key, category]) => {
    const matchingVerbs = category.verbs.filter((verb) =>
      verb.toLowerCase().includes(lowerQuery)
    )
    if (matchingVerbs.length > 0) {
      results.push({
        category: category.name,
        icon: category.icon,
        verbs: matchingVerbs,
      })
    }
  })

  return results
}

// Tips for using action verbs
export const actionVerbTips = [
  {
    title: 'Start with Action Verbs',
    description: 'Begin each bullet point with a strong action verb to make your achievements more impactful.',
    example: '✅ "Led a team of 5 developers" vs ❌ "Was responsible for leading a team"',
  },
  {
    title: 'Use Past Tense',
    description: 'For previous positions, use past tense. For current roles, use present tense.',
    example: '✅ Past: "Developed" | Current: "Develop"',
  },
  {
    title: 'Vary Your Verbs',
    description: 'Avoid repeating the same action verb. Use synonyms to keep your resume engaging.',
    example: '✅ "Led, Managed, Directed" vs ❌ "Led, Led, Led"',
  },
  {
    title: 'Be Specific',
    description: 'Choose verbs that accurately describe what you did. Be precise rather than generic.',
    example: '✅ "Optimized" vs ❌ "Improved"',
  },
  {
    title: 'Quantify Results',
    description: 'Pair action verbs with measurable results for maximum impact.',
    example: '✅ "Increased sales by 40%" vs ❌ "Increased sales"',
  },
  {
    title: 'Match Job Description',
    description: 'Use action verbs that align with the skills mentioned in the job posting.',
    example: 'Job says "leadership" → Use: Led, Managed, Directed',
  },
]

// Resume writing formulas
export const resumeFormulas = [
  {
    name: 'XYZ Formula (Google)',
    formula: 'Accomplished [X] as measured by [Y], by doing [Z]',
    example: 'Increased customer retention by 25% through implementing a personalized email campaign',
  },
  {
    name: 'STAR Method',
    formula: 'Situation → Task → Action → Result',
    example: 'Identified 15% revenue loss (S) requiring process improvement (T). Implemented automated tracking (A), recovering $2M annually (R)',
  },
  {
    name: 'PAR Formula',
    formula: 'Problem → Action → Result',
    example: 'Resolved website downtime issues by migrating to cloud infrastructure, achieving 99.9% uptime',
  },
  {
    name: 'CAR Formula',
    formula: 'Challenge → Action → Result',
    example: 'Faced declining user engagement. Redesigned UX/UI, increasing daily active users by 60%',
  },
]

export default actionVerbsDatabase