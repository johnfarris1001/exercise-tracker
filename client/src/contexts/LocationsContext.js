import React, { useState, useEffect } from "react";

const LocationsContext = React.createContext();

function LocationsProvider({ children }) {
    const [locations, setLocations] = useState({});

    useEffect(() => {
        getLocations();
    }, []);

    function getLocations() {
        fetch("/api/locations")
            .then((r) => r.json())
            .then((data) => setLocations(data));
    }

    return (
        <LocationsContext.Provider
            value={{ locations, setLocations, getLocations }}
        >
            {children}
        </LocationsContext.Provider>
    );
}

export { LocationsContext, LocationsProvider };
