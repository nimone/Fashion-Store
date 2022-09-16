import React from 'react'
import clsx from "clsx"

export default function Alert({ heading, body, info, success, danger, warning }) {
	return (
		<div 
			className={clsx(
				"rounded-lg px-4 py-3 mb-4 text-sm",
				info && "text-blue-700 bg-blue-100",
				danger && "text-red-700 bg-red-100",
				success && "text-green-700 bg-green-100",
				warning && "text-yellow-700 bg-yellow-100",
			)}
			role="alert"
		>
		  <span className="font-medium">{heading}</span> {body}
		</div>
	)
}