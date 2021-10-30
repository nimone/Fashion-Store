import React from 'react'
import { ChevronLeft } from "react-feather"
import { useParams, Redirect, useHistory } from "react-router-dom"
import { dummyOrders } from '@/dummydata'

import Button from "@/components/Button"
import Container from "@/components/Container"
import OrderStatus from "@/components/OrderStatus"
import OrderProduct from "@/components/OrderProduct"

export default function OrderDetailsPage() {
	const history = useHistory()
	const { id } = useParams()
	const order = dummyOrders.find(order => order.id == id)

	return (
		<main className="relative mb-20">
			<Container heading={`Order Details for #${id}`} className="flex flex-col">
				<OrderDetailsSection heading="Status:">
					<div className="max-w-2xl mx-2 px-2 py-4 sm:mx-auto border border-gray-300 rounded-lg shadow-sm">
						<OrderStatus currentStatus={order.status} />
					</div>
					<div className="text-center space-y-2">
						<h3 className="text-xl mt-10">Shipping Info:</h3>
						<div className="space-x-1">
							<span className="font-normal">Address:</span> 
							<span className="font-light">{order.address}</span>
						</div>
						<div className="space-x-1">
							<span className="font-normal">Phone No.:</span> 
							<span className="font-light">+1234-567-890</span>
						</div>
					</div>
				</OrderDetailsSection>

				<OrderDetailsSection heading="Products:">
					<div className="flex flex-wrap justify-center gap-2">
						{order.products.map(p => (
							<OrderProduct 
								key={p.product.id}
								name={p.product.name}
								imgSrc={p.product.image}
								price={p.product.price}
								quantity={p.quantity}
							/>
						))}
					</div>
					<div className="text-center space-y-2">
						<h3 className="text-xl mt-10">Total Amount:</h3>
						<p className="text-2xl font-light">${order.amount}</p>
					</div>
				</OrderDetailsSection>
			</Container>

			<Button 
				onClick={history.goBack}
				className="absolute -top-12 -left-4 text-lg" 
				secondary
			><ChevronLeft className="mr-2" /> Back
			</Button>
		</main>
	)
}

function OrderDetailsSection({ heading, children }) {
	return (
		<section className="my-12">
			<h2 className="text-2xl text-center font-medium mb-4">{heading}</h2>
			{children}
		</section>
	)
}