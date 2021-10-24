import React from 'react'
import { Link } from "react-router-dom"
import { ShoppingCart, Search } from "react-feather"
import clsx from "clsx"

import Card from "./Card"

export default function Category({ title, imgSrc, link }) {
	return (
		<Link to={link}>
			<Card 
				imgSrc={imgSrc} 
				className={clsx(
					"!max-w-48 !max-h-sm sm:(!max-w-64)",
				)}>
				<div className={clsx(
	      	"absolute inset-0 text-white text-center",
	      	"flex justify-center items-center",
	      	"transition duration-500 ease-out",
	      	"group-hover:(bg-black/40)"
      	)}>
	      	<h3 className="text-2xl font-bold tracking-widest uppercase p-4 bg-black/30">{title}</h3>
	      </div>
			</Card>
		</Link>
	)
}