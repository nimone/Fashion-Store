import React, { useState } from 'react'
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Menu, Search, User, LogIn } from "react-feather"

import Button from "@/components/Button"
import Input from "@/components/Input"

export default function Navbar() {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<nav className={clsx(
			"w-full flex flex-col justify-between items-center",
			"sticky top-0 z-50 py-3 px-4",
			"bg-gray-200/80 border-b border-gray-300",
			"backdrop-filter backdrop-blur-lg",
			"md:(flex-row py-1)"
		)}>
			<div className="w-full flex justify-between md:mx-0">
				<Link to="/">
					<h3 className="text-medium text-2xl">BRAND</h3>
				</Link>
				<button className="md:hidden flex items-center focus:outline-none">
					<Menu onClick={() => setShowMenu(prev => !prev)} />
				</button>
			</div>

			<div className={clsx(
				"hidden",
				showMenu && "!flex flex-col mt-4",
				"md:(flex flex-row mt-0)"
			)}>
				<Input 
					icon={<Search />} 
					placeholder="Search..."
				/>
				<ul className={clsx(
					"flex flex-col items-center",
					"text-lg",
					showMenu && "mt-4",
					"md:(flex-row text-base mt-0)"
				)}>
					<li>
						<Link to="/register">
							<Button>
								<User width={20} height={20} className="mr-2" />Register
							</Button>
						</Link>
					</li>
					<li>
						<Link to="/login">
							<Button secondary>
								<LogIn width={20} height={20} className="mr-2" /> Login
							</Button>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}