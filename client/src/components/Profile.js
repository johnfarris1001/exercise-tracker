import { useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Card, Image, Button } from "semantic-ui-react";

function Profile() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) {
        return <div>Loading</div>;
    } else if (user.profile) {
        const profile = user.profile;
        const feet = Math.floor(profile.height / 12);
        const inches = profile.height % 12;
        const img = profile.image ? profile.image : "/icons8-exercise-50.png";

        function handleClick() {
            if (location.pathname === "/profile") {
                navigate("/profile/edit");
            } else {
                navigate("/profile");
            }
        }

        return (
            <div>
                <Card centered>
                    <Image src={img} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{profile.name}</Card.Header>
                        <Card.Meta>{`${feet}' ${inches}", ${profile.weight} pounds`}</Card.Meta>
                        <Card.Description>{profile.bio}</Card.Description>
                    </Card.Content>
                </Card>
                <Outlet context={profile} />
                <Button onClick={handleClick}>
                    {location.pathname === "/profile"
                        ? "Edit Profile"
                        : "Cancel"}
                </Button>
            </div>
        );
    } else {
        return <div>Create Your Profile</div>;
    }
}

export default Profile;
