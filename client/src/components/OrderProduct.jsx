import React from 'react'
import { X } from "react-feather"

export default function OrderProduct({ imgSrc, name, price, quantity }) {
	return (
		<div className="flex flex-col justify-between p-2 max-w-40 max-h-64 md:max-w-48 border border-gray-300 rounded">
			<div className="overflow-hidden">
				<img className="object-cover" src={imgSrc} />
			</div>
			<p className="font-medium m-2">{name}</p>
			<div className="flex justify-between text-lg">
				<span>${price}</span>
				<span className="flex items-center">
					<X width={18} height={18} />{quantity}
				</span>
			</div>
		</div>
	)
}