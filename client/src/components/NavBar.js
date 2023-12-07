import { NavLink } from "react-router-dom";

const linkStyles = {
    width: "100px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "#0047AB",
    textDecoration: "none",
    color: "white",
};

function NavBar() {
    return (
        <div className="navbar">
            <NavLink to="/" style={linkStyles}>
                Home
            </NavLink>
            <NavLink to="/signup" style={linkStyles}>
                SignUp
            </NavLink>
        </div>
    );
}

export default NavBar;
