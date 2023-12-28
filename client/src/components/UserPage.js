import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, Segment } from "semantic-ui-react";
import Profile from "./Profile";

function UserPage() {
    const { user, setUser } = useContext(UserContext);
    const [showProfile, setShowProfile] = useState(true);

    function newProfile(profile) {
        setUser({ ...user, profile: profile });
    }

    function deleteProfile() {
        setUser({ ...user, profile: null });
    }

    console.log(user);

    if (!user) {
        return <div>Loading</div>;
    } else {
        function handleProfileDisplay() {
            setShowProfile(!showProfile);
        }

        return (
            <div style={{ padding: "15px" }}>
                <h1>{user.username}'s Info Page</h1>
                <Button onClick={handleProfileDisplay}>
                    {showProfile ? "Hide Profile" : "Show Profile"}
                </Button>
                <Segment.Group horizontal>
                    <Segment style={showProfile ? {} : { display: "none" }}>
                        <Profile
                            user={user}
                            setUser={setUser}
                            deleteProfile={deleteProfile}
                            newProfile={newProfile}
                        />
                    </Segment>
                    <Segment>
                        <h1>This is a PlaceHolder</h1>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}

export default UserPage;
