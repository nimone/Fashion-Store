import React from 'react'

import LoginForm from "@/ui/LoginForm"

export default function LoginPage() {
	const handleLogin = userData => {
		console.log(userData)
	}
	
	return (
		<main className="flex justify-center h-screen items-center bg-gray-300">
			<div className="min-w-sm p-6 rounded-lg bg-white">
				<h3 className="text-2xl font-bold text-center mb-6">Login to your account</h3>
				<LoginForm onSubmit={handleLogin} />
			</div>
		</main>
	)
}