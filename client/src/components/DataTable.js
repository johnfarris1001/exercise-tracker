import { List, Segment, Card } from "semantic-ui-react";

function DataTable({ user }) {
    console.log(user);
    const number = user.activities.length;
    const totalDuration = user.activities.reduce(
        (n, { duration }) => n + duration,
        0
    );
    const totalIntensity = user.activities.reduce(
        (n, { intensity }) => n + intensity,
        0
    );
    const totalRating = user.activities.reduce(
        (n, { user_rating }) => n + user_rating,
        0
    );

    function roundTwo(num) {
        return Math.round(num * 100) / 100;
    }

    const instructorCards = user.unique_instructors.map((inst) => {
        const activities = user.activities.filter((act) => {
            return inst.id === act.instructor.id;
        });
        const instRating = activities.reduce(
            (n, { user_rating }) => n + user_rating,
            0
        );
        return (
            <Card key={inst.id} fluid>
                <Card.Header>{inst.name}</Card.Header>
                <Card.Meta>Number of Activities: {activities.length}</Card.Meta>
                <Card.Meta>
                    Average Rating: {roundTwo(instRating / activities.length)}
                </Card.Meta>
            </Card>
        );
    });

    const locationCards = user.unique_locations.map((loc) => {
        const activities = user.activities.filter((act) => {
            return loc.id === act.location.id;
        });
        const locRating = activities.reduce(
            (n, { user_rating }) => n + user_rating,
            0
        );
        return (
            <Card key={loc.id} fluid>
                <Card.Header>{loc.name}</Card.Header>
                <Card.Meta>Number of Activities: {activities.length}</Card.Meta>
                <Card.Meta>
                    Average Rating: {roundTwo(locRating / activities.length)}
                </Card.Meta>
            </Card>
        );
    });

    return (
        <div>
            <h1>DataTable</h1>
            <Segment.Group horizontal>
                <Segment>
                    <h4>Activities</h4>
                    <List style={{ textAlign: "left" }}>
                        <List.Item>Number of Activities: {number}</List.Item>
                        <List.Item>
                            Average Duration: {roundTwo(totalDuration / number)}
                        </List.Item>
                        <List.Item>
                            Average Intensity:{" "}
                            {roundTwo(totalIntensity / number)}
                        </List.Item>
                        <List.Item>
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
