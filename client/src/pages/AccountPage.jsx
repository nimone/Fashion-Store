import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import clsx from "clsx"
import { Edit2, User, Mail, Lock, ChevronRight, Package, ShoppingCart, LogOut } from "react-feather"

import { UserContext, CartContext } from '@/App'
import Container from "@/components/Container"
import Input from "@/components/Input"
import Button from "@/components/Button"
import api from '@/api'


export default function AccountPage() {
	const navigate = useNavigate()
	const {user, setUser} = useContext(UserContext)
	const {cartDispatch} = useContext(CartContext)
	const [showEditForm, setShowEditForm] = useState(false)

	const handleEdit = e => {
		e.preventDefault()
		console.log(user)
	}

	if (!user) {
		navigate("/login")
		return null
	}

	return (
		<main className="min-h-screen my-14">
			<Container heading="Your Account" type="page">
			<div className="grid grid-cols-1 md:(grid-cols-2)">
				<section className="flex flex-col items-center text-center space-y-2">
					<div className={clsx(
						"h-24 w-24 rounded-full overflow-hidden mb-4",
						"sm:(w-32 h-32)",
						"focus:(ring-4 ring-gray-300 outline-none)"
					)}>
		        <img className="object-cover" src={user.avatarSrc} alt="user avatar" />
		      </div>
		    {showEditForm ? (
	      	<form 
	      		className="flex flex-col gap-2 min-w-xs max-w-lg m-4"
	      		onSubmit={handleEdit}
	      	>
		      	<Input icon={<User />} type="text" value={user.fullName} placeholder="full name"/>
		      	<Input icon={<Mail />} type="email" value={user.email} disabled />
		      	<Input icon={<Lock />} type="password" placeholder="Current Password" />
		      	<Input icon={<Lock />} type="password" placeholder="New Password" />
		      	<Input icon={<Lock />} type="password" placeholder="Confirm New Password" />
		      	<div className="text-right mt-4">
			      	<Button secondary onClick={() => setShowEditForm(false)}>Cancel</Button>
			      	<Button type="submit">Update</Button>
		      	</div>
		      </form>
	      ) : (
		    	<div>
			      <div className="mb-2">
				      <h3 className="text-xl font-light">{user.fullname}</h3>
				      <span>{user.email}</span>
			      </div>
			      <Button secondary onClick={() => setShowEditForm(true)}>
			      	<Edit2 width={16} height={16} className="mr-2" />Edit
			      </Button>
		      </div>
		    )}
				</section>
				<section className="mx-4 my-8 sm:my-0">
					<ul className="my-4 max-w-md mx-auto">
						<AccountLink to="/orders">
							<Package className="mr-2" />My Orders
						</AccountLink>
						<AccountLink to="/cart">
							<ShoppingCart className="mr-2" />My Shopping Cart
						</AccountLink>
						<AccountLink to="mailto:contact@brand.com">
							<Mail className="mr-2" />Need Help? Contact Us
						</AccountLink>
						<AccountLink to="/" onClick={() => {
							api.logoutUser()
							setUser(null)
							cartDispatch({type: "RESET"})
						}}>
							<LogOut className="mr-2" />Log out from this Account
						</AccountLink>
					</ul>
				</section>
			</div>
			</Container>
		</main>
	)
}

function AccountLink({ children, ...props }) {
	return (
		<Link {...props}>
			<li className={clsx(
				"flex items-center",
				"px-3 py-2 my-2",
				"text-gray-800 bg-gray-100",
				"rounded border border-gray-300",
				"hover:(bg-gray-200)"
			)}>
				{children}
				<ChevronRight className="ml-auto" />
			</li>
		</Link>
	)
}