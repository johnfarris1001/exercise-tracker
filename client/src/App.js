import NavBar from "./components/NavBar";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { Button } from "semantic-ui-react";

function App() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch("/me").then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => setUser(user));
            }
        });
    }, [setUser]);

    const onLogin = (user) => {
        setUser(user);
        navigate("/");
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
