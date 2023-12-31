import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Card, Image, Button, Divider } from "semantic-ui-react";

function Profile({ user, setUser, deleteProfile, newProfile }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [accountDelete, setAccountDelete] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    if (user.profile) {
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
                    context={{
                        profile: profile,
                        editProfile: newProfile,
                    }}
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

        function handleDeleteClick() {
            if (!accountDelete) {
                setAccountDelete(true);
                return;
            } else {
                fetch(`/api/users/${user.id}`, {
                    method: "DELETE",
                }).then(() => {
                    fetch("/logout", {
                        method: "DELETE",
                    }).then(() => setUser(null));
                    navigate("/");
                });
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
                <Button onClick={handleDeleteClick}>
                    {accountDelete ? "Are You Sure?" : "Delete Your Account"}
                </Button>
                <Outlet context={{ createProfile: newProfile }} />
            </div>
        );
    }
}

export default Profile;
