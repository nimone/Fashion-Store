import React from 'react'

import RegisterForm from "@/ui/RegisterForm"

export default function RegisterPage() {
	const handleRegister = userData => {
		console.log(userData)
	}

	return (
		<main className="flex justify-center h-screen items-center bg-gray-300">
			<div className="min-w-sm p-6 rounded-lg bg-white">
				<h3 className="text-2xl font-bold text-center mb-6">Create a new account</h3>
				<RegisterForm onSubmit={handleRegister}/>
			</div>
		</main>
	)
}