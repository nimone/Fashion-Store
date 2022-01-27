import React from 'react'

function Loader() {
	return (
		<div className="flex space-x-2 p-1 justify-center items-center">
			<div 
				style={{animationDelay: "0.1s"}}
				className="bg-white/20 p-2 w-4 h-4 rounded-full animate-bounce"></div>
			<div 
				style={{animationDelay: "0.2s"}}
				className="bg-white/20 p-2 w-4 h-4 rounded-full animate-bounce"></div>
			<div 
				style={{animationDelay: "0.3s"}}
				className="bg-white/20 p-2 w-4 h-4 rounded-full animate-bounce"></div>
		</div>
	)
}
export default Loader