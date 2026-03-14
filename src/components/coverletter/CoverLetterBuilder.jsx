import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useResume } from '@/hooks/useResume';

const CoverLetterBuilder = () => {
  const { resumeData, updateProfile } = useResume();
  const profile = resumeData?.profile || {};

  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [hiringManager, setHiringManager] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  // Generate cover letter based on profile and inputs
  const generateCoverLetter = () => {
    if (!companyName || !position) {
      alert('Please fill in company name and position');
      return;
    }

    const date = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const generatedLetter = `${date}

${hiringManager || 'Hiring Manager'}
${companyName}
${companyName} Address Line
${companyName} City, State ZIP

Dear ${hiringManager || 'Hiring Manager'},

I am writing to express my enthusiastic interest in the ${position} position at ${companyName}. With my background in ${profile.field || 'my field'} and experience in ${profile.degree || 'my area of expertise'}, I am confident in my ability to contribute effectively to your team.

${profile.objective || 'Throughout my career, I have developed strong skills in problem-solving, communication, and technical execution that align well with the requirements of this role.'}

In my previous experiences, I have:
- Developed and implemented solutions that improved efficiency and productivity
- Collaborated with cross-functional teams to achieve project goals
- Continuously learned and adapted to new technologies and methodologies

I am particularly drawn to ${companyName} because of its reputation for innovation and excellence in the industry. I believe my skills in ${profile.skills || 'relevant areas'} would be valuable assets to your team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and enthusiasm can contribute to the success of ${companyName}.

Sincerely,
${profile.fullName || 'Your Name'}
`;

    setCoverLetter(generatedLetter);
  };

  // Clear form
  const clearForm = () => {
    setCompanyName('');
    setPosition('');
    setHiringManager('');
    setCoverLetter('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📝 Cover Letter Builder
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create a professional cover letter to accompany your resume
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
          <Input
            id="companyName"
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        {/* Position */}
        <div>
          <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
          <Input
            id="position"
            type="text"
            placeholder="Enter job position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        {/* Hiring Manager (Optional) */}
        <div>
          <Label htmlFor="hiringManager">Hiring Manager Name (Optional)</Label>
          <Input
            id="hiringManager"
            type="text"
            placeholder="Enter hiring manager name"
            value={hiringManager}
            onChange={(e) => setHiringManager(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={clearForm}>
          Clear
        </Button>
        <Button onClick={generateCoverLetter}>
          Generate Cover Letter
        </Button>
      </div>

      {/* Cover Letter Preview */}
      {coverLetter && (
        <Card className="border-primary-300 dark:border-primary-700 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Generated Cover Letter</CardTitle>
            <CardDescription>
              Your personalized cover letter is ready below
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="whitespace-pre-line bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              {coverLetter}
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(coverLetter);
                  alert('Cover letter copied to clipboard!');
                }}
              >
                Copy to Clipboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoverLetterBuilder;