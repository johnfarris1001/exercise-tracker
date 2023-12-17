import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { InstructorsContext } from "../contexts/InstructorsContext";

function NewInstructorForm() {
    const navigate = useNavigate();
    const { instructors, setInstructors } = useContext(InstructorsContext);
    const [errorMessages, setErrorMessages] = useState([]);
    const [newInstructorInfo, setNewInstructorInfo] = useState({
        name: "",
        years: 0,
    });

    function handleNewInstructor(e) {
        e.preventDefault();
        fetch("/api/instructors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newInstructorInfo),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setInstructors([...instructors, data]);
                    navigate("/instructors");
                });
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    const newInstrutorDisplay = {
        width: "80%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    return (
        <div>
            <Form style={newInstrutorDisplay} onSubmit={handleNewInstructor}>
                <Form.Field inline>
                    <label>Name: </label>
                    <input
                        value={newInstructorInfo.name}
                        onChange={(e) => {
                            setNewInstructorInfo({
                                ...newInstructorInfo,
                                name: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Form.Field inline>
                    <label>Years of Experience: </label>
                    <input
                        value={newInstructorInfo.years}
                        type="number"
                        onChange={(e) => {
                            if (e.target.value >= 0) {
                                setNewInstructorInfo({
                                    ...newInstructorInfo,
                                    years: e.target.value,
                                });
                            }
                        }}
                    />
                </Form.Field>
                <Button type="submit">Submit</Button>
                <Button onClick={() => navigate("/instructors")}>Cancel</Button>
                <div style={{ color: "red" }}>
                    {errorMessages.length > 0 && (
                        <div>
                            <br />
                            <h5>Instructor is Invalid</h5>
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

export default NewInstructorForm;
