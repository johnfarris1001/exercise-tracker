import NavBar from "./components/NavBar";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { InstructorsContext } from "./contexts/InstructorsContext";
import { LocationsContext } from "./contexts/LocationsContext";

function App() {
    const { user, setUser, setAuthorizing } = useContext(UserContext);
    const { setInstructors, getInstructors } = useContext(InstructorsContext);
    const { setLocations, getLocations } = useContext(LocationsContext);
    const navigate = useNavigate();

    useEffect(() => {
        setAuthorizing(true);
        fetch("/me").then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setUser(user);
                    setAuthorizing(false);
                });
            } else {
                setAuthorizing(false);
            }
        });
    }, [setUser]);

    function onLogin(user) {
        setUser(user);
        getInstructors();
        getLocations();
        navigate("/profile");
    }

    function handleClick() {
        if (user) {
            fetch("/logout", {
                method: "DELETE",
            }).then(() => setUser(null));
            navigate("/");
            setInstructors([]);
            setLocations([]);
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="App" style={{ backgroundColor: "#f9f1f1" }}>
            <br />
            <NavBar handleClick={handleClick} />
            <br />
            <Outlet
                context={{
                    onLogin: onLogin,
                    user: user,
                    setUser: setUser,
                }}
            />
        </div>
    );
}

export default App;
