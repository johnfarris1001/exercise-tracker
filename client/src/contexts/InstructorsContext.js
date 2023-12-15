import React, { useState, useEffect } from "react";

const InstructorsContext = React.createContext();

function InstructorsProvider({ children }) {
    const [instructors, setInstructors] = useState({});

    useEffect(() => {
        fetch("/api/instructors")
            .then((r) => r.json())
            .then((data) => setInstructors(data));
    }, []);

    return (
        <InstructorsContext.Provider value={{ instructors, setInstructors }}>
            {children}
        </InstructorsContext.Provider>
    );
}

export { InstructorsContext, InstructorsProvider };
