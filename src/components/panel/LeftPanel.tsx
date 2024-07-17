import React from 'react'
import HomeIcon from '../icons/HomeIcon'

const LeftPanel = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <HomeIcon className="size-5" />
        <span>Home</span>
      </div>
    </div>
  )
}

export default LeftPanel
