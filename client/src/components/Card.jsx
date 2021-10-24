import React from 'react'
import clsx from "clsx"

export default function Card({ imgSrc, children, className }) {
	return (
		<div className={clsx(
			"max-w-72 relative overflow-hidden group",
			"bg-white m-2",
			"shadow-md rounded-lg",
			"hover:shadow-lg",
			className,
		)}
		>
		  <img 
		  	className={clsx(
		  		"object-cover",
		  		"transition duration-500 ease-out transform",
		  		"group-hover:(scale-110)",
		  	)} 
		  	src={imgSrc} 
		  	alt="" 
		  />
	  	{children}
		</div>
	)
}