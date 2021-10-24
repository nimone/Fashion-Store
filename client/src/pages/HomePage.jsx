import React from 'react'
import { categories, popularProducts, sliderItems } from '@/dummydata'

import CategoryList from "@/ui/CategoryList"
import ProductList from "@/ui/ProductList"
import Newsletter from "@/ui/Newsletter"
import Slider from "@/ui/Slider"

export default function HomePage() {
	return (
		<div>
			<section>
				<Slider slides={sliderItems} />
			</section>

			<section className="my-14">
				<h2 className="text-3xl font-medium">Popular Categories</h2>
				<CategoryList categories={categories} />
			</section>

			<section className="my-14">
				<h2 className="text-3xl font-medium">Popular Products</h2>
				<ProductList products={popularProducts} />
			</section>

			<section className="my-20">
				<Newsletter />
			</section>
		</div>
	)
}