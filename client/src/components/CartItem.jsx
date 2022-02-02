import React from 'react'
import { Plus, Minus, Trash, X } from "react-feather"

export default function CartItem({ imgSrc, name, price, quantity, setQuantity }) {
	return (
		<div className="flex flex-wrap items-center m-2 p-2">
			<section className="max-w-28 md:max-w-40 overflow-hidden mr-2">
				<img className="object-cover" src={imgSrc} />
			</section>
			<section className="flex-1 flex flex-col">
				<div className="">
					<h3 className="text-lg font-medium">{name}</h3>
				</div>
				<div className="flex justify-between">
					<div className="flex flex-col space-y-2 mr-2 py-2">
						<div className="flex items-center">
							<span className="font-bold mr-2">Price:</span> 
							<span className="text-lg">${price}</span>
						</div>
						<div className="flex">
							<span className="font-bold mr-2">Color:</span> 
							<div className="h-6 w-6 bg-gray-400 rounded-full" />
						</div>
						<div>
							<span className="font-bold mr-2">Size:</span>
							<span>M</span>
						</div>
					</div>
					<div className="flex justify-between flex-col items-end ml-auto space-y-2">
						<div>
							<span className="text-2xl font-light">${quantity * price}</span>
						</div>
						<div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
							{quantity > 1 ? (
								<Minus className="cursor-pointer" onClick={() => setQuantity(quantity - 1)} />
							) : (
								<Trash className="cursor-pointer" onClick={() => setQuantity(quantity - 1)} />
							)}
							<span className="text-xl px-1">{quantity}</span>
							<Plus className="cursor-pointer" onClick={() => setQuantity(quantity + 1)} />
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}