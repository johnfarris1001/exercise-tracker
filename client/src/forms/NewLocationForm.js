import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { LocationsContext } from "../contexts/LocationsContext";

function NewLocationForm() {
    const navigate = useNavigate();
    const { locations, setLocations } = useContext(LocationsContext);
    const [errorMessages, setErrorMessages] = useState([]);
    const [newLocationInfo, setNewLocationInfo] = useState({
        name: "",
        address: "",
        description: "",
    });

    function handleNewLocation(e) {
        e.preventDefault();
        fetch("/api/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newLocationInfo),
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setLocations([...locations, data]);
                    navigate("/locations");
                });
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    const newLocationDisplay = {
        width: "80%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    return (
        <div>
            <Form style={newLocationDisplay} onSubmit={handleNewLocation}>
                <Form.Field inline>
                    <label>Name: </label>
                    <input
                        value={newLocationInfo.name}
                        onChange={(e) => {
                            setNewLocationInfo({
                                ...newLocationInfo,
                                name: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Form.Field inline>
                    <label>Address: </label>
                    <input
                        value={newLocationInfo.address}
                        onChange={(e) => {
                            setNewLocationInfo({
                                ...newLocationInfo,
                                address: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Form.Field inline>
                    <label>Description: </label>
                    <input
                        value={newLocationInfo.description}
                        onChange={(e) => {
                            setNewLocationInfo({
                                ...newLocationInfo,
                                description: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Button type="submit">Submit</Button>
                <Button onClick={() => navigate("/locations")}>Cancel</Button>
                <div style={{ color: "red" }}>
                    {errorMessages.length > 0 && (
                        <div>
                            <br />
                            <h5>Location is Invalid</h5>
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

export default NewLocationForm;
