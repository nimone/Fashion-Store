import React from 'react'
import { sliderItems } from '@/dummydata'

import RegisterForm from "@/ui/RegisterForm"

export default function RegisterPage() {
	const handleRegister = userData => {
		console.log(userData)
	}

	const randomSlide = sliderItems[Math.floor(Math.random() * sliderItems.length)]

	return (
		<main 
			className="flex justify-center h-screen items-center bg-cover bg-center sm:bg-left"
			style={{backgroundImage: `url(${randomSlide.image})`}}
		>
			<div className="min-w-sm p-6 rounded-lg bg-white filter drop-shadow-2xl">
				<h3 className="text-2xl font-bold text-center mb-6">Create a new account</h3>
				<RegisterForm onSubmit={handleRegister}/>
			</div>
		</main>
	)
}