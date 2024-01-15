import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { Table, Divider } from "semantic-ui-react";
import Activity from "./Activity";
import { InstructorsContext } from "../contexts/InstructorsContext";

function Activities() {
    const { user, setUser } = useOutletContext();
    const { instructors, setInstructors } = useContext(InstructorsContext);

    console.log(instructors);

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
        const instWithUser = instructors.map((inst) => {
            if (inst.id === activity.instructor.id) {
                if (
                    inst.unique_users.some(
                        (user) => user.id === activity.user.id
                    )
                ) {
                    return inst;
                } else {
                    return {
                        ...inst,
                        unique_users: [...inst.unique_users, activity.user],
                    };
                }
            } else {
                return inst;
            }
        });
        const instWithLoc = instWithUser.map((inst) => {
            if (inst.id === activity.instructor.id) {
                if (
                    inst.unique_locations.some(
                        (loc) => loc.id === activity.location.id
                    )
                ) {
                    return inst;
                } else {
                    return {
                        ...inst,
                        unique_locations: [
                            ...inst.unique_locations,
                            activity.location,
                        ],
                    };
                }
            } else {
                return inst;
            }
        });
        setUser(newUser);
        setInstructors(instWithLoc);
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
        const instWithUser = instructors.map((inst) => {
            if (inst.id !== activity.instructor.id) {
                return inst;
            } else {
                if (newUniqueInstructors.find((item) => inst.id === item.id)) {
                    return inst;
                } else {
                    return {
                        ...inst,
                        unique_users: inst.unique_users.filter(
                            (item) => item.id !== user.id
                        ),
                    };
                }
            }
        });
        const instWithLoc = instWithUser.map((inst) => {
            if (inst.id !== activity.instructor.id) {
                return inst;
            } else {
                const instructorActivities = inst.activities.filter(
                    (act) => act.id !== activity.id
                );
                if (
                    instructorActivities.some(
                        (act) => act.location.id === activity.location.id
                    )
                ) {
                    return inst;
                } else {
                    return {
                        ...inst,
                        unique_locations: inst.unique_locations.filter(
                            (item) => item.id !== activity.location.id
                        ),
                    };
                }
            }
        });
        setUser({
            ...user,
            activities: newActivities,
            unique_instructors: newUniqueInstructors,
            unique_locations: newUniqueLocations,
        });
        setInstructors(instWithLoc);
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
                <br />
            </div>
        );
    } else {
        return <div>Loading</div>;
    }
}

export default Activities;
