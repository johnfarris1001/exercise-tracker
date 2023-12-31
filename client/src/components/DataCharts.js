import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import weekOptions from "../weeks";

function DataCharts() {
    const [weeksAgo, setWeeksAgo] = useState(-1);

    return (
        <div>
            <h1>Data Charts</h1>
            <Dropdown
                selection
                search
                options={weekOptions}
                value={weeksAgo}
                onChange={(e, { value }) => setWeeksAgo(value)}
            />
        </div>
    );
}

export default DataCharts;
