import NavBar from "./NavBar";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            <br />
            <NavBar />
            <br />
            Something went wrong!
        </div>
    );
}

export default ErrorPage;
