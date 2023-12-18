import NavBar from "./components/NavBar";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function App() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/me").then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => setUser(user));
            }
        });
    }, [setUser]);

    const onLogin = (user) => {
        setUser(user);
        navigate("/profile");
    };

    function handleClick() {
        if (user) {
            fetch("/logout", {
                method: "DELETE",
            }).then(() => setUser(null));
            navigate("/");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="App">
            <br />
            <NavBar handleClick={handleClick} />
            <br />
            <Outlet context={onLogin} />
        </div>
    );
}

export default App;
