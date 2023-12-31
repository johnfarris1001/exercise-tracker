import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import { getDate } from "../datetime";

function Activity({ activity, deleteActivity }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();
    const date = getDate(activity.start_time);

    function handleDeleteClick() {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        } else {
            fetch(`/activities/${activity.id}`, {
                method: "DELETE",
            }).then(() => {
                deleteActivity(activity);
                navigate("/activities");
            });
        }
    }

    function formatTime(time) {
        return time === 0 ? "00" : time < 10 ? `0${time}` : time;
    }

    return (
        <Table.Row>
            <Table.Cell>{`${formatTime(date.getHours())}:${formatTime(
                date.getMinutes()
            )}
            ${
                date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`}</Table.Cell>
            <Table.Cell>{activity.category}</Table.Cell>
            <Table.Cell>{activity.duration}</Table.Cell>
            <Table.Cell>{activity.instructor.name}</Table.Cell>
            <Table.Cell>{activity.location.name}</Table.Cell>
            <Table.Cell>{activity.intensity}</Table.Cell>
            <Table.Cell>{activity.user_rating}</Table.Cell>
            <Table.Cell>
                <Button
                    onClick={() => navigate(`/activities/${activity.id}/edit`)}
                >
                    Update
                </Button>
                <Button onClick={handleDeleteClick}>
                    {confirmDelete ? "Are You Sure?" : "Delete"}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

export default Activity;
