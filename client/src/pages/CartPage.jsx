import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { popularProducts } from '@/dummydata'
import { ShoppingBag } from "react-feather"

import CartList from "@/ui/CartList"
import CartSummary from "@/ui/CartSummary"
import Button from "@/components/Button"
import PageHeader from "@/components/PageHeader"

const dummycart = [...popularProducts]
	.splice(0, 4)
	.map(item => ({...item, quantity: 1}))

export default function CartPage() {
	const [items, setItems] = useState(dummycart)

	const setItemQuantity = (id, qty) => {
		if (qty === 0) removeItem(id)
		setItems(current => {
			const itemIdx = current.findIndex(item => item.id === id)
			const newItems = [...current]
			newItems[itemIdx] = {
				...newItems[itemIdx],
				quantity: qty,
			}
			return newItems
		})
	}

	const removeItem = (id) => {
		setItems(current => current.filter(item => item.id !== id))
	}

	if (items.length === 0) {
		return (
			<main className="h-screen flex flex-col items-center text-center my-14 p-4">
				<PageHeader>Your Shopping Cart is Empty</PageHeader>
				<Link to="/products">
					<Button link className="text-xl">
						<ShoppingBag className="mr-2" />
						Continue Shopping
					</Button>
				</Link>
			</main>
		)
	}

	return (
		<main className="my-14">
			<PageHeader>Your Shopping Cart</PageHeader>
			<section className="max-w-6xl mx-auto my-16 relative gap-8 flex flex-col p-4 md:(flex-row items-start)">
				<section className="flex-1 sm:min-w-md divide-y divide-gray-200 border border-gray-300 rounded shadow">
					<CartList 
						items={items} 
						setItemQuantity={(id, qty) => setItemQuantity(id, qty)}
					/>		
				</section>

				<section className="w-full md:w-auto border border-gray-300 rounded shadow py-4 md:(sticky top-20)">
					<CartSummary 
						subtotal={items.reduce((sum, i) => sum + (i.price * i.quantity), 0)} 
						charges={[
							{name: "Shipping Charges", amount: 9},
						]}
						discounts={[
							{name: "Shipping Discount", amount: 9},
						]}
					/>
				</section>
			</section>
		</main>
	)
}