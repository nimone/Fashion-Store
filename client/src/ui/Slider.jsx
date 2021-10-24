import React, { useState } from 'react';
import clsx from "clsx"
import { ChevronLeft, ChevronRight } from 'react-feather';

import Button from "@/components/Button"

export default function Slider({ slides }) {
  const [current, setCurrent] = useState(0)
  const length = slides.length

  const nextSlide = () => setCurrent(curr => curr === length - 1 ? 0 : curr + 1)
  const prevSlide = () => setCurrent(curr => curr === 0 ? length - 1 : curr - 1)

  if (!Array.isArray(slides) || slides.length <= 0) return null

  return (
    <div className="w-full h-[80vh] relative flex justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
        	className={clsx(
        		"transition-opacity duration-[2s] ease-in-out",
        		index === current ? "opacity-100": "opacity-0",
        	)}
        >
          {index === current && (<>
            <img
            	src={slide.image} 
            	alt='slider image' 
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
          </>)}
        </div>
      ))}
      <span className="absolute rounded-full bg-gray-800/40 flex justify-center items-center bottom-6 left-6 z-10 cursor-pointer text-white p-2">
	    	<ChevronLeft width={48} height={48} onClick={prevSlide} />
      </span>
      <span className="absolute rounded-full bg-gray-800/40 flex justify-center items-center bottom-6 right-6 z-10 cursor-pointer text-white p-2">
	    	<ChevronRight width={48} height={48} onClick={nextSlide} />
      </span>
      <div className="absolute bottom-6 mx-auto flex space-x-3 items-center">
	  		{slides.map((_, index) => (
	  			<span 
		  			key={index}
		  			onClick={() => setCurrent(index)}
		  			className={clsx(
		  			"rounded-full bg-white cursor-pointer",
		  			index === current ? "w-5 h-5" : "w-3 h-3",
		  		)}/>
		  	))}
		  </div>
    </div>
  )
}
