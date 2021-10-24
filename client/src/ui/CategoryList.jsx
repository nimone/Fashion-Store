import React from 'react'

import Category from "@/components/Category"

export default function CategoryList({ categories }) {
	return (
		<div className="flex flex-wrap justify-center items-center">
			{categories.map(category => (
				<Category 
					key={category.id}
					imgSrc={category.image}
					title={category.title}
					link="#"
				/>
			))}
		</div>
	)
}