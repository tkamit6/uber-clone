import { createContext, useState } from 'react';

export const DestinationContext = createContext(null)

export const DestinationContextProvder = ({ children }) => {
    const [destination, setDestination] = useState([]);
    const [routeData, setRouteData] = useState([])

    return <DestinationContext.Provider value={{ destination, setDestination, routeData, setRouteData }}>
        {children}
    </DestinationContext.Provider>
}

