/**
 * ATS (Applicant Tracking System) Compatibility Checker
 * Analyzes resume data and provides a score with improvement suggestions
 */

export const checkATSCompatibility = (resumeData) => {
  if (!resumeData) {
    return {
      score: 0,
      passed: false,
      feedback: ['No resume data available for analysis'],
      suggestions: ['Please fill in your resume details first']
    };
  }

  const { profile, education, experience, skills, projects, certifications } = resumeData;
  let score = 0;
  const feedback = [];
  const suggestions = [];

  // 1. Check for basic contact information (20 points)
  const contactScore = checkContactInfo(profile);
  score += contactScore.points;
  feedback.push(...contactScore.feedback);
  suggestions.push(...contactScore.suggestions);

  // 2. Check for professional summary/objective (15 points)
  const summaryScore = checkProfessionalSummary(profile);
  score += summaryScore.points;
  feedback.push(...summaryScore.feedback);
  suggestions.push(...summaryScore.suggestions);

  // 3. Check for work experience (25 points)
  const experienceScore = checkWorkExperience(experience);
  score += experienceScore.points;
  feedback.push(...experienceScore.feedback);
  suggestions.push(...experienceScore.suggestions);

  // 4. Check for education (15 points)
  const educationScore = checkEducation(education);
  score += educationScore.points;
  feedback.push(...educationScore.feedback);
  suggestions.push(...educationScore.suggestions);

  // 5. Check for skills (15 points)
  const skillsScore = checkSkills(skills);
  score += skillsScore.points;
  feedback.push(...skillsScore.feedback);
  suggestions.push(...skillsScore.suggestions);

  // 6. Check for formatting and ATS-friendly elements (10 points)
  const formatScore = checkFormatting(resumeData);
  score += formatScore.points;
  feedback.push(...formatScore.feedback);
  suggestions.push(...formatScore.suggestions);

  // Determine if passed (score >= 70)
  const passed = score >= 70;

  return {
    score: Math.min(100, Math.round(score)),
    passed,
    feedback,
    suggestions: [...new Set(suggestions)] // Remove duplicates
  };
};

// Helper functions for each section
const checkContactInfo = (profile) => {
  let points = 0;
  const feedback = [];
  const suggestions = [];

  if (!profile || typeof profile !== 'object') {
    feedback.push('Missing profile information');
    suggestions.push('Add your full name, email, phone number, and location');
    return { points, feedback, suggestions };
  }

  const { fullName, email, phone, location, linkedin, github } = profile;

  if (fullName && fullName.trim()) {
    points += 5;
  } else {
    feedback.push('Missing full name');
    suggestions.push('Add your full name at the top of your resume');
  }

  if (email && email.includes('@')) {
    points += 5;
  } else {
    feedback.push('Missing or invalid email address');
    suggestions.push('Add a professional email address');
  }

  if (phone && phone.replace(/\D/g, '').length >= 10) {
    points += 5;
  } else {
    feedback.push('Missing or invalid phone number');
    suggestions.push('Add your phone number with area code');
  }

  if (location && location.trim()) {
    points += 3;
  } else {
    feedback.push('Missing location');
    suggestions.push('Add your city and state (or country)');
  }

  // Bonus points for professional profiles
  if ((linkedin && linkedin.includes('linkedin.com')) || 
      (github && github.includes('github.com'))) {
    points += 2;
  } else {
    suggestions.push('Add LinkedIn or GitHub profile URLs for bonus points');
  }

  return { points, feedback, suggestions };
};

const checkProfessionalSummary = (profile) => {
  let points = 0;
  const feedback = [];
  const suggestions = [];

  if (!profile || typeof profile !== 'object') {
    feedback.push('Missing profile information');
    suggestions.push('Add a professional summary or objective');
    return { points, feedback, suggestions };
  }

  const { objective, summary } = profile;
  const text = objective || summary || '';

  if (text && text.trim().length >= 50) {
    points += 15;
  } else if (text && text.trim().length >= 20) {
    points += 10;
    feedback.push('Professional summary is too short');
    suggestions.push('Expand your summary to 50+ characters highlighting your value proposition');
  } else {
    feedback.push('Missing professional summary or objective');
    suggestions.push('Add a 2-3 sentence summary of your professional background and goals');
  }

  return { points, feedback, suggestions };
};

const checkWorkExperience = (experience) => {
  let points = 0;
  const feedback = [];
  const suggestions = [];

  if (!Array.isArray(experience) || experience.length === 0) {
    feedback.push('No work experience found');
    suggestions.push('Add your work experience with company names, positions, dates, and descriptions');
    return { points, feedback, suggestions };
  }

  // Points for having experience
  points += 10;

  let totalExperience = experience.length;
  let detailedExperience = 0;
  let quantifiedExperience = 0;

  experience.forEach((exp, index) => {
    if (!exp || typeof exp !== 'object') {
      feedback.push(`Experience entry ${index + 1} is incomplete`);
      suggestions.push(`Complete all fields for position ${index + 1}`);
      return;
    }

    const { position, company, startDate, endDate, description, bullets, technologies } = exp;

    // Check for basic info
    if (position && position.trim()) points += 1;
    if (company && company.trim()) points += 1;
    if ((startDate && endDate) || (startDate && !endDate)) points += 1;

    // Check for description or bullets
    const hasDescription = description && typeof description === 'string' && description.trim().length > 10;
    const hasBullets = Array.isArray(bullets) && bullets.length > 0;

    if (hasDescription || hasBullets) {
      detailedExperience++;
      points += 2;
    } else {
      feedback.push(`Position "${position || 'Unknown'}" lacks description`);
      suggestions.push(`Add a description or bullet points for your role at ${company || 'this company'}`);
    }

    // Check for quantified achievements
    const hasNumbers = (description || '').match(/\d+%|\$\d+|\d+\+?\s*(users?|customers?|projects?|team|sales?|revenue|growth|efficiency)/i) ||
                      (Array.isArray(bullets) && bullets.some(bullet => 
                        bullet.match(/\d+%|\$\d+|\d+\+?\s*(users?|customers?|projects?|team|sales?|revenue|growth|efficiency)/i)));

    if (hasNumbers) {
      quantifiedExperience++;
      points += 1;
    } else if (hasDescription || hasBullets) {
      suggestions.push(`Add numbers to your achievements at ${position || 'this role'} (e.g., "Increased sales by 20%")`);
    }

    // Check for technologies/skills
    if ((technologies && Array.isArray(technologies) && technologies.length > 0) ||
        (skills && typeof skills === 'object')) {
      points += 1;
    }
  });

  // Experience depth bonus
  if (totalExperience >= 3) points += 3;
  else if (totalExperience >= 2) points += 2;
  else if (totalExperience >= 1) points += 1;

  // Detail bonus
  if (detailedExperience >= 2) points += 3;
  else if (detailedExperience >= 1) points += 2;

  // Quantification bonus
  if (quantifiedExperience >= 2) points += 3;
  else if (quantifiedExperience >= 1) points += 2;

  // Cap at 25 points
  points = Math.min(points, 25);

  return { points, feedback, suggestions };
};

const checkEducation = (education) => {
  let points = 0;
  const feedback = [];
  const suggestions = [];

  if (!Array.isArray(education) || education.length === 0) {
    feedback.push('No education found');
    suggestions.push('Add your educational background');
    return { points, feedback, suggestions };
  }

  points += 5; // Base points for having education

  education.forEach((edu, index) => {
    if (!edu || typeof edu !== 'object') {
      feedback.push(`Education entry ${index + 1} is incomplete`);
      suggestions.push(`Complete all fields for education entry ${index + 1}`);
      return;
    }

    const { degree, fieldOfStudy, institution, startDate, endDate, current, gpa } = edu;

    if (degree && degree.trim()) points += 2;
    if (fieldOfStudy && fieldOfStudy.trim()) points += 2;
    if (institution && institution.trim()) points += 2;
    if ((startDate && endDate) || (startDate && current)) points += 2;

    if (gpa && !isNaN(parseFloat(gpa)) && parseFloat(gpa) >= 3.0) {
      points += 2; // Bonus for good GPA
    } else if (gpa) {
      points += 1; // Some points for having GPA
    }
  });

  // Cap at 15 points
  points = Math.min(points, 15);

  return { points, feedback, suggestions };
};

const checkSkills = (skills) => {
  let points = 0;
  const feedback = [];
  const suggestions = [];

  if (!skills || (typeof skills !== 'object' && !Array.isArray(skills))) {
    feedback.push('No skills found');
    suggestions.push('Add your technical and soft skills');
    return { points, feedback, suggestions };
  }

  let skillCount = 0;
  let categories = 0;

  if (Array.isArray(skills)) {
    // Handle array format
    skills.forEach(skillGroup => {
      if (skillGroup && typeof skillGroup === 'object') {
        const { category, skills: skillList } = skillGroup;
        if (category && category.trim()) categories++;
        if (Array.isArray(skillList) && skillList.length > 0) {
          skillCount += skillList.length;
        }
      }
    });
  } else if (typeof skills === 'object') {
    // Handle object format
    Object.keys(skills).forEach(key => {
      const skillList = skills[key];
      if (Array.isArray(skillList) && skillList.length > 0) {
        categories++;
        skillCount += skillList.length;
      }
    });
  }

  // Points for skill diversity
  if (categories >= 4) points += 5;
  else if (categories >= 3) points += 4;
  else if (categories >= 2) points += 3;
  else if (categories >= 1) points += 2;

  // Points for skill quantity
  if (skillCount >= 15) points += 5;
  else if (skillCount >= 10) points += 4;
  else if (skillCount >= 5) points += 3;
  else if (skillCount >= 1) points += 2;

  // Check for mix of hard and soft skills
  const hasTechnical = skillCount > 0; // Simplified check
  const hasSoftSkills = false; // Would need more sophisticated detection

  if (hasTechnical) {
    points += 3;
    if (!hasSoftSkills) {
      suggestions.push('Consider adding some soft skills like communication, leadership, or teamwork');
    }
  } else {
    feedback.push('No skills detected');
    suggestions.push('Add both technical skills (languages, tools) and soft skills');
  }

  // Cap at 15 points
  points = Math.min(points, 15);

  return { points, feedback, suggestions };
};

const checkFormatting = (resumeData) => {
  let points = 0;
  const feedback = [];
  const suggestions = [];

  if (!resumeData || typeof resumeData !== 'object') {
    feedback.push('Invalid resume data structure');
    suggestions.push('Please ensure your resume data is properly formatted');
    return { points, feedback, suggestions };
  }

  // Check for ATS-friendly template selection
  const selectedTemplate = resumeData.settings?.selectedTemplate || '';
  if (selectedTemplate === 'ats') {
    points += 5;
  } else {
    feedback.push('Not using ATS-optimized template');
    suggestions.push('Switch to the ATS-Friendly template for better parsing by applicant tracking systems');
  }

  // Check for unusual sections that might confuse ATS
  const unusualSections = ['hobbies', 'interests', 'references', 'picture', 'photo', 'image'];
  const hasUnusual = unusualSections.some(section => 
    resumeData[section] && 
    ((Array.isArray(resumeData[section]) && resumeData[section].length > 0) ||
     (typeof resumeData[section] === 'string' && resumeData[section].trim() !== ''))
  );

  if (hasUnusual) {
    feedback.push('Contains sections that may confuse ATS systems');
    suggestions.push('Consider removing hobbies, interests, references, or photos for ATS applications');
  } else {
    points += 3;
  }

  // Check for proper date formats
  const dateFields = ['education', 'experience', 'projects', 'certifications'];
  let dateIssues = 0;
  let totalDateFields = 0;

  dateFields.forEach(field => {
    const items = resumeData[field] || [];
    if (Array.isArray(items)) {
      items.forEach(item => {
        if (item && typeof item === 'object') {
          const { startDate, endDate, current } = item;
          totalDateFields++;
          // Simple date validation
          if ((!startDate || startDate.trim() === '') && !current) {
            dateIssues++;
          }
        }
      });
    }
  });

  if (totalDateFields > 0) {
    const dateScore = ((totalDateFields - dateIssues) / totalDateFields) * 2;
    points += dateScore;
    if (dateIssues > 0) {
      feedback.push('Some date fields are missing or improperly formatted');
      suggestions.push('Ensure all positions and education entries have start dates');
    }
  } else {
    points += 2; // No date fields to check
  }

  // Cap at 10 points
  points = Math.min(points, 10);

  return { points, feedback, suggestions };
};

export default { checkATSCompatibility };