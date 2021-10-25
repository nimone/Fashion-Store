import React from 'react'
import { Link } from "react-router-dom"
import { ChevronRight } from "react-feather"
import { categories, popularProducts, sliderItems } from '@/dummydata'

import Button from "@/components/Button"
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
				<ProductList products={[...popularProducts].splice(0, 4)} />

				<Link to="/products" className="flex justify-center">
					<Button className="text-lg mt-6" link>
						View More <ChevronRight className="ml-2" />
					</Button>
				</Link>
			</section>

			<section className="my-20">
				<Newsletter />
			</section>
		</div>
	)
}