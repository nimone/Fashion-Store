import React from 'react'

export default function PageHeader({ children }) {
	return (
		<h1 className="text-center font-light text-4xl md:text-5xl">
			{children}
		</h1>
	)
}