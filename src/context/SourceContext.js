import { createContext, useState } from 'react';

export const SourceContext = createContext(null);

export const SourceContextProvider = ({ children }) => {
    const [source, setSource] = useState([])
    return <SourceContext.Provider value={{ source, setSource }}>
        {children}
    </SourceContext.Provider>
}