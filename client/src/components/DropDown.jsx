import React from 'react'

export default function DropDown({ children, className, ...props }) {
	return (
		<div 
			className={`absolute top-10 right-4 bg-white text-sm z-50 list-none divide-y divide-gray-100 rounded shadow my-4 ${className}`}
			{...props}
		>
			{children}
		</div>
	)

}
export function Select({ children, className, ...props }) {
	return (
		<ul 
			className={`py-1 ${className}`}
			{...props}
		>
			{children}
		</ul>
	)
}

export function Option({ children, className, ...props }) {
	return (
		<li 
			className={`hover:bg-gray-100 text-gray-700 block px-4 py-2 ${className}`}
			{...props}
		>
			{children}
		</li>
	)
}