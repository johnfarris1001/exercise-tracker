import { useState } from "react";

function NewActivityForm() {
    const [newActivityInfo, setNewActivityInfo] = useState({
        category: "",
        length: 0,
        instructor: "",
        location: "",
        intensity: 0,
        user_rating: 0,
    });

    return <div>New Activity Form</div>;
}

export default NewActivityForm;
