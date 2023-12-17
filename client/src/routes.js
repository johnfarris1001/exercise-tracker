import App from "./App";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Locations from "./components/Locations";
import NewLocationForm from "./forms/NewLocationForm";
import Instructors from "./components/Instructors";

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
        ],
    },
];

export default routes;
