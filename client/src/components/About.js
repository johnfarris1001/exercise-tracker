import { useState, useEffect } from "react";
import { List } from "semantic-ui-react";

function About() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/users").then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => setUsers(data));
            }
        });
    }, []);

    const usersToDisplay = users.map((item) => {
        return <List.Item key={item.id}>{item.username}</List.Item>;
    });

    return (
        <div>
            <h1>Exercise Tracker</h1>
            <h4 style={{ width: "60%", margin: "auto" }}>
                Use this app to track your journey, check your results and
                preferences on the Profile page. Two users with seed data are
                available, log in using 'password' to see example results.
            </h4>
            <List>
                Current Users:
                {usersToDisplay}
            </List>
        </div>
    );
}

export default About;
