import React from 'react'
import clsx from "clsx"
import { ChevronLeft, X, Loader, Package, Truck, Check } from "react-feather"
import { dummyOrderStatus } from '@/dummydata'

export default function OrderStatus({ currentStatus }) {
	return (
		<div className="flex justify-around">
			{[<Loader />, <Package />, <Truck />, <Check />]
				.map((status, i) => {
					const orderStatus = dummyOrderStatus[i]
					const isCompleted = dummyOrderStatus.indexOf(currentStatus) >= dummyOrderStatus.indexOf(orderStatus) 
					const isCurrentStatus = currentStatus === orderStatus

					return (
						<span key={orderStatus} className={clsx(
							"flex flex-col items-center m-1",
							isCurrentStatus && "text-green-500"
						)}>
							<div className={clsx(
								"flex flex-col justify-center items-center",
								"h-10 w-10 rounded-full border-2 m-2",
								isCompleted ? "border-green-400" : "border-gray-200",
								isCurrentStatus ? "bg-green-400 text-white" : "bg-white text-gray-800",
							)}>
								{status}
							</div>
							<p>{orderStatus}</p>
						</span>
					)
			})}
		</div>
	)
}