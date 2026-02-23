import { Suspense } from 'react'

// Default loading spinner
const DefaultLoader = () => (
  <div className="flex items-center justify-center min-h-[200px] p-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500 mx-auto mb-3"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  </div>
)

// Skeleton loader for sections
const SectionSkeleton = () => (
  <div className="animate-pulse space-y-4 p-6">
    {/* Header skeleton */}
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    
    {/* Content skeleton */}
    <div className="space-y-3 mt-6">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    
    {/* Button skeleton */}
    <div className="flex gap-3 mt-6">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
    </div>
  </div>
)

// Card skeleton loader
const CardSkeleton = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2 mt-4">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  </div>
)

// Preview skeleton loader
const PreviewSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {/* Template selector skeleton */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-36"></div>
      </div>
    </div>
    
    {/* Preview area skeleton */}
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
      <div className="bg-white dark:bg-gray-800 rounded shadow-lg mx-auto" style={{ width: '100%', maxWidth: '600px', height: '800px' }}>
        <div className="p-8 space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
          <div className="mt-8 space-y-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Export skeleton loader
const ExportSkeleton = () => (
  <div className="animate-pulse space-y-6">
    {/* Header skeleton */}
    <div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-80"></div>
    </div>
    
    {/* Export cards skeleton */}
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  </div>
)

// LazyLoad wrapper component
const LazyLoad = ({ 
  children, 
  fallback = <DefaultLoader />,
  type = 'default' 
}) => {
  // Select appropriate skeleton based on type
  const getFallback = () => {
    switch (type) {
      case 'section':
        return <SectionSkeleton />
      case 'card':
        return <CardSkeleton />
      case 'preview':
        return <PreviewSkeleton />
      case 'export':
        return <ExportSkeleton />
      default:
        return fallback
    }
  }

  return (
    <Suspense fallback={getFallback()}>
      {children}
    </Suspense>
  )
}

// Export all components
export { 
  LazyLoad, 
  DefaultLoader, 
  SectionSkeleton, 
  CardSkeleton, 
  PreviewSkeleton,
  ExportSkeleton 
}

export default LazyLoad