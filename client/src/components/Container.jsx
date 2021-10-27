import React from 'react'

export default function Container({ heading, children }) {
	return (
		<section className="my-14 container mx-auto">
			<h2 className="text-3xl font-medium mb-6 mx-4">{heading}</h2>
			{children}
		</section>
	)
}