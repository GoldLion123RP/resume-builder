import { v4 as uuidv4 } from 'uuid';

// Mock AI service for development
// In production, replace with actual OpenAI API call
export class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
    this.isMock = !this.apiKey;
  }

  /**
   * Generate suggestions for a given section
   * @param {string} sectionType - The type of section (e.g., 'experience', 'education', 'skills')
   * @param {string} currentContent - The current content in the section
   * @param {string} jobTitle - The job title the user is targeting (optional)
   * @returns {Promise<Object>} - Suggestions for the section
   */
  async generateSuggestions(sectionType, currentContent, jobTitle = '') {
    if (this.isMock) {
      // Return mock suggestions for development
      return this.getMockSuggestions(sectionType, currentContent, jobTitle);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are an expert resume writer. Provide concise, actionable suggestions to improve the ${sectionType} section of a resume. Focus on using strong action verbs, quantifiable achievements, and clear formatting.`
            },
            {
              role: 'user',
              content: `Job Title: ${jobTitle || 'Not specified'}\nCurrent ${sectionType} content:\n${currentContent}\n\nProvide 3-5 specific suggestions to improve this section. Each suggestion should be actionable and concise.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const data = await response.json();
      const suggestionsText = data.choices[0].message.content;
      
      // Parse the suggestions into an array
      const suggestions = this.parseSuggestions(suggestionsText);
      
      return {
        suggestions,
        generatedAt: new Date().toISOString(),
        source: 'openai'
      };
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
      // Fallback to mock suggestions on error
      return this.getMockSuggestions(sectionType, currentContent, jobTitle);
    }
  }

  /**
   * Get action verbs for a given category
   * @param {string} category - The category of action verbs (e.g., 'leadership', 'technical')
   * @returns {Array<string>} - List of action verbs
   */
  async getActionVerbs(category) {
    if (this.isMock) {
      return this.getMockActionVerbs(category);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that provides action verbs for resume writing.'
            },
            {
              role: 'user',
              content: `Provide 10-15 powerful action verbs for the ${category} category in resume bullet points. Return as a comma-separated list.`
            }
          ],
          temperature: 0.5,
          max_tokens: 100
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const data = await response.json();
      const verbsText = data.choices[0].message.content;
      return verbsText.split(',').map(v => v.trim()).filter(v => v.length > 0);
    } catch (error) {
      console.error('Error fetching action verbs:', error);
      return this.getMockActionVerbs(category);
    }
  }

  // Mock methods for development
  getMockSuggestions(sectionType, currentContent, jobTitle) {
    const mockSuggestions = {
      experience: [
        "Add quantifiable results to your bullet points (e.g., 'Increased sales by 20%', 'Reduced processing time by 15 hours/week')",
        "Start each bullet point with a strong action verb from our suggested list",
        "Include specific technologies or methodologies you used",
        "Highlight leadership or collaboration experiences",
        "Focus on achievements rather than just responsibilities"
      ],
      education: [
        "Include relevant coursework, projects, or thesis topics",
        "Add your GPA if it's above 3.5",
        "Mention academic honors, awards, or scholarships",
        "Include relevant extracurricular activities or leadership roles",
        "Add any certifications or online courses completed"
      ],
      skills: [
        "Group skills into categories (e.g., Programming Languages, Frameworks, Tools)",
        "Indicate proficiency levels (Beginner, Intermediate, Advanced)",
        "Remove outdated or irrelevant technologies",
        "Add soft skills that complement your technical abilities",
        "Include certifications or years of experience for key skills"
      ],
      projects: [
        "Describe the problem you solved and the impact of your solution",
        "Include specific technologies used and your role in the project",
        "Add metrics or results if available (users served, performance improvements)",
        "Mention any challenges overcome during the project",
        "Include a link to the live demo or source code repository"
      ],
      default: [
        "Review your content for clarity and conciseness",
        "Use strong action verbs to start each bullet point",
        "Quantify your achievements whenever possible",
        "Tailor your content to the specific job you're applying for",
        "Proofread for grammar and spelling errors"
      ]
    };

    const suggestions = mockSuggestions[sectionType] || mockSuggestions.default;
    
    // Personalize slightly based on job title if provided
    if (jobTitle) {
      suggestions[0] = `For a ${jobTitle} role, ${suggestions[0].toLowerCase()}`;
    }

    return {
      suggestions,
      generatedAt: new Date().toISOString(),
      source: 'mock'
    };
  }

  getMockActionVerbs(category) {
    const mockVerbs = {
      leadership: ['Led', 'Managed', 'Directed', 'Coordinated', 'Supervised', 'Mentored', 'Guided', 'Facilitated', 'Empowered', 'Inspired'],
      technical: ['Developed', 'Engineered', 'Programmed', 'Designed', 'Implemented', 'Configured', 'Optimized', 'Debugged', 'Integrated', 'Automated'],
      creative: ['Designed', 'Created', 'Conceptualized', 'Illustrated', 'Produced', 'Crafted', 'Innovated', 'Visualized', 'Branded', 'Styled'],
      communication: ['Presented', 'Communicated', 'Authored', 'Edited', 'Negotiated', 'Persuaded', 'Collaborated', 'Facilitated', 'Informed', 'Conveyed'],
      analytical: ['Analyzed', 'Evaluated', 'Assessed', 'Researched', 'Investigated', 'Examined', 'Interpreted', 'Modeled', 'Forecasted', 'Validated']
    };

    return mockVerbs[category] || mockVerbs.technical;
  }

  // Helper to parse suggestions from AI response
  parseSuggestions(text) {
    // Split by newline or numbered list
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Remove numbering or bullet points
    const cleaned = lines.map(line => 
      line.replace(/^[\d\.\-\•\*\s]+/, '').trim()
    ).filter(line => line.length > 0);
    
    return cleaned;
  }
}

// Create a singleton instance
const aiService = new AIService();
export default aiService;