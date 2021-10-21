import React from 'react'
import {Link} from "react-router-dom"

export default function Navbar() {
	return (
		<div className="w-full flex justify-between items-center sticky top-0 py-2 px-4 bg-gray-200">
			<div>
				<form>
					<input type="text" placeholder="search" />
					<button type="submit">Search</button>
				</form>
			</div>
			<div>
				<Link to="/">
					<h3 className="text-medium text-2xl">BRAND</h3>
				</Link>
			</div>
			<div className="space-x-4">
				<Link to="/register">Register</Link>
				<Link to="/login">Login</Link>
			</div>
		</div>
	)
}