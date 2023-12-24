import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Divider, Button } from "semantic-ui-react";

function NewProfileForm() {
    const navigate = useNavigate();
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        image: "",
        height: 0,
        weight: 0,
        bio: "",
    });
    const [errorMessages, setErrorMessages] = useState([]);

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     fetch(`/profiles/${profile.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(profileInfo),
    //     }).then((r) => {
    //         if (r.ok) {
    //             r.json().then((data) => {
    //                 editProfile(data);
    //                 navigate("/profile");
    //             });
    //         } else {
    //             r.json().then((data) => setErrorMessages(data.errors));
    //         }
    //     });
    // }

    const style = {
        width: "60%",
        margin: "auto",
        padding: "20px",
        border: "solid",
    };

    return (
        <div>
            <Divider />
            <Form style={style}>
                <h3>New Profile</h3>
                <Form.Field inline>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={profileInfo.name}
                        onChange={(e) => {
                            setProfileInfo({
                                ...profileInfo,
                                name: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Form.Field inline>
                    <label>Height (in): </label>
                    <input
                        type="number"
                        value={profileInfo.height}
                        onChange={(e) => {
                            setProfileInfo({
                                ...profileInfo,
                                height: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Form.Field inline>
                    <label>Weight (lbs): </label>
                    <input
                        type="number"
                        value={profileInfo.weight}
                        onChange={(e) => {
                            setProfileInfo({
                                ...profileInfo,
                                weight: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Form.Field inline>
                    <label>Profile Picture URL: </label>
                    <input
                        type="text"
                        value={profileInfo.image}
                        onChange={(e) => {
                            setProfileInfo({
                                ...profileInfo,
                                image: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Bio: </label>
                    <textarea
                        type="text"
                        value={profileInfo.bio}
                        onChange={(e) => {
                            setProfileInfo({
                                ...profileInfo,
                                bio: e.target.value,
                            });
                        }}
                    />
                </Form.Field>
                <Button type="submit">Submit</Button>
            </Form>
            <Divider />
        </div>
    );
}

export default NewProfileForm;