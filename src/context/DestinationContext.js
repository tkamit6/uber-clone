import { createContext, useState } from 'react';

export const DestinationContext = createContext(null)

export const DestinationContextProvder = ({ children }) => {
    const [destination, setDestination] = useState([]);

    return <DestinationContext.Provider value={{ destination, setDestination }}>
        {children}
    </DestinationContext.Provider>
}

