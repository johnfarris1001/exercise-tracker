import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Card, Image } from "semantic-ui-react";

function Profile() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <div>Loading</div>;
    } else if (user.profile) {
        const feet = Math.floor(user.profile.height / 12);
        const inches = user.profile.height % 12;
        const img = user.profile.image
            ? user.profile.image
            : "/icons8-exercise-50.png";

        return (
            <Card centered>
                <Image src={img} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{user.profile.name}</Card.Header>
                    <Card.Meta>{`${feet}' ${inches}", ${user.profile.weight} pounds`}</Card.Meta>
                    <Card.Description>{user.profile.bio}</Card.Description>
                </Card.Content>
            </Card>
        );
    } else {
        return <div>Create Your Profile</div>;
    }
}

export default Profile;
