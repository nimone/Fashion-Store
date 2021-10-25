import React, { useState } from 'react'
import { popularProducts } from '@/dummydata'

import ProductList from "@/ui/ProductList"

export default function ProductsPage() {
	const [products, setProducts] = useState([...popularProducts])
	
	return (
		<main>
			<h1 className="text-4xl font-bold">Products</h1>
			<ProductList products={popularProducts} />
		</main>
	)
}