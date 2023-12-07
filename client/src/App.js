import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <br />
            <NavBar />
            <br />
            <Outlet />
        </div>
    );
}

export default App;
