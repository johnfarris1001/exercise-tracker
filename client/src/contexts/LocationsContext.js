import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const LocationsContext = React.createContext();

function LocationsProvider({ children }) {
    const [locations, setLocations] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch("/api/locations")
            .then((r) => r.json())
            .then((data) => setLocations(data));
    }, [user]);

    return (
        <LocationsContext.Provider value={{ locations, setLocations }}>
            {children}
        </LocationsContext.Provider>
    );
}

export { LocationsContext, LocationsProvider };
