import React, { useState, useEffect } from "react";

const LocationsContext = React.createContext();

function LocationsProvider({ children }) {
    const [locations, setLocations] = useState({});

    useEffect(() => {
        fetch("/api/locations")
            .then((r) => r.json())
            .then((data) => setLocations(data));
    }, []);

    return (
        <LocationsContext.Provider value={{ locations, setLocations }}>
            {children}
        </LocationsContext.Provider>
    );
}

export { LocationsContext, LocationsProvider };
