import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Form, Divider, Button } from "semantic-ui-react";

function EditProfileForm() {
    const profile = useOutletContext();
    const [profileInfo, setProfileInfo] = useState({
        name: profile.name,
        image: profile.image,
        height: profile.height,
        weight: profile.weight,
        bio: profile.bio,
    });

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
                <h3>Edit Profile</h3>
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
                <Form.Field>
                    <label>Bio: </label>
                    <input
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

export default EditProfileForm;
