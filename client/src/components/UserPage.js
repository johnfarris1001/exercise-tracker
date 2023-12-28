import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, Segment } from "semantic-ui-react";
import Profile from "./Profile";
import Activities from "./Activities";

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
                        <Activities activities={user.activities} />
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}

export default UserPage;
