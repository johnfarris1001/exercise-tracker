import React, { useState } from "react";

const LocationsContext = React.createContext();

function LocationsProvider({ children }) {
    const [locations, setLocations] = useState({});

    return (
        <LocationsContext.Provider value={{ locations, setLocations }}>
            {children}
        </LocationsContext.Provider>
    );
}

export { LocationsContext, LocationsProvider };
