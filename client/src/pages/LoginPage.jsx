import React, { useContext, useEffect } from 'react'
import { sliderItems } from '@/dummydata'

import { UserContext } from '@/App'
import LoginForm from "@/ui/LoginForm"
import api from '@/api'
import { useHistory } from 'react-router-dom'

export default function LoginPage() {
	const {setUser} = useContext(UserContext)
	const history = useHistory()

	const handleLogin = async userData => {
		console.log(userData)
		const resp = await api.loginUser(userData)
		console.log(resp)
		if (resp.status == "ok") {
			setUser(api.getUser())
			history.push("/account")
		}
		return resp
	}
	const randomSlide = sliderItems[Math.floor(Math.random() * sliderItems.length)]

	return (
		<main 
			className="flex justify-center h-screen items-center bg-cover bg-center sm:bg-left"
			style={{backgroundImage: `url(${randomSlide.image})`}}
		>
			<div className="min-w-sm p-6 rounded-lg bg-white filter drop-shadow-2xl">
				<h3 className="text-2xl font-bold text-center mb-6">Login to your account</h3>
				<LoginForm onSubmit={handleLogin} />
			</div>
		</main>
	)
}