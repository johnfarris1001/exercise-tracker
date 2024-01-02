import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authorizing, setAuthorizing] = useState(false);

    return (
        <UserContext.Provider
            value={{ user, setUser, authorizing, setAuthorizing }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
