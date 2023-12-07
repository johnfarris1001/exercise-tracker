import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const onLogin = useOutletContext();

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((data) => setErrorMessages(data.errors));
            }
        });
    }

    return (
        <div>
            <br />
            <Form
                style={{
                    width: "50%",
                    margin: "auto",
                    padding: "10px",
                    border: "solid",
                }}
                onSubmit={handleSubmit}
            >
                <Form.Field>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password_confirmation">
                        Confirm Password:{" "}
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                    />
                </Form.Field>
                <Button type="submit">Submit</Button>
                <div style={{ color: "red" }}>
                    {errorMessages.length > 0 && (
                        <div>
                            <br />
                            <h5>New User is Invalid</h5>
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

export default Signup;
