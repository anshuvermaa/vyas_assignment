import React from 'react'
import {cn} from "../utils/utils"
function Button({handleClick,className,disabled=false,children}) {
  return (
    <button
              className={cn("px-4 py-2 bg-gray-500 text-white rounded", className)}
              onClick={handleClick}
              disabled={disabled}
            >
             {children}
            </button>
  )
}

export default Button