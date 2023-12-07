import App from "./App";
import ErrorPage from "./components/ErrorPage";
import About from "./components/About";
import Signup from "./components/Signup";

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
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
];

export default routes;
