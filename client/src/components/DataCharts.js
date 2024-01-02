import { useState } from "react";
import { Dropdown, Segment } from "semantic-ui-react";
import weekOptions from "../weeks";
import colors from "../colors";
import { getDate } from "../datetime";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const chartWeeks = [...weekOptions].splice(1);
chartWeeks.unshift({
    key: -1,
    text: "Previous Ten Weeks",
    value: -1,
});

function DataCharts({ user }) {
    const [weeksAgo, setWeeksAgo] = useState(-1);
    const [category, setCategory] = useState("All");
    const [locWeeksAgo, setLocWeeksAgo] = useState(-1);
    const [chartType, setChartType] = useState(0);
    const week = 7 * 24 * 60 * 60 * 1000;
    const day = week / 7;
    const headDate = new Date() - weeksAgo * week;
    const days = [
        new Date(headDate),
        headDate - day,
        headDate - day * 2,
        headDate - day * 3,
        headDate - day * 4,
        headDate - day * 5,
        headDate - day * 6,
    ];
    const weeks = [
        new Date(),
        new Date() - week,
        new Date() - week * 2,
        new Date() - week * 3,
        new Date() - week * 4,
        new Date() - week * 5,
        new Date() - week * 6,
        new Date() - week * 7,
        new Date() - week * 8,
        new Date() - week * 9,
    ];

    const chartTypes = [
        { key: 0, text: "Minutes", value: 0 },
        { key: 1, text: "Intensity", value: 1 },
        { key: 2, text: "Rating", value: 2 },
        { key: 3, text: "Quality", value: 3 },
    ];

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

    const activeTypes = activeActivities
        .map((act, index) => {
            return { key: index, text: act.category, value: act.category };
        })
        .filter((act, index, arr) => {
            return (
                arr.map((obj) => obj["value"]).indexOf(act["value"]) === index
            );
        });

    const daysData = activeTypes
        .filter((act) => {
            if (category === "All") {
                return true;
            } else {
                return act.value === category;
            }
        })
        .map((item, index) => {
            return {
                type: "stackedColumn",
                showInLegend: true,
                name: item.value,
                color: colors[index],
                dataPoints: days.map((elem) => {
                    return {
                        y: activeActivities
                            .filter((act) => {
                                return (
                                    act.category === item.value &&
                                    getDate(act.start_time) <= elem &&
                                    getDate(act.start_time) > elem - day
                                );
                            })
                            .reduce((n, { duration }) => n + duration, 0),
                        x: elem,
                    };
                }),
            };
        });

    const weeksData = activeTypes
        .filter((act) => {
            if (category === "All") {
                return true;
            } else {
                return act.value === category;
            }
        })
        .map((item, index) => {
            return {
                type: "stackedColumn",
                showInLegend: true,
                name: item.value,
                color: colors[index],
                dataPoints: weeks.map((elem) => {
                    return {
                        y: activeActivities
                            .filter((act) => {
                                return (
                                    act.category === item.value &&
                                    getDate(act.start_time) <= elem &&
                                    getDate(act.start_time) > elem - week
                                );
                            })
                            .reduce((n, { duration }) => n + duration, 0),
                        x: elem,
                    };
                }),
            };
        });

    function toolTipContent(e) {
        var str = "";
        var total = 0;
        var str2, str3;
        for (var i = 0; i < e.entries.length; i++) {
            var str1 =
                '<span style= "color:' +
                e.entries[i].dataSeries.color +
                '"> ' +
                e.entries[i].dataSeries.name +
                "</span>: <strong>" +
                e.entries[i].dataPoint.y +
                "</strong>min<br/>";
            total = e.entries[i].dataPoint.y + total;
            str = str.concat(str1);
        }
        str2 =
            '<span style = "color:DodgerBlue;"><strong>' +
            getDate(e.entries[0].dataPoint.x).toISOString().slice(0, 10) +
            "</strong></span><br/>";
        total = Math.round(total * 100) / 100;
        str3 =
            '<span style = "color:Tomato">Total:</span><strong> ' +
            total +
            "</strong>min<br/>";
        return str2.concat(str).concat(str3);
    }

    const minutesOptions = {
        animationEnabled: true,
        title: {
            text: "Active Minutes by Category",
            fontFamily: "arial black",
            fontColor: "#695A42",
        },
        axisX: {
            valueFormatString: "M/D/Y",
        },
        axisY: {
            suffix: "min",
            gridColor: "#B6B1A8",
            tickColor: "#B6B1A8",
        },
        toolTip: {
            shared: true,
            content: toolTipContent,
        },
        data: weeksAgo === -1 ? weeksData : daysData,
    };

    const locationData = [];

    const locationOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Location Results",
        },
        data: [
            {
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: locationData,
            },
        ],
    };

    return (
        <div>
            <h1>Data Charts</h1>
            <Segment.Group>
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
                                    setCategory("All");
                                }}
                            />
                        </span>
                        <span style={{ padding: "10px" }}>
                            {"Activity:  "}
                            <Dropdown
                                selection
                                inline
                                options={[
                                    { key: -1, text: "All", value: "All" },
                                    ...activeTypes,
                                ]}
                                value={category}
                                onChange={(e, { value }) => setCategory(value)}
                            />
                        </span>
                    </div>
                    <CanvasJSChart options={minutesOptions} />
                </Segment>
                <Segment>
                    <div>
                        <span style={{ padding: "10px" }}>
                            {"Time Range:  "}
                            <Dropdown
                                selection
                                inline
                                options={chartWeeks}
                                value={locWeeksAgo}
                                onChange={(e, { value }) => {
                                    setLocWeeksAgo(value);
                                    setCategory("All");
                                }}
                            />
                        </span>
                        <span style={{ padding: "10px" }}>
                            {"Activity:  "}
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
            </Segment.Group>
        </div>
    );
}

export default DataCharts;
