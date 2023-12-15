import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import routes from "./routes";
import { LocationsProvider } from "./contexts/LocationsContext";
import { InstructorsProvider } from "./contexts/InstructorsContext";

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
        <LocationsProvider>
            <InstructorsProvider>
                <RouterProvider router={router} />
            </InstructorsProvider>
        </LocationsProvider>
    </UserProvider>
);
