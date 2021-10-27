import React from 'react'
import { Link } from "react-router-dom"
import { ChevronRight } from "react-feather"
import { categories, popularProducts, sliderItems } from '@/dummydata'

import Button from "@/components/Button"
import Container from "@/components/Container"
import CategoryList from "@/ui/CategoryList"
import ProductList from "@/ui/ProductList"
import Newsletter from "@/ui/Newsletter"
import Slider from "@/ui/Slider"

export default function HomePage() {
	return (
		<main>
			<section>
				<Slider slides={sliderItems} />
			</section>

			<Container heading="Popular Categories">
				<CategoryList categories={categories} />
			</Container>

			<Container heading="Popular Products">
				<ProductList products={[...popularProducts].splice(0, 4)} />

				<Link to="/products" className="flex justify-center">
					<Button className="text-lg mt-6" link>
						View More <ChevronRight className="ml-2" />
					</Button>
				</Link>
			</Container>

			<section className="my-20">
				<Newsletter />
			</section>
		</main>
	)
}