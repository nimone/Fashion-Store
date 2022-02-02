import React, { useEffect, useState } from 'react'
import { useParams, Redirect, useHistory } from "react-router-dom"
import { ChevronLeft } from "react-feather"

import Button from "@/components/Button"
import Loader from "@/components/Loader"
import api from '../api'

export default function ProductDetailsPage() {
	const history = useHistory()
	const { id } = useParams()
	const [product, setProduct] = useState(null)

	useEffect(() => {
		(async () => {
			const resp = await api.fetchProduct(id)
			if (resp.status == "error") {
				return history.replace("/404")
			}
			setProduct(resp)
		})()
	}, [id])

  const addToCart = async (quantity=1) => {
    const resp = await api.addProductsToCart([{productID: product._id, quantity}])
    if (resp.status === "ok") {
      cartDispatch({type: "ADD_PRODUCTS", payload: [{...product, quantity}]})
    }
  }

	if (!product) return <Loader /> 

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
					<p className="text-xl">{product.description}</p>
					<span className="text-2xl font-medium">${product.price}</span>
					<Button className="sm:max-w-xs text-base" onClick={addToCart}>Add to Cart</Button>
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