import React from 'react'

function Loader({ color }) {
	const loaderClass = `p-2 w-4 h-4 rounded-full animate-bounce ${color || "bg-white/20"}`

	return (
		<div className="flex space-x-2 p-1 justify-center items-center">
			<div 
				style={{animationDelay: "0.1s"}}
				className={loaderClass}></div>
			<div 
				style={{animationDelay: "0.2s"}}
				className={loaderClass}></div>
			<div 
				style={{animationDelay: "0.3s"}}
				className={loaderClass}></div>
		</div>
	)
}
export default Loader