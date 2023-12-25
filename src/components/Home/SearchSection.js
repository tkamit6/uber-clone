import React, { useContext, useEffect } from 'react'
import InputItem from './InputItem'
import { DestinationContext } from '@/context/DestinationContext'
import { SourceContext } from '@/context/SourceContext'

export default function SearchSection() {

    const { destination, setDestination, routeData } = useContext(DestinationContext)
    const { source, setSource } = useContext(SourceContext)



        console.log(routeData?.routes?.[0].legs?.[0].distance.text)
    
    useEffect(() => {
        if (source) {
            console.log(source)
        }

        if (destination) {
            console.log(destination)
        }
    }, [source, destination])

    return (
        <div className='p-2 md:p-5 border-2 rounded-xl'>
            <p className='text-xl font-bold '>Get a Ride</p>
            <InputItem type='source' />
            <InputItem type='destination' />
            <p>{
                routeData && routeData?.routes?.[0].legs?.[0].distance.text 
            }</p>
            {
                routeData?.routes?.[0].legs?.[0].duration.text
            }
            <button type='button' className='p-3 bg-black w-full mt-5 text-white rounded-lg' >Search</button>
        </div>
    )
}
