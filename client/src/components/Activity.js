import { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { getDate } from "../datetime";

function Activity({ activity, deleteActivity }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const date = getDate(activity.start_time);

    function handleDeleteClick() {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        } else {
            fetch(`/activities/${activity.id}`, {
                method: "DELETE",
            }).then(() => deleteActivity(activity));
        }
    }

    return (
        <Table.Row>
            <Table.Cell>{`${date.getHours()}:${
                date.getMinutes() === 0
                    ? "00"
                    : date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : date.getMinutes()
            } ${
                date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`}</Table.Cell>
            <Table.Cell>{activity.category}</Table.Cell>
            <Table.Cell>{activity.duration}</Table.Cell>
            <Table.Cell>{activity.instructor.name}</Table.Cell>
            <Table.Cell>{activity.location.name}</Table.Cell>
            <Table.Cell>{activity.intensity}</Table.Cell>
            <Table.Cell>{activity.user_rating}</Table.Cell>
            <Table.Cell>
                <Button>Update</Button>
                <Button onClick={handleDeleteClick}>
                    {confirmDelete ? "Are You Sure?" : "Delete"}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

export default Activity;
