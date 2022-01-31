import React from 'react'

import Product from "@/components/Product"

export default function ProductList({ products }) {
	return (
		<div className="flex flex-wrap justify-center">
			{products.map(product => (
				<Product
					key={product._id}
					imgSrc={product.image}
					price={product.price}
					link={`/products/${product._id}`}
				/>					
			))}
		</div>
	)
}