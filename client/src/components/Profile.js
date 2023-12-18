import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <div>Loading</div>;
    } else if (user.profile) {
        return <div>{user.profile.name}'s Profile</div>;
    } else {
        return <div>Create Your Profile</div>;
    }
}

export default Profile;
