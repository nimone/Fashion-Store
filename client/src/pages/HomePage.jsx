import React from 'react'
import { categories, popularProducts } from '@/dummydata'

import CategoryList from "@/ui/CategoryList"
import ProductList from "@/ui/ProductList"
import Newsletter from "@/ui/Newsletter"

export default function HomePage() {
	return (
		<div>
			<h1 className="text-5xl font-bold">Ecommerce Store</h1>
			<section className="my-14">
				<h2 className="text-3xl font-medium">Categories</h2>
				<CategoryList categories={categories} />
			</section>
			<section className="my-14">
				<h2 className="text-3xl font-medium">Popular Products</h2>
				<ProductList products={products} />
			</section>
			<section className="my-20">
				<Newsletter />
			</section>
		</div>
	)
}