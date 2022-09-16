import React from 'react'
import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, GitHub, Globe } from "react-feather"

export default function Footer() {
	return (
		<footer className="grid grid-cols-1 md:(grid-cols-3) border-t border-gray-300 bg-gray-200 px-4">
			<div className="m-4 sm:m-6 flex-1">
				<h2 className="text-4xl text-center md:text-left mb-4">BRAND</h2>
				<p className="text-justify text-gray-700">Eiusmod duis reprehenderit quis cillum nisi anim consectetur occaecat cupidatat anim incididunt aliqua eiusmod ad consectetur in ut cupidatat proident dolore aute irure enim in in ut adipisicing in do est.</p>
				<ul className="flex mt-6 justify-center md:justify-start space-x-4">
					<li>
						<Link to="#"><Facebook /></Link>
					</li>				
					<li>
						<Link to="#"><Instagram /></Link>
					</li>				
					<li>
						<Link to="#"><Twitter /></Link>
					</li>
					<li>
						<a href="https://github.com/nimone/Fashion-Store"><GitHub /></a>
					</li>
					<li>
						<a href="https://nimo.pages.dev"><Globe /></a>
					</li>
				</ul>
			</div>			
			<div className="m-4 sm:m-6">
				<h2 className="text-xl text-center md:text-left font-medium mb-4">Useful Links</h2>
				<ul className="flex flex-col flex-wrap h-36 space-y-1 text-gray-600">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/cart">Cart</Link>
					</li>
					<li>
						<Link to="/products?category=men">Men Fashion</Link>
					</li>
					<li>
						<Link to="/products?category=women">Women Fashion</Link>
					</li>
					<li>
						<Link to="/orders">Track Order</Link>
					</li>
					<li>
						<Link to="/account">My Account</Link>
					</li>							
					<li>
						<Link to="/wishlist">Wishlist</Link>
					</li>					
					<li>
						<Link to="/terms">Terms</Link>
					</li>
				</ul>
			</div>			
			<div className="m-4 sm:m-6">
				<h2 className="text-xl text-center md:text-left font-medium mb-4">Contact</h2>
				<ul className="space-y-3 text-gray-700">
					<li className="flex items-center">
						<MapPin className="w-5 h-5 mr-2" />
						<span>221b Baker St, London NW1 6XE, UK</span>
					</li>					
					<li className="flex items-center">
						<Phone className="w-5 h-5 mr-2" />
						<span>+1234-567-890</span>
					</li>					
					<li className="flex items-center">
						<Mail className="w-5 h-5 mr-2" />
						<a href="mailto:nimogha@gmail.com" target="_blank">
							nimogha@gmail.com
						</a>
					</li>
					<li className="flex items-center">
						<GitHub className="w-5 h-5 mr-2" />
						<a href="https://github.com/nimone/Fashion-Store" target="_blank">
							/Fashion-Store
						</a>
						<span className='mx-1'>built by</span>
						<a href="https://nimo.pages.dev" target="_blank" className='border-b-2 border-green-500'>
							nimo
						</a>
					</li>
				</ul>
				<div className="mt-6">
					<img className="mx-auto md:mx-0" src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payment providers" />
				</div>
			</div>
		</footer>
	)
}