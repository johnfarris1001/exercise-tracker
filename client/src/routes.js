import App from "./App";
import Signup from "./components/Signup";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
];

export default routes;
