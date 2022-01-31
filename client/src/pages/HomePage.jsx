import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { ChevronRight } from "react-feather"
import { categories, sliderItems } from '@/dummydata'

import Button from "@/components/Button"
import Container from "@/components/Container"
import CategoryList from "@/ui/CategoryList"
import ProductList from "@/ui/ProductList"
import Newsletter from "@/ui/Newsletter"
import Slider from "@/ui/Slider"
import api from '../api'

export default function HomePage() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		(async () => {
			const resp = await api.fetchProducts("",true)
			console.log(resp)
			if (resp.status !== "error") {
				setProducts(resp)
			}
		})()
	}, [])
	
	return (
		<main>
			<section>
				<Slider slides={sliderItems} />
			</section>

			<Container heading="Popular Categories">
				<CategoryList categories={categories} />
			</Container>

			<Container heading="Latest Arrivals">
				<ProductList products={[...products].splice(0,4)} />

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