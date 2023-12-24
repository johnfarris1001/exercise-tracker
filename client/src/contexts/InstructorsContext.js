import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const InstructorsContext = React.createContext();

function InstructorsProvider({ children }) {
    const [instructors, setInstructors] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch("/api/instructors")
            .then((r) => r.json())
            .then((data) => setInstructors(data));
    }, [user]);

    return (
        <InstructorsContext.Provider value={{ instructors, setInstructors }}>
            {children}
        </InstructorsContext.Provider>
    );
}

export { InstructorsContext, InstructorsProvider };
