import { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { InstructorsContext } from "../contexts/InstructorsContext";
import { LocationsContext } from "../contexts/LocationsContext";
import { Divider, Form, Button } from "semantic-ui-react";
import { getNowDate, createDatetime } from "../datetime";

function NewActivityForm() {
    const { instructors } = useContext(InstructorsContext);
    const { locations } = useContext(LocationsContext);
    const { addActivity } = useOutletContext();
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState([]);
    const [newActivityInfo, setNewActivityInfo] = useState({
        date: getNowDate().toISOString().split("T")[0],
        time: getNowDate().toISOString().split("T")[1].slice(0, 5),
        category: "",
        duration: 0,
        instructor_id: 0,
        location_id: 0,
        intensity: 1,
    });

    function handleNewActivity(e) {
        e.preventDefault();
        const newActivity = {
            ...newActivityInfo,
            start_time: createDatetime(
                newActivityInfo.date,
                newActivityInfo.time
            ),
        };
        fetch("/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newActivity),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    addActivity(data);
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
            <Form style={style} onSubmit={handleNewActivity}>
                <h3 style={{ textAlign: "center" }}>New Activity</h3>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Date: </label>
                        <input
                            type="date"
                            value={newActivityInfo.date}
                            onChange={(e) => {
                                setNewActivityInfo({
                                    ...newActivityInfo,
                                    date: e.target.value,
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Start Time: </label>
                        <input
                            type="time"
                            value={newActivityInfo.time}
                            onChange={(e) => {
                                setNewActivityInfo({
                                    ...newActivityInfo,
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
                            value={newActivityInfo.category}
                            onChange={(e) => {
                                setNewActivityInfo({
                                    ...newActivityInfo,
                                    category: e.target.value,
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Duration (minutes):</label>
                        <input
                            type="number"
                            value={newActivityInfo.duration}
                            onChange={(e) => {
                                if (e.target.value >= 0) {
                                    setNewActivityInfo({
                                        ...newActivityInfo,
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
                        value={newActivityInfo.instructor_id}
                        onChange={(e) => {
                            setNewActivityInfo({
                                ...newActivityInfo,
                                instructor_id: instructorOptions.filter(
                                    (inst) => {
                                        return (
                                            inst.text ===
                                            e.target.firstChild.textContent
                                        );
                                    }
                                )[0].value,
                            });
                        }}
                    />
                    <Form.Select
                        label="Locations: "
                        options={locationOptions}
                        value={newActivityInfo.location_id}
                        onChange={(e) => {
                            setNewActivityInfo({
                                ...newActivityInfo,
                                location_id: locationOptions.filter((loc) => {
                                    return (
                                        loc.text ===
                                        e.target.firstChild.textContent
                                    );
                                })[0].value,
                            });
                        }}
                    />
                </Form.Group>
                <Form.Field>
                    <label>Intensity (1-10):</label>
                    <input
                        type="number"
                        value={newActivityInfo.intensity}
                        onChange={(e) => {
                            if (e.target.value > 0 && e.target.value <= 10) {
                                setNewActivityInfo({
                                    ...newActivityInfo,
                                    intensity: e.target.value,
                                });
                            }
                        }}
                    />
                </Form.Field>
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

export default NewActivityForm;
