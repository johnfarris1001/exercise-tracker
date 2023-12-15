import { useState, useEffect, useContext } from "react";
import { List } from "semantic-ui-react";
import { LocationsContext } from "../contexts/LocationsContext";
import { InstructorsContext } from "../contexts/InstructorsContext";

function About() {
    const [users, setUsers] = useState([]);
    const { locations } = useContext(LocationsContext);
    const { instructors } = useContext(InstructorsContext);

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

    const locationsToDisplay = locations[0]
        ? locations.map((item) => {
              return <List.Item key={item.id}>{item.name}</List.Item>;
          })
        : null;

    const instructorsToDisplay = instructors[0]
        ? instructors.map((item) => {
              return <List.Item key={item.id}>{item.name}</List.Item>;
          })
        : null;

    return (
        <div>
            <h1>Exercise Tracker</h1>
            <List>
                Current Users:
                {usersToDisplay}
            </List>
            <List>
                Locations:
                {locationsToDisplay}
            </List>
            <List>
                Instructors:
                {instructorsToDisplay}
            </List>
        </div>
    );
}

export default About;
