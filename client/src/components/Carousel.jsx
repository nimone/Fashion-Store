import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'react-feather'
import Button from './Button'

export default function Carousel({slides}) {
	const [currentSlide, setCurrentSlide] = useState(0)
	
	const nextSlide = () => setSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
	const prevSlide = () => setSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)

	const setSlide = (index) => {
		const slideEl = document.querySelector("#carousel-slide-"+index)
		if (!slideEl) return

		slideEl.scrollIntoView({behavior: 'smooth'})
		setCurrentSlide(index)
	}

	// useEffect(() => {
	// 	const autoSlide = setTimeout(nextSlide, 5000)
	// 	return () => clearTimeout(autoSlide)
	// }, [currentSlide])
	
	return (
		<div className='relative'>
			<ul className="flex overflow-x-auto scrollbar-hide snap">
				{slides.map((slide, idx) => (
					<li 
						key={slide.id} 
						id={"carousel-slide-"+idx} 
						className="relative min-w-screen h-[80vh] snap-center"
					><img 
						src={slide.image} 
						className='w-full h-full object-cover object-top' 
					/>
						<div className={clsx(
            	"absolute left-0 top-0 px-10",
            	"max-w-xl h-full flex flex-col justify-center items-center text-center",
            	"text-white bg-gradient-to-r from-gray-800/90 to-transparent",
            	"sm:(items-start text-left)"
            )}>
            	<h2 className="text-4xl sm:text-6xl font-bold mb-10">{slide.title}</h2>
            	<p className="text-xl mb-10">{slide.desc}</p>
            	<Button className="text-xl w-1/2" light>Shop now</Button>
            </div>
					</li>
				))}
			</ul>
			<ul className='w-full absolute bottom-8 flex justify-center space-x-4 items-center'>
				{slides.map((slide, idx) => (
					<li 
						key={slide.id}
						onClick={e => {
							e.preventDefault()
							setSlide(idx)
						}}
						className={clsx(
							"rounded-full bg-white cursor-pointer",
							"transition-all h-4 shadow-md",
							idx === currentSlide ? "w-8" : "w-4 hover:(w-6)",
					)}/>
		  	))}
			</ul>
			<span className="absolute rounded-full bg-gray-800/40 flex justify-center items-center bottom-6 left-6 z-10 cursor-pointer text-white p-2">
	    	<ChevronLeft width={48} height={48} onClick={prevSlide} />
      </span>
      <span className="absolute rounded-full bg-gray-800/40 flex justify-center items-center bottom-6 right-6 z-10 cursor-pointer text-white p-2">
	    	<ChevronRight width={48} height={48} onClick={nextSlide} />
      </span>
		</div>
	)
}