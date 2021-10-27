import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { popularProducts } from '@/dummydata'

import ProductList from "@/ui/ProductList"
import Container from "@/components/Container"

export default function ProductsPage() {
	const query = new URLSearchParams(useLocation().search)
	const [products, setProducts] = useState([...popularProducts])

	const category = query.get("category")
	
	return (
		<main>
			<Container heading={`Products${ category ? ": " + category : "" }`}>
				<ProductList products={popularProducts} />
			</Container>
		</main>
	)
}