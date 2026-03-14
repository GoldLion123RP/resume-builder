import { useState } from 'react';
import useResume from '@/hooks/useResume';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/useDebounce';

const JDMatchAnalyzer = () => {
  const { resumeData, updateSettings } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [debouncedJD] = useDebounce(jobDescription, 1000);

  // Initialize job description from resume data if available
  const initializeJD = () => {
    if (resumeData?.jobDescription?.text) {
      setJobDescription(resumeData.jobDescription.text);
    }
  };

  // Run analysis when job description changes
  // In a real implementation, this would call an API or use AI service
  const analyzeMatch = async () => {
    if (!debouncedJD.trim()) {
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock analysis results - in production, this would use AI service
    const mockAnalysis = {
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      matchedKeywords: [
        'JavaScript', 'React', 'Node.js', 'MongoDB', 'REST API',
        'Git', 'Agile', 'Problem Solving', 'Team Leadership'
      ],
      missingKeywords: [
        'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'TypeScript',
        'GraphQL', 'Redis', 'Elasticsearch'
      ],
      suggestions: [
        'Consider adding more specific technologies mentioned in the job description',
        'Highlight your experience with cloud platforms like AWS or Azure',
        'Include metrics to quantify your achievements (e.g., improved performance by 20%)',
        'Add relevant certifications that match the job requirements',
        'Emphasize your experience with the specific frameworks mentioned'
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    
    // Save job description to resume data
    updateSettings({
      jobDescription: {
        text: debouncedJD,
        analyzedAt: new Date().toISOString()
      }
    });
  };

  // Handle analyze button click
  const handleAnalyze = () => {
    analyzeMatch();
  };

  // Handle clear button click
  const handleClear = () => {
    setJobDescription('');
    setAnalysis(null);
    updateSettings({ jobDescription: null });
  };

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Job Description Match Analyzer</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Paste a job description to see how well your resume matches and get suggestions for improvement
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Job Description Input */}
        <div className="space-y-3">
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!jobDescription.trim() && !analysis}
            >
              Clear
            </Button>
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription.trim()}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Analyze Match</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Separator */}
        <Separator className="my-4" />
        
        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Match Score: {analysis.score}%
              </h3>
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  analysis.score >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  analysis.score >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {analysis.score >= 80 ? 'Excellent' : analysis.score >= 60 ? 'Good' : 'Needs Improvement'}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className={(analysis.score >= 80 ? 'bg-green-500' : analysis.score >= 60 ? 'bg-yellow-500' : 'bg-red-500') + ' h-full transition-all duration-500'}
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
            
            {/* Matched Keywords */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 00-1.947 1.947M13.663 12.303a3.42 3.42 0 001.947 1.947M5 12a7 7 0 1014 0M5 12a7 7 0 1114 0" />
                </svg>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Matched Keywords</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {analysis.matchedKeywords.length > 0 ? 
                      analysis.matchedKeywords.join(', ') : 
                      'No significant matches found'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Missing Keywords */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Missing Keywords</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {analysis.missingKeywords.length > 0 ? 
                      analysis.missingKeywords.join(', ') : 
                      'All key terms present!'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Suggestions */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Improvement Suggestions</p>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0">• </span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Placeholder when no analysis */}
        {!analysis && jobDescription.trim() && !isAnalyzing && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Click "Analyze Match" to see how your resume compares to this job description
            </p>
          </div>
        )}
        
        {/* Empty state */}
        {!analysis && !jobDescription.trim() && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Paste a job description above to begin analysis
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JDMatchAnalyzer;