import React, { useState } from 'react'
import { Link } from "react-router-dom"

export default function RegisterPage() {
	const [fullname, setFullname] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState(null)

	const handleRegister = e => {
		e.preventDefault()
		if (password.length < 6) {
			setError("password must be atleast 6 characters")
			return
		}
		if (password !== confirmPassword) {
			setError("passwords don't match")
			return
		}
		console.log(fullname, email, password, confirmPassword)
	}

	return (
		<main className="flex justify-center h-screen items-center bg-gray-300">
			<div className="p-6 rounded-lg bg-white">
				<form 
					onSubmit={handleRegister}
					className="flex items-center flex-col space-y-4"
					>
					<input 
						value={fullname}
						onChange={e => setFullname(e.target.value)}
						type="text" placeholder="full name" required />
					<input 						
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="email" placeholder="email" required />
					<input 
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password" placeholder="password" required />
					<input
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)} 
					type="password" placeholder="confirm password" required />
					
					<span className="text-red-400">{error}</span>

					<button type="submit">Register</button>
					<Link to="/login">
						<span className="text-blue-500">
							Already have an account?
						</span>
					</Link>
				</form>
			</div>
		</main>
	)
}