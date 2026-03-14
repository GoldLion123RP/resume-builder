import { useState } from 'react';
import useResume from '@/hooks/useResume';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define section order and display names
const SECTION_ORDER = [
  { id: 'profile', name: 'Profile', icon: '👤' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'experience', name: 'Experience', icon: '💼' },
  { id: 'projects', name: 'Projects', icon: '🚀' },
  { id: 'skills', name: 'Skills', icon: '🛠️' },
  { id: 'certifications', name: 'Certifications', icon: '📜' },
  { id: 'achievements', name: 'Achievements', icon: '🏆' },
  { id: 'por', name: 'Positions of Responsibility', icon: '👔' },
  { id: 'publications', name: 'Publications', icon: '📚' },
  { id: 'extracurricular', name: 'Extracurricular', icon: '⚽' },
  { id: 'languages', name: 'Languages', icon: '🌐' }
];

const SectionReorderer = () => {
  const { resumeData, updateSettings } = useResume();
  const [sectionOrder, setSectionOrder] = useState(() => {
    // Load from resume data settings or use default
    const customOrder = resumeData?.settings?.sectionOrder;
    return customOrder || SECTION_ORDER.map(section => section.id);
  });
  const [isDragging, setIsDragging] = useState(false);

  // Handle section order change
  const handleSectionOrderChange = (newOrder) => {
    setSectionOrder(newOrder);
    updateSettings({ sectionOrder: newOrder });
  };

  // Render drag handle
  const DragHandle = () => (
    <div className="w-3 h-3 mx-1 text-gray-400">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10h14" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 14h14" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 18h14" />
      </svg>
    </div>
  );

  // Render section item
  const SectionItem = ({ section, index, isDraggingOver }) => {
    const sectionInfo = SECTION_ORDER.find(s => s.id === section) || { id: section, name: section, icon: '📄' };
    const hasData = resumeData && 
      ((Array.isArray(resumeData[section]) && resumeData[section].length > 0) ||
       (section === 'profile' && resumeData.profile?.fullName) ||
       (section === 'skills' && Object.values(resumeData.skills || {}).some(skills => skills.length > 0)) ||
       (section !== 'profile' && section !== 'skills' && resumeData[section] && resumeData[section].length > 0));

    // Check visibility (default to true if not set)
    const sectionVisibility = resumeData?.settings?.sectionVisibility || {};
    const isVisible = sectionVisibility[section] !== false; // Default to visible

    return (
      <div 
        key={section} 
        className={`flex items-center p-3 rounded-lg border transition-all cursor-grab ${isDraggingOver ? 'border-primary-500 bg-primary-50' : 'border-gray-200 dark:border-gray-700'} ${!hasData ? 'opacity-50' : ''} ${!isVisible ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
        data-section={section}
      >
        <DragHandle />
        <div className="flex items-center gap-3 flex-1">
          <div className="text-gray-500 dark:text-gray-400">{sectionInfo.icon}</div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{sectionInfo.name}</p>
            {!hasData && <p className="text-xs text-gray-500 dark:text-gray-400">(No data)</p>}
          </div>
        </div>
        {/* Visibility Toggle Button */}
        <button 
          className={`p-2 rounded-lg transition-colors ${isVisible ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-300'}`}
          onClick={() => {
            updateSettings({ 
              sectionVisibility: {
                ...sectionVisibility,
                [section]: !isVisible
              }
            });
          }}
          title={isVisible ? 'Hide section from resume' : 'Show section in resume'}
        >
          {isVisible ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          )}
        </button>
      </div>
    );
  };

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Section Order & Visibility</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drag sections to reorder them in your resume. Toggle visibility to show/hide sections.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Instructions */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>💡 Tip: Sections with no data will appear lighter and can still be reordered.</p>
        </div>
        
        {/* Section List */}
        <div 
          id="section-list"
          className="space-y-2 min-h-[200px]"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={() => setIsDragging(false)}
        >
          {sectionOrder.map((section, index) => {
            const sectionInfo = SECTION_ORDER.find(s => s.id === section) || { id: section, name: section, icon: '📄' };
            const hasData = resumeData && 
              ((Array.isArray(resumeData[section]) && resumeData[section].length > 0) ||
               (section === 'profile' && resumeData.profile?.fullName) ||
               (section === 'skills' && Object.values(resumeData.skills || {}).some(skills => skills.length > 0)) ||
               (section !== 'profile' && section !== 'skills' && resumeData[section] && resumeData[section].length > 0));
            
            return (
              <div
                key={section}
                draggable
                className="transition-all"
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', section);
                  setIsDragging(true);
                }}
                onDragEnd={() => setIsDragging(false)}
                onDragOver={(e) => {
                  e.preventDefault();
                  const draggingSection = e.dataTransfer.getData('text/plain');
                  if (draggingSection && draggingSection !== section) {
                    const draggingIndex = sectionOrder.indexOf(draggingSection);
                    const newOrder = [...sectionOrder];
                    newOrder.splice(draggingIndex, 1);
                    newOrder.splice(index, 0, draggingSection);
                    setSectionOrder(newOrder);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppingSection = e.dataTransfer.getData('text/plain');
                  if (droppingSection && droppingSection !== section) {
                    const droppingIndex = sectionOrder.indexOf(droppingSection);
                    const newOrder = [...sectionOrder];
                    newOrder.splice(droppingIndex, 1);
                    newOrder.splice(index, 0, droppingSection);
                    setSectionOrder(newOrder);
                    handleSectionOrderChange(newOrder);
                  }
                }}
              >
                <SectionItem 
                  section={section} 
                  index={index} 
                  isDraggingOver={false} 
                />
              </div>
            );
          })}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // Reset to default order
              setSectionOrder(SECTION_ORDER.map(section => section.id));
              updateSettings({ sectionOrder: SECTION_ORDER.map(section => section.id) });
            }}
          >
            Reset Order
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => {
              // Show success message
              alert('Section order saved! Your resume preview will update accordingly.');
            }}
          >
            Save Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionReorderer;