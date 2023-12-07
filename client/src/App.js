import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
    const onLogin = (user) => {
        setUser(user);
        navigate("/");
    };

    return (
        <div className="App">
            <br />
            <NavBar />
            <br />
            <Outlet context={onLogin} />
        </div>
    );
}

export default App;
