import React, { useState } from 'react'
import { Link } from "react-router-dom"

export default function LoginPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = e => {
		e.preventDefault()
		console.log(email, password)
	}
	return (
		<main className="flex justify-center h-screen items-center bg-gray-300">
			<div className="p-6 rounded-lg bg-white">
				<form 
					onSubmit={handleLogin}
					className="flex items-center flex-col space-y-4"
				>
					<input 
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="email" placeholder="email" required />
					<input 
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password" placeholder="password" required />
					<button type="submit">Login</button>
					<Link to="/register">
						<span className="text-blue-500">
							Create an account
						</span>
					</Link>
				</form>
			</div>
		</main>
	)
}