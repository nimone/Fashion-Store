import React, { useState } from 'react'

import CartItem from "@/components/CartItem"

export default function CartList({ items, setItemQuantity }) {
	return (
		<>
			{items.map(item => (
				<CartItem 
					key={item.id}
					imgSrc={item.image} 
					name={item.title} 
					price={item.price} 
					quantity={item.quantity}
					setQuantity={qty => setItemQuantity(item.id, qty)}
				/>
			))}
		</>
	)
}