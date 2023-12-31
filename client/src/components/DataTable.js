import { useState } from "react";
import { List, Segment, Card, Dropdown } from "semantic-ui-react";
import weekOptions from "../weeks";
import { getDate } from "../datetime";

function DataTable({ user }) {
    const [weeksAgo, setWeeksAgo] = useState(-1);
    const week = 7 * 24 * 60 * 60 * 1000;

    const activeActivities = user.activities.filter((act) => {
        if (weeksAgo === -1) {
            return true;
        } else {
            return (
                getDate(act.start_time) <= new Date() - weeksAgo * week &&
                getDate(act.start_time) > new Date() - (weeksAgo + 1) * week
            );
        }
    });

    const number = activeActivities.length;

    const style = number === 0 ? { display: "none" } : {};

    const totalDuration = activeActivities.reduce(
        (n, { duration }) => n + duration,
        0
    );
    const totalIntensity = activeActivities.reduce(
        (n, { intensity }) => n + intensity,
        0
    );
    const totalRating = activeActivities.reduce(
        (n, { user_rating }) => n + user_rating,
        0
    );

    function roundTwo(num) {
        return Math.round(num * 100) / 100;
    }

    const instructorCards = user.unique_instructors
        .filter((inst) => {
            return activeActivities.some(
                (act) => act.instructor.id === inst.id
            );
        })
        .map((inst) => {
            const activities = activeActivities.filter((act) => {
                return inst.id === act.instructor.id;
            });
            const instRating = activities.reduce(
                (n, { user_rating }) => n + user_rating,
                0
            );
            return (
                <Card key={inst.id} fluid>
                    <Card.Header>{inst.name}</Card.Header>
                    <Card.Meta>
                        Number of Activities: {activities.length}
                    </Card.Meta>
                    <Card.Meta>
                        Average Rating:{" "}
                        {roundTwo(instRating / activities.length)}
                    </Card.Meta>
                </Card>
            );
        });

    const locationCards = user.unique_locations
        .filter((loc) => {
            return activeActivities.some((act) => act.location.id === loc.id);
        })
        .map((loc) => {
            const activities = activeActivities.filter((act) => {
                return loc.id === act.location.id;
            });
            const locRating = activities.reduce(
                (n, { user_rating }) => n + user_rating,
                0
            );
            return (
                <Card key={loc.id} fluid>
                    <Card.Header>{loc.name}</Card.Header>
                    <Card.Meta>
                        Number of Activities: {activities.length}
                    </Card.Meta>
                    <Card.Meta>
                        Average Rating:{" "}
                        {roundTwo(locRating / activities.length)}
                    </Card.Meta>
                </Card>
            );
        });

    return (
        <div>
            <h1>Activity Summary</h1>
            <Dropdown
                selection
                search
                options={weekOptions}
                value={weeksAgo}
                onChange={(e, { value }) => setWeeksAgo(value)}
            />
            <Segment.Group horizontal>
                <Segment>
                    <h4>Activities</h4>
                    <List style={{ textAlign: "left" }}>
                        <List.Item>Number of Activities: {number}</List.Item>
                        <List.Item style={style}>
                            Total Active Minutes: {totalDuration}
                        </List.Item>
                        <List.Item style={style}>
                            Average Duration: {roundTwo(totalDuration / number)}
                        </List.Item>
                        <List.Item style={style}>
                            Average Intensity:{" "}
                            {roundTwo(totalIntensity / number)}
                        </List.Item>
                        <List.Item style={style}>
                            Average Rating: {roundTwo(totalRating / number)}
                        </List.Item>
                    </List>
                </Segment>
                <Segment>
                    <h4>Instructors</h4>
                    <Card.Group>{instructorCards}</Card.Group>
                </Segment>
                <Segment>
                    <h4>Locations</h4>
                    <Card.Group>{locationCards}</Card.Group>
                </Segment>
            </Segment.Group>
        </div>
    );
}

export default DataTable;
