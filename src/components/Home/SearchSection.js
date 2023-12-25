import React, { useContext, useEffect, useState } from 'react'
import InputItem from './InputItem'
import { DestinationContext } from '@/context/DestinationContext'
import { SourceContext } from '@/context/SourceContext'
import CarListOption from './CarListOption'

export default function SearchSection() {

    const { destination, setDestination, routeData } = useContext(DestinationContext)
    const { source, setSource } = useContext(SourceContext)
    const [distance, setDistance] = useState()


    useEffect(() => {
        if (source) {
            console.log(source)
        }

        if (destination) {
            console.log(destination)
        }
    }, [source, destination])

    const calculateDistace = () => {
        const distan = google.maps.geometry.spherical.computeDistanceBetween(
            { lat: source.lat, lng: source.lng },
            { lat: destination.lat, lng: destination.lng }
        )
        setDistance(distan * 0.000621374)
    }

    return (
        <div>

            <div className='p-2 md:p-5 border-2 rounded-xl'>
                <p className='text-xl font-bold '>Get a Ride</p>
                <InputItem type='source' />
                <InputItem type='destination' />

                <div className='flex justify-between'>
                    <p>{
                        routeData && routeData?.routes?.[0].legs?.[0].distance.text
                    }</p>
                    <p>
                        {
                            routeData?.routes?.[0].legs?.[0].duration.text
                        }
                    </p>
                </div>
                <button onClick={calculateDistace} type='button' className='p-3 bg-black w-full mt-5 text-white rounded-lg' >Search</button>
            </div>
            {
                distance ? <CarListOption distance={distance} /> : null
            }
        </div>
    )
}
