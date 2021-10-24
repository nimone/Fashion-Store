import React from 'react'

import Card from "./Card"

export function Product({ link, imgSrc, price }) {
	return (
		<Card imgSrc={imgSrc} className="!max-w-72 sm:(!max-w-xs)">
			<div className={clsx(
      	"absolute inset-0 text-black text-center",
      	"flex flex-col justify-center items-center",
      	"opacity-0 transition ease-out",
      	"group-hover:(opacity-100 bg-black/20)"
    	)}>
    		<button className="m-6 bg-white w-12 h-12 flex justify-center items-center rounded-full transition-all duration-500 ease-out hover:w-20">
    			<ShoppingCart className="w-6 h-6"/>
    		</button>
    		<Link 
    			to={link}
    			className="m-6 bg-white w-12 h-12 flex justify-center items-center rounded-full transition-all duration-500 ease-out hover:w-20">
    			<Search className="w-6 h-6" />
    		</Link>
      </div>
    	<div className={clsx(
    		"absolute bottom-0 right-0 w-10 h-10 m-4",
    		"flex justify-center items-center",
    		"bg-black/50 font-bold text-white rounded-full",
    	)}>
    		${price}
    	</div>
		</Card>
	)
}