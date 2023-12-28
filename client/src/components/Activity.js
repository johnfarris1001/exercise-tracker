import { Table } from "semantic-ui-react";
import { getDate } from "../datetime";

function Activity({ activity }) {
    const date = getDate(activity.start_time);
    console.log(activity);
    return (
        <Table.Row>
            <Table.Cell>{`${date.getHours()}:${date.getMinutes()} ${
                date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`}</Table.Cell>
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
