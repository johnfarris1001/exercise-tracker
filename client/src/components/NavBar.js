import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
import { UserContext } from "../contexts/UserContext";

function NavBar({ handleClick }) {
    const { user, authorizing } = useContext(UserContext);

    if (user) {
        return (
            <Menu className="navbar" style={{ backgroundColor: "#f9f9f9" }}>
                <Menu.Item>
                    <NavLink to="/">Home</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/profile">Profile</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/activities">Activities</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/locations">Locations</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/instructors">Instructors</NavLink>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button onClick={handleClick}>
                            {user ? `Logout: ${user.username}` : "Login"}
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    } else if (authorizing) {
        return (
            <Menu className="navbar">
                <Menu.Item>
                    <NavLink to="/">Home</NavLink>
                </Menu.Item>
            </Menu>
        );
    } else {
        return (
            <Menu className="navbar">
                <Menu.Item>
                    <NavLink to="/">Home</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/signup">SignUp</NavLink>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button onClick={handleClick}>
                            {user ? `Logout: ${user.username}` : "Login"}
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default NavBar;
