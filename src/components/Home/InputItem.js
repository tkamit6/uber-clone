'use client'

import Image from 'next/image'
import React, { useContext, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';

export default function InputItem({ type }) {
    const [value, setValue] = useState(null);

    const { destination, setDestination } = useContext(DestinationContext)
    const { source, setSource } = useContext(SourceContext)


    const getLatitude = (place, type) => {
        const placeId = place?.value.place_id;
        const service = new google.maps.places.PlacesService(document.createElement('div'))
        service.getDetails({ placeId }, (place, status) => {
            if (status === 'OK' && place.geometry && place.geometry.location) {

                if (type === 'source') {
                    setSource({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        name: place.formatted_address,
                        label: place.name
                    })
                } else {
                    setDestination({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        name: place.formatted_address,
                        label: place.name
                    })
                }
            }
        })

    }

    return (
        <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-3'>
            <Image alt='img' src={type == 'source' ? '/images/source.png' : '/images/source.png'} width={15} height={15} />
            {/* <input type='text' placeholder={type == "source" ? 'Pickup Location' : 'Drop Location'} className='bg-transparent w-full outline-none caret-black text-black' /> */}
            <GooglePlacesAutocomplete
                // apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}

                selectProps={{
                    value,
                    onChange: (place) => { getLatitude(place, type); setValue(place) },
                    placeholder: 'Pick Up',
                    isClearable: true,
                    className: 'w-full focus:outline-none',
                    components: {
                        DropdownIndicator: false,
                    },
                    styles: {
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#00ffff00',
                            border: 'none',
                        }),
                    }
                }}
            />
        </div>
    )
}
