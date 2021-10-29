import React from 'react'

export default function PageHeader({ children, h2, h3, className }) {
	const commonClasses = `text-center font-light ${className}`

	if (h2) {
		return <h2 className={`text-3xl md:text-4xl ${commonClasses}`}>{children}</h2>
	}	
	if (h3) {
		return <h3 className={`text-2xl md:text-3xl ${commonClasses}`}>{children}</h3>
	}

	return <h1 className={`text-4xl md:text-5xl ${commonClasses}`}>{children}</h1>
}