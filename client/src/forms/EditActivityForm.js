import { useState, useContext, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { InstructorsContext } from "../contexts/InstructorsContext";
import { LocationsContext } from "../contexts/LocationsContext";
import { Divider, Form, Button } from "semantic-ui-react";
import { getNowDate, createDatetime, getDate } from "../datetime";

function EditActivityForm() {
    const { instructors } = useContext(InstructorsContext);
    const { locations } = useContext(LocationsContext);
    const { activities, editActivity } = useOutletContext();
    const params = useParams();
    const activity = activities.find((act) => act.id === parseInt(params.id));
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState([]);
    const [activityInfo, setActivityInfo] = useState({
        date: getNowDate().toISOString().split("T")[0],
        time: getNowDate().toISOString().split("T")[1].slice(0, 5),
        category: "",
        duration: 0,
        instructor_id: 0,
        location_id: 0,
        intensity: 1,
        user_rating: 5,
    });

    useEffect(() => {
        if (activity) {
            const date = getDate(activity.start_time);
            setActivityInfo({
                category: activity.category,
                duration: activity.duration,
                instructor_id: activity.instructor.id,
                location_id: activity.location.id,
                intensity: activity.intensity,
                user_rating: activity.user_rating,
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${
                    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                }`,
                time: `${date.getHours()}:${
                    date.getMinutes() === 0
                        ? "00"
                        : date.getMinutes() < 10
                        ? `0${date.getMinutes()}`
                        : date.getMinutes()
                }`,
            });
        }
    }, [activity]);

    function handleEditActivity(e) {
        e.preventDefault();
        const newActivity = {
            ...activityInfo,
            start_time: createDatetime(activityInfo.date, activityInfo.time),
        };
        fetch(`/activities/${activity.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newActivity),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    editActivity(data);
                    navigate("/activities");
                });
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    const instructorOptions = instructors[0]
        ? instructors.map((inst) => {
              return {
                  key: inst.id,
                  text: inst.name,
                  value: inst.id,
              };
          })
        : [{ key: 0, text: "", value: 0 }];

    const locationOptions = locations[0]
        ? locations.map((loc) => {
              return {
                  key: loc.id,
                  text: loc.name,
                  value: loc.id,
              };
          })
        : [{ key: 0, text: "", value: 0 }];

    const style = {
        width: "75%",
        margin: "auto",
        padding: "20px",
        border: "solid",
        textAlign: "left",
    };

    return (
        <div>
            <Divider />
            <Form style={style} onSubmit={handleEditActivity}>
                <h3 style={{ textAlign: "center" }}>Update Activity</h3>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Date: </label>
                        <input
                            type="date"
                            value={activityInfo.date}
                            onChange={(e) => {
                                setActivityInfo({
                                    ...activityInfo,
                                    date: e.target.value,
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Start Time: </label>
                        <input
                            type="time"
                            value={activityInfo.time}
                            onChange={(e) => {
                                setActivityInfo({
                                    ...activityInfo,
                                    time: e.target.value,
                                });
                            }}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Type: </label>
                        <input
                            type="text"
                            value={activityInfo.category}
                            onChange={(e) => {
                                setActivityInfo({
                                    ...activityInfo,
                                    category: e.target.value,
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Duration (minutes):</label>
                        <input
                            type="number"
                            value={activityInfo.duration}
                            onChange={(e) => {
                                if (e.target.value >= 0) {
                                    setActivityInfo({
                                        ...activityInfo,
                                        duration: e.target.value,
                                    });
                                }
                            }}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Select
                        label="Instructor: "
                        options={instructorOptions}
                        value={activityInfo.instructor_id}
                        onChange={(e, { value }) => {
                            setActivityInfo({
                                ...activityInfo,
                                instructor_id: value,
                            });
                        }}
                    />
                    <Form.Select
                        label="Locations: "
                        options={locationOptions}
                        value={activityInfo.location_id}
                        onChange={(e, { value }) => {
                            setActivityInfo({
                                ...activityInfo,
                                location_id: value,
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Intensity (1-10):</label>
                        <input
                            type="number"
                            value={activityInfo.intensity}
                            onChange={(e) => {
                                if (
                                    e.target.value > 0 &&
                                    e.target.value <= 10
                                ) {
                                    setActivityInfo({
                                        ...activityInfo,
                                        intensity: e.target.value,
                                    });
                                }
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Rating (1-5):</label>
                        <input
                            type="number"
                            value={activityInfo.user_rating}
                            onChange={(e) => {
                                if (e.target.value > 0 && e.target.value <= 5) {
                                    setActivityInfo({
                                        ...activityInfo,
                                        user_rating: e.target.value,
                                    });
                                }
                            }}
                        />
                    </Form.Field>
                </Form.Group>
                <Button>Submit</Button>
                <Button onClick={() => navigate("/activities")}>Cancel</Button>
                <div style={{ color: "red" }}>
                    {errorMessages.length > 0 && (
                        <div>
                            <br />
                            <h5>Appointment is Invalid</h5>
                            <ul>
                                {errorMessages.map((error) => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Form>
        </div>
    );
}

export default EditActivityForm;
