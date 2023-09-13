import React from 'react'

const GlassmorphicWrapper = ({className = 'px-4 py-4', glassmorphic = true, ...children}) => {
  return (
    <div className={`relative rounded-xl h-[300px] w-[300px]
    ${glassmorphic ? `backdrop-filter backdrop-blur-xl bg-opacity-50` : null}
    ${className}`}>
     
          {/* <div className='absolute top-0 left-0 bg-gradient-to-br dark:from-white/60 dark:to-gray-500/25 from-black/60 to-transparent w-full h-full opacity-30 z-0'/> */}
            
      <div className='relative'> {/* This relative element will put everything inside above the absolute element */}
        <div {...children} />
      </div>
    </div>
  )
}

export default GlassmorphicWrapper