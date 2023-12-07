import App from "./App";
import About from "./components/About";
import Signup from "./components/Signup";

const routes = [
    {
        path: "/",
        element: <App />,
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
