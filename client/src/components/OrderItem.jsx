import React from 'react'

export default function OrderItem({ products, status, amount }) {
	return (
		<div className="flex flex-col justify-center m-2 p-2">
			<section className="flex justify-center items-center flex-wrap">
				{products.map(p => (
					<div 
						key={p._id} 
						className="max-w-24 sm:max-w-32 overflow-hidden m-1"
					><img className="object-cover" src={p.productID.image} />
					</div>
				))}
			</section>
			<section className="flex justify-between space-x-4">
				<div>
					<h3 className="text-lg font-medium mb-2">
						{products.map(p => p.productID.title).join(", ")}
					</h3>
					<div>
						<span className="font-bold mr-2">Status:</span>
						<span>{status}</span>
					</div>
				</div>
				<div>
					<span className="text-2xl">${amount}</span>
				</div>
			</section>
		</div>
	)
}