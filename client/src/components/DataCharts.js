import { Segment } from "semantic-ui-react";
import BarChart from "./BarChart";
import ColumnChart from "./ColumnChart";

function DataCharts({ user }) {
    return (
        <div>
            <h1>Data Charts</h1>
            <Segment.Group>
                <BarChart user={user} />
                <ColumnChart user={user} />
            </Segment.Group>
        </div>
    );
}

export default DataCharts;
