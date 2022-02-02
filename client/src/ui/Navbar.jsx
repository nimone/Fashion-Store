import React, { useContext, useState } from 'react'
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Menu, Search, User, LogIn, X, ShoppingCart } from "react-feather"

import { UserContext, CartContext } from '@/App'
import Button from "@/components/Button"
import Input from "@/components/Input"
import UserDropDown from '@/components/UserDropDown'
import api from "@/api"
import useClickOutside from '@/hooks/useClickOutside'

export default function Navbar() {
	const {user, setUser} = useContext(UserContext)
	const {cart, cartDispatch} = useContext(CartContext)
	const [showMenu, setShowMenu] = useState(false)
	const navbarRef = useClickOutside(() => setShowMenu(false))

	return (
		<nav className={clsx(
			"w-full flex flex-wrap justify-between items-center",
			"sticky top-0 z-40 py-3 px-4",
			"bg-gray-200/90 border-b border-gray-300",
			"backdrop-filter backdrop-blur-lg shadow-sm",
			"md:(py-1)"
		)} ref={navbarRef}>
			<div className="flex justify-between items-center md:mx-0">
				<Link to="/">
					<h3 className="text-medium text-2xl">BRAND</h3>
				</Link>
			</div>

			<div className="flex items-center ml-2 space-x-4 md:order-2">
				<Link to="/cart" className="relative flex items-center pr-2">
					<ShoppingCart width={24} height={24} />
					{cart.products.length ?
						<div className='absolute flex justify-center items-center w-4 h-4 bg-red-500 text-white rounded-full top-0 right-0 text-xs'>
							{cart.products.length}
						</div>
						: null
					}
				</Link>
				{user && 
					<UserDropDown 
						user={user} 
						onLogout={() => {
							api.logoutUser()
							setUser(null)
							cartDispatch({type: "RESET"})
						}} 
					/>
				}
				<button className="md:hidden flex items-center focus:outline-none">
					{showMenu 
						? <X width={24} height={24} onClick={() => setShowMenu(false)} />
						:	<Menu width={24} height={24} onClick={() => setShowMenu(true)} />
					}
				</button>
			</div>

			<div className={clsx(
				"hidden w-full",
				showMenu && "!flex flex-col mt-8",
				"md:(flex flex-row mt-0 ml-auto order-1 w-auto)"
			)}>
				<ul className={clsx(
					"flex flex-col items-center order-2",
					"mt-8 mb-2 text-xl space-y-1 divide-y-2 divide-gray-200",
					"md:(flex-row text-base m-0 space-y-0 divide-y-0 divide-x)"
				)} onClick={() => setShowMenu(false)}>
					<NavLink to="/products?category=men">Men</NavLink>
					<NavLink to="/products?category=women">Women</NavLink>
					<NavLink to="/products">All Products</NavLink>
				</ul>
				<div className="flex items-center order-1 md:order-2">
					<Input 
						className="md:max-w-min bg-opacity-40" 
						icon={<Search />} 
						placeholder="Search..." 
					/>
				</div>
			{!user && (
				<ul className={clsx(
					"flex flex-col order-3",
					showMenu && "mt-4",
					"md:(flex-row text-base mt-0 space-x-2)"
				)}>
					<li>
						<Link to="/login">
							<Button secondary className="w-full md:w-auto">
								<LogIn width={20} height={20} className="mr-2" />Login
							</Button>
						</Link>
					</li>
					<li>
						<Link to="/register">
							<Button className="w-full md:w-auto">
								<User width={20} height={20} className="mr-2" />Register
							</Button>
						</Link>
					</li>
				</ul>
			)}
			</div>
		</nav>
	)
}

function NavLink({ children, to }) {
	return (
		<li className="hover:text-gray-800 text-gray-700 block px-4 py-2 truncate">
			<Link to={to}>{children}</Link>
		</li>
	)
}