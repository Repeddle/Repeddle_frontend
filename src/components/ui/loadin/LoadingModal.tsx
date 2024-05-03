import React from "react"

const LoadingModal: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-[5px] border-primary "></div>
    </div>
  )
}

export default LoadingModal
