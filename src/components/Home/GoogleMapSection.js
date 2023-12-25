

import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';

export default function GoogleMapSection() {

    const { destination, setDestination, setRouteData } = useContext(DestinationContext)
    const { source, setSource } = useContext(SourceContext)


    const containerStyle = {
        width: '100%',
        height: window.innerHeight * 0.8
    };
    const [map, setMap] = React.useState(null)
    const [directioRotePoint, setDirectionRoutePoint] = useState([])

    const [center, setCenter] = useState({
        lat: 40.7165999,
        lng: -74.006057
    });

    useEffect(() => {
        if (source?.length != [] && map) {
            map.panTo({
                lat: source.lat,
                lng: source.lng,
            })
            setCenter({
                lat: source.lat,
                lng: source.lng,
            })
        }

        if (source.length != [] && destination.length != []) {
            destinationRoute();
        }

    }, [source])

    useEffect(() => {
        if (destination?.length != [] && map) {
            setCenter({
                lat: destination.lat,
                lng: destination.lng,
            })
        }
        if (source.length != [] && destination.length != []) {
            destinationRoute();
        }
    }, [destination])

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    // })

    const destinationRoute = () => {
        // Ensure the `google` object is available globally or imported correctly
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route(
            {
                origin: { lat: source.lat, lng: source.lng },
                destination: { lat: destination.lat, lng: destination.lng },
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    // Assuming `setDirectionRoutePoint` is a state setter function
                    setDirectionRoutePoint(result);
                    console.log(result)
                    setRouteData(result)
                } else {
                    console.error('Error with DirectionsService:', status);
                }
            }
        );
    };


    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        console.log(bounds)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            // onLoad={onLoad}
            onUnmount={onUnmount}
            options={{mapTypeId: 'terrain',  mapId: '4113717585f11867' }}

        >
            {
                source.length != [] ? <MarkerF position={{ lat: source.lat, lng: source.lng }} icon={{
                    url: '/images/source.png', scaledSize: {
                        width: 20,
                        height: 20
                    }
                }}>
                    <OverlayViewF position={{ lat: source.lat, lng: source.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} >
                        <p className='text-black bg-white p-3'>
                            {
                                source.label
                            }
                        </p>
                    </OverlayViewF>
                </MarkerF> : null
            }
            {
                destination.length != [] ? <MarkerF position={{ lat: destination.lat, lng: destination.lng }} icon={{
                    url: '/images/source.png', scaledSize: {
                        width: 20,
                        height: 20
                    }
                }}>
                    <OverlayViewF position={{ lat: destination.lat, lng: destination.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} >
                        <p className='text-black bg-white p-3'>
                            {
                                destination.label
                            }
                        </p>
                    </OverlayViewF>
                </MarkerF> : null
            }
            <DirectionsRenderer
                directions={directioRotePoint}
                options={{
                   polylineOptions:{
                    strokeColor:'#000',
                    strokeWeight: 5
                   }
                }}
            />
        </GoogleMap>
    )

}
