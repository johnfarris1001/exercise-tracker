import App from "./App";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import EditProfileForm from "./forms/EditProfileForm";
import NewProfileForm from "./forms/NewProfileForm";
import Activities from "./components/Activities";
import Locations from "./components/Locations";
import NewLocationForm from "./forms/NewLocationForm";
import Instructors from "./components/Instructors";
import NewInstructorForm from "./forms/NewInstructorForm";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <About />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/profile",
                element: <Profile />,
                children: [
                    {
                        path: "/profile/edit",
                        element: <EditProfileForm />,
                    },
                    {
                        path: "/profile/new",
                        element: <NewProfileForm />,
                    },
                ],
            },
            {
                path: "/activities",
                element: <Activities />,
            },
            {
                path: "/locations",
                element: <Locations />,
            },
            {
                path: "/locations/new",
                element: <NewLocationForm />,
            },
            {
                path: "/instructors",
                element: <Instructors />,
            },
            {
                path: "/instructors/new",
                element: <NewInstructorForm />,
            },
        ],
    },
];

export default routes;
