import React from 'react'

import Product from "@/components/Product"

export default function ProductList({ products }) {
	return (
		<div className="flex flex-wrap justify-center items-center">
			{products.map(product => (
				<Product
					key={product.id}
					imgSrc={product.image}
					price={20}
					link="#"
				/>					
			))}
		</div>
	)
}