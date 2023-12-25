import Image from 'next/image'
import React from 'react'
import { FaUser } from "react-icons/fa";


export default function CarListItem({ car, distance }) {

    return (
        <div className='flex justify-between items-center mt-5'>
            <div className='flex'>
                <div className=' mr-4 gap-4'>

                    {/* <Image src='#' alt='img' width={100} height={100} /> */}
                    <div className='flex items-center gap-2 '>
                        <h2 className='font-medium text-[18px] mr-4'>{car.name}</h2>
                        <FaUser />{car.seat}
                    </div>
                    <p>{car.desc}</p>
                </div>
            </div>
            <h2 className='font-semibold text-[18px]'>${(car.amount * distance).toFixed(2)}</h2>
        </div>
    )
}
