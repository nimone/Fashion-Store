import React from 'react'
import { useParams, Redirect, useHistory } from "react-router-dom"
import { popularProducts } from '@/dummydata'
import { ChevronLeft } from "react-feather"

import Button from "@/components/Button"

export default function ProductDetailsPage() {
	const history = useHistory()
	const { id } = useParams()
	const product = popularProducts.find(p => p.id == id)

	if (!product) return <Redirect to="/404" /> 

	return (
		<main className="relative mb-20">
			<div className="grid grid-cols-1 md:grid-cols-2 py-8 px-4">
				<section className="flex items-center max-h-2xl overflow-hidden my-10 sm:mx-0">
					<img 
						className="object-cover"
						src={product.image} 
					/>
				</section>
				<section className="flex flex-col justify-center space-y-6 text-gray-600">
					<h2 className="text-4xl text-gray-800">{product.name}</h2>
					<p className="text-xl">Lorem ipsum qui ad eiusmod commodo reprehenderit ea deserunt dolore do in excepteur laboris commodo ut consequat anim nostrud nostrud culpa occaecat sed aliquip dolor amet eu occaecat pariatur consectetur officia.</p>
					<span className="text-2xl font-medium">${product.price}</span>
					<Button className="sm:max-w-xs text-base">Add to Cart</Button>
				</section>
			</div>
			<Button 
				onClick={history.goBack}
				className="absolute top-0 text-lg" 
				secondary
			><ChevronLeft className="mr-2" /> Back
			</Button>
		</main>
	)
}