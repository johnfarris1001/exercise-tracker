import { useState, useContext } from "react";
import { InstructorsContext } from "../contexts/InstructorsContext";
import { LocationsContext } from "../contexts/LocationsContext";
import { Divider, Form } from "semantic-ui-react";

function NewActivityForm() {
    const { instructors } = useContext(InstructorsContext);
    const { locations } = useContext(LocationsContext);
    const [newActivityInfo, setNewActivityInfo] = useState({
        category: "",
        length: 0,
        instructor_id: 0,
        location_id: 0,
        intensity: 1,
    });

    const instructorOptions = instructors[0]
        ? instructors.map((inst) => {
              return {
                  key: inst.id,
                  text: inst.name,
                  value: inst.id,
              };
          })
        : null;

    const locationOptions = locations[0]
        ? locations.map((loc) => {
              return {
                  key: loc.id,
                  text: loc.name,
                  value: loc.id,
              };
          })
        : null;

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
            <Form style={style}>
                <h3 style={{ textAlign: "center" }}>New Activity</h3>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>Date: </label>
                        <input type="date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Start Time: </label>
                        <input type="time" />
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
            </Form>
        </div>
    );
}

export default NewActivityForm;
