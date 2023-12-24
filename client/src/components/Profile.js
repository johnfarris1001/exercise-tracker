import { useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Card, Image, Button, Divider } from "semantic-ui-react";

function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    function newProfile(profile) {
        setUser({ ...user, profile: profile });
    }

    function deleteProfile() {
        setUser({ ...user, profile: null });
    }

    if (!user) {
        return <div>Loading</div>;
    } else if (user.profile) {
        const profile = user.profile;
        const feet = Math.floor(profile.height / 12);
        const inches = profile.height % 12;
        const img = profile.image ? profile.image : "/icons8-exercise-50.png";

        function handleEditClick() {
            if (location.pathname === "/profile") {
                navigate("/profile/edit");
            } else {
                navigate("/profile");
            }
        }

        function handleDeleteClick() {
            if (!confirmDelete) {
                setConfirmDelete(true);
                return;
            } else {
                setConfirmDelete(false);
                fetch(`/profiles/${profile.id}`, {
                    method: "DELETE",
                }).then(() => deleteProfile());
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
                <Outlet
                    context={{ profile: profile, editProfile: newProfile }}
                />
                <Button onClick={handleEditClick}>
                    {location.pathname === "/profile"
                        ? "Edit Profile"
                        : "Cancel"}
                </Button>
                <Button onClick={handleDeleteClick}>
                    {confirmDelete ? "Are You Sure?" : "Delete Profile"}
                </Button>
            </div>
        );
    } else {
        function handleNewClick() {
            if (location.pathname === "/profile") {
                navigate("/profile/new");
            } else {
                navigate("/profile");
            }
        }
        return (
            <div>
                <Button onClick={handleNewClick}>
                    {location.pathname === "/profile"
                        ? "Create Your Profile"
                        : "Cancel"}
                </Button>
                <Divider />
                <Button>Delete Your Account</Button>
                <Outlet context={{ createProfile: newProfile }} />
            </div>
        );
    }
}

export default Profile;
