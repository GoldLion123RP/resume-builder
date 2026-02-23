const PreviewSection = ({ title, icon, children, show = true }) => {
  if (!show) return null

  return (
    <div className="mb-4">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-2 border-b-2 border-gray-800 dark:border-gray-200 pb-1">
        {icon && <span className="text-sm print:hidden">{icon}</span>}
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </div>
      
      {/* Section Content */}
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  )
}

export default PreviewSection