// Skeleton loaders for various components

// Simple skeleton with pulse animation
export const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700'
  
  const variantClasses = {
    rect: 'rounded',
    circle: 'rounded-full',
    text: 'rounded h-4'
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  )
}

// Resume preview skeleton
export const ResumePreviewSkeleton = () => {
  return (
    <div className="bg-white shadow-xl rounded overflow-hidden" style={{ width: '6in', minHeight: '8in' }}>
      {/* Header skeleton */}
      <div className="p-6 border-b border-gray-200">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-6">
        {/* Section 1 */}
        <div>
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        
        {/* Section 2 */}
        <div>
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
        </div>
        
        {/* Skills */}
        <div>
          <Skeleton className="h-5 w-24 mb-3" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-18 rounded-full" />
          </div>
        </div>
        
        {/* Education */}
        <div>
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  )
}

// Card skeleton
export const CardSkeleton = ({ lines = 3 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circle" className="w-10 h-10" />
        <div className="flex-1">
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-3 mb-2 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} 
        />
      ))}
    </div>
  )
}

// Form field skeleton
export const FormFieldSkeleton = ({ label = true }) => {
  return (
    <div className="space-y-2">
      {label && <Skeleton className="h-4 w-24" />}
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

// Section skeleton for stepper
export const SectionSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" className="w-12 h-12" />
        <div className="flex-1">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      
      <div className="ml-16 space-y-3">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
    </div>
  )
}

// Dashboard stats skeleton
export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <Skeleton className="h-8 w-12 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  )
}

// Template preview skeleton
export const TemplatePreviewSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <div className="p-3">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}

// Step indicator skeleton
export const StepIndicatorSkeleton = ({ steps = 5 }) => {
  return (
    <div className="flex items-center justify-between">
      {Array.from({ length: steps }).map((_, i) => (
        <div key={i} className="flex items-center">
          <Skeleton variant="circle" className="w-8 h-8" />
          {i < steps - 1 && (
            <Skeleton className="w-8 h-1 mx-2" />
          )}
        </div>
      ))}
    </div>
  )
}

// Export default
export default {
  Skeleton,
  ResumePreviewSkeleton,
  CardSkeleton,
  FormFieldSkeleton,
  SectionSkeleton,
  StatsSkeleton,
  TemplatePreviewSkeleton,
  StepIndicatorSkeleton
}
