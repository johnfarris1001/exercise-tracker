import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { Table, Divider } from "semantic-ui-react";
import Activity from "./Activity";

function Activities() {
    const { user, setUser } = useOutletContext();

    function addActivity(activity) {
        const newUniqueInstructors = user.unique_instructors.filter((inst) => {
            return inst.id !== activity.instructor.id;
        });
        const newUniqueLocations = user.unique_locations.filter((loc) => {
            return loc.id !== activity.location.id;
        });
        const newUser = {
            ...user,
            activities: [...user.activities, activity],
            unique_instructors: [...newUniqueInstructors, activity.instructor],
            unique_locations: [...newUniqueLocations, activity.location],
        };
        setUser(newUser);
    }

    function deleteActivity(activity) {
        const newActivities = user.activities.filter((act) => {
            return act.id !== activity.id;
        });
        const newUniqueInstructors = user.unique_instructors.filter((inst) => {
            return newActivities.some((act) => act.instructor.id === inst.id);
        });
        const newUniqueLocations = user.unique_locations.filter((loc) => {
            return newActivities.some((act) => act.location.id === loc.id);
        });
        setUser({
            ...user,
            activities: newActivities,
            unique_instructors: newUniqueInstructors,
            unique_locations: newUniqueLocations,
        });
    }

    function editActivity(activity) {
        const newActivities = user.activities.map((act) => {
            if (activity.id === act.id) {
                return activity;
            } else {
                return act;
            }
        });
        const newUniqueInstructors = user.unique_instructors
            .filter((inst) => {
                return newActivities.some(
                    (act) => act.instructor.id === inst.id
                );
            })
            .filter((instructor) => {
                return instructor.id !== activity.instructor.id;
            });
        const newUniqueLocations = user.unique_locations
            .filter((loc) => {
                return newActivities.some((act) => act.location.id === loc.id);
            })
            .filter((location) => {
                return location.id !== activity.location.id;
            });
        setUser({
            ...user,
            activities: newActivities,
            unique_instructors: [...newUniqueInstructors, activity.instructor],
            unique_locations: [...newUniqueLocations, activity.location],
        });
    }

    if (user) {
        const sortedActivities = user.activities.sort((a, b) =>
            a.start_time.localeCompare(b.start_time)
        );
        const activitesToDisplay = sortedActivities.map((activity) => {
            return (
                <Activity
                    key={activity.id}
                    activity={activity}
                    deleteActivity={deleteActivity}
                />
            );
        });

        return (
            <div>
                <h2>{user.username}'s Activities</h2>
                <NavLink className="ui button" to="/activities/new">
                    Add New Activity
                </NavLink>
                <Divider />
                <Outlet
                    context={{
                        addActivity: addActivity,
                        activities: user.activities,
                        editActivity: editActivity,
                    }}
                />
                <Table
                    celled
                    structured
                    style={{
                        width: "80%",
                        margin: "auto",
                    }}
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
                            <Table.HeaderCell>Update/Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{activitesToDisplay}</Table.Body>
                </Table>
                <Outlet
                    context={{
                        addActivity: addActivity,
                        activities: user.activities,
                        editActivity: editActivity,
                    }}
                />
                <br />
            </div>
        );
    } else {
        return <div>Loading</div>;
    }
}

export default Activities;
