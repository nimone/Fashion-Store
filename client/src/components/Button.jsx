import React from 'react'
import clsx from "clsx"

export default function Button({ className, children, link, secondary, light, ...props}) {
	return (
    <button 
      className={clsx(
        "inline-flex items-center justify-center px-5 py-2.5 m-1",
        "bg-gray-800 text-white text-sm font-medium",
        "rounded-md shadow",
        "transition duration-200",
        "hover:(bg-gray-900 shadow-md)",
        "focus:(ring-4 ring-gray-300)",
        "focus:outline-none",
        (secondary || link) && "!bg-transparent !shadow-none",
        link && "!text-blue-800 hover:!text-blue-900",
        (secondary || light) && "!text-gray-800",
        light && "!bg-white !hover:bg-gray-200",
        props.disabled && "opacity-75 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>

	)
}