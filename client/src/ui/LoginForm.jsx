import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Mail, Lock } from "react-feather"

import Input from "@/components/Input"
import Button from "@/components/Button"
import Alert from "@/components/Alert"

export default function LoginForm({ onSubmit }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit({email, password})
	}

	return (
		<form
			className="flex items-center flex-col space-y-2"
			onSubmit={handleSubmit}
		>
			<Input 
				value={email}
				onChange={e => setEmail(e.target.value)}
				icon={<Mail width={20} height={20} />}
				type="email" placeholder="Email" required />
			<Input 
				value={password}
				icon={<Lock width={20} height={20} />}
				onChange={e => setPassword(e.target.value)}
				type="password" placeholder="Password" required />

			{error && <Alert heading="Error!" body={error} danger />}

			<Button 
				className="w-full !mt- !text-base !rounded-full" 
				type="submit"
			>Login</Button>
				
			<Link to="/register">
				<Button link>
					Create an account
				</Button>
			</Link>
		</form>
	)
}