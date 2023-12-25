import React, { useState } from 'react'
import CarListItem from './CarListItem'
import { useRouter } from 'next/navigation';

const carList = [
    { id: 1, name: 'Uber X', desc: 'Affordable, everydat ride', seat: 4, amount: 1.1 },
    { id: 2, name: 'Comfort', desc: 'Affordable, everydat ride', seat: 4, amount: 1.3 },
    { id: 3, name: 'Uber XL', desc: 'Affordable, everydat ride', seat: 4, amount: 1.5 },
    { id: 4, name: 'Uber Pet', desc: 'Affordable, everydat ride', seat: 4, amount: 1.8 },
    { id: 5, name: 'Black', desc: 'Affordable', seat: 4, amount: 2 },
]
export default function CarListOption({ distance }) {
    const [activeIndex, setActiveIndex] = useState();
    const [selectedCar, setSelectedCar] = useState();
    const router = useRouter()

    return (
        <div className='mt-5 overflow-auto h-[250px]'>
            <h2 className='text-[22px] font-bold'>Recomended</h2>

            {
                carList.map((car, index) => (
                    <div onClick={() => { setActiveIndex(index); setSelectedCar(car) }} key={car.id} className={`px-6 rounded-md cursor-pointer ${activeIndex == index ? 'border-[2px] border-black/90' : 'border-[1px] border-transparent'} `}>
                        <CarListItem distance={distance} car={car} />
                    </div>
                ))
            }
            {
                selectedCar ? <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[32%] items-center border-[1px] '>
                    <h2>Make Payment</h2>
                    <button onClick={() => router.push('/payment?amount' + (selectedCar.amount * distance).toFixed(2))} className='p-3 bg-black text-white rounded-lg'>Request {selectedCar.name}</button>
                </div> : null
            }
        </div>
    )
}
