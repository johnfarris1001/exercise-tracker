import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { Table } from "semantic-ui-react";
import Activity from "./Activity";

function Activities() {
    const { user, setUser } = useOutletContext();

    function addActivity(activity) {
        const newUser = {
            ...user,
            activities: [...user.activities, activity],
        };
        setUser(newUser);
    }

    if (user) {
        const activitesToDisplay = user.activities.map((activity) => {
            return <Activity key={activity.id} activity={activity} />;
        });

        return (
            <div>
                <Table
                    celled
                    structured
                    style={{ width: "80%", margin: "auto" }}
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Start Time</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Length</Table.HeaderCell>
                            <Table.HeaderCell>Instructor</Table.HeaderCell>
                            <Table.HeaderCell>Location</Table.HeaderCell>
                            <Table.HeaderCell>Intensity</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{activitesToDisplay}</Table.Body>
                </Table>
                <Outlet context={{ addActivity: addActivity }} />
                <br />
                <NavLink className="ui button" to="/activities/new">
                    Add New Activity
                </NavLink>
            </div>
        );
    } else {
        return <div>Loading</div>;
    }
}

export default Activities;
