import { useState } from "react";
import { Segment, Dropdown } from "semantic-ui-react";
import { getDate } from "../datetime";
import CanvasJSReact from "@canvasjs/react-charts";
import weekOptions from "../weeks";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const chartWeeks = [...weekOptions].splice(1);
chartWeeks.unshift({
    key: -1,
    text: "Previous Ten Weeks",
    value: -1,
});

function ColumnChart({ user }) {
    const [weeksAgo, setWeeksAgo] = useState(-1);
    const [chartType, setChartType] = useState(0);
    const week = 7 * 24 * 60 * 60 * 1000;

    const chartTypes = [
        { key: 0, text: "Minutes", value: 0 },
        { key: 1, text: "Intensity", value: 1 },
        { key: 2, text: "Rating", value: 2 },
    ];

    const typeLabel = chartTypes.filter((item) => item.key === chartType)[0]
        .text;

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

    const activeLocations = activeActivities
        .map((act, index) => {
            return {
                key: index,
                text: act.location.name,
                value: act.location.name,
            };
        })
        .filter((act, index, arr) => {
            return (
                arr.map((obj) => obj["value"]).indexOf(act["value"]) === index
            );
        });

    const typeLocationData = [
        {
            type: 0,
            data: activeLocations.map((loc) => {
                const locationActivities = activeActivities.filter((act) => {
                    return loc.value === act.location.name;
                });
                const total = locationActivities.reduce(
                    (n, { duration }) => n + duration,
                    0
                );
                return {
                    label:
                        loc.value.length < 9
                            ? loc.value
                            : loc.value.substring(0, 8) + "...",
                    y: total / locationActivities.length,
                };
            }),
        },
        {
            type: 1,
            data: activeLocations.map((loc) => {
                const locationActivities = activeActivities.filter((act) => {
                    return loc.value === act.location.name;
                });
                const total = locationActivities.reduce(
                    (n, { intensity }) => n + intensity,
                    0
                );
                return {
                    label:
                        loc.value.length < 9
                            ? loc.value
                            : loc.value.substring(0, 8) + "...",
                    y: total / locationActivities.length,
                };
            }),
        },
        {
            type: 2,
            data: activeLocations.map((loc) => {
                const locationActivities = activeActivities.filter((act) => {
                    return loc.value === act.location.name;
                });
                const total = locationActivities.reduce(
                    (n, { user_rating }) => n + user_rating,
                    0
                );
                return {
                    label:
                        loc.value.length < 9
                            ? loc.value
                            : loc.value.substring(0, 8) + "...",
                    y: total / locationActivities.length,
                };
            }),
        },
    ];

    const locationOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Location Averages",
        },
        axisY: {
            title: typeLabel,
            minimum: 0,
        },
        axisX: {
            interval: 1,
            labelAngle: 20,
        },
        data: [
            {
                type: "column",
                dataPoints: typeLocationData.filter(
                    (data) => chartType === data.type
                )[0].data,
            },
        ],
    };

    return (
        <Segment>
            <div>
                <span style={{ padding: "10px" }}>
                    {"Time Range:  "}
                    <Dropdown
                        selection
                        inline
                        options={chartWeeks}
                        value={weeksAgo}
                        onChange={(e, { value }) => {
                            setWeeksAgo(value);
                        }}
                    />
                </span>
                <span style={{ padding: "10px" }}>
                    {"Chart Type:  "}
                    <Dropdown
                        selection
                        inline
                        options={chartTypes}
                        value={chartType}
                        onChange={(e, { value }) => setChartType(value)}
                    />
                </span>
            </div>
            <CanvasJSChart options={locationOptions} />
        </Segment>
    );
}

export default ColumnChart;
