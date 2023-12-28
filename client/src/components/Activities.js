import { Table, Button } from "semantic-ui-react";
import Activity from "./Activity";

function Activities({ activities }) {
    const activitesToDisplay = activities.map((activity) => {
        return <Activity key={activity.id} activity={activity} />;
    });

    return (
        <div>
            <Table celled structured style={{ width: "80%", margin: "auto" }}>
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
            <br />
            <Button>Add New Activity</Button>
        </div>
    );
}

export default Activities;
