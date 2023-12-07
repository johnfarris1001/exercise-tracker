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
        navigate("/");
    };

    return (
        <div className="App">
            <br />
            <NavBar />
            <br />
            <h4>
                {user
                    ? `You are Logged in as:  ${user.username}`
                    : `You are not Logged in`}
            </h4>
            <Outlet context={onLogin} />
        </div>
    );
}

export default App;
