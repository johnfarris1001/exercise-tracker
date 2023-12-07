import { useState, useEffect } from "react";
import { List } from "semantic-ui-react";

function About() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/users").then((resp) => {
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
            <List>
                Current Users:
                {usersToDisplay}
            </List>
        </div>
    );
}

export default About;
