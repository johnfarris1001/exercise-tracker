import { Table } from "semantic-ui-react";

function Activity({ activity }) {
    console.log(activity.start_time);
    return (
        <Table.Row>
            <Table.Cell>{activity.start_time}</Table.Cell>
            <Table.Cell>{activity.category}</Table.Cell>
            <Table.Cell>{activity.duration}</Table.Cell>
            <Table.Cell>{activity.instructor.name}</Table.Cell>
            <Table.Cell>{activity.location.name}</Table.Cell>
            <Table.Cell>{activity.intensity}</Table.Cell>
            <Table.Cell>{activity.user_rating}</Table.Cell>
        </Table.Row>
    );
}

export default Activity;
