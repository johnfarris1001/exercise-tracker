import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const { onLogin } = useOutletContext();

    function handleSubmit(e) {
        setDisabled(true);
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((data) => {
                    setDisabled(false);
                    setErrorMessages(data.errors);
                });
            }
        });
    }

    return (
        <div>
            <br />
            <Form
                style={{
                    width: "40%",
                    margin: "auto",
                    padding: "10px",
                    border: "solid",
                }}
                onSubmit={handleSubmit}
            >
                <Form.Field>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Button className={disabled ? "disabled" : ""} type="submit">
                    Login
                </Button>
                <div style={{ color: "red" }}>
                    {errorMessages.length > 0 && (
                        <div>
                            <br />
                            <h5>Invalid Login</h5>
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

export default Login;
