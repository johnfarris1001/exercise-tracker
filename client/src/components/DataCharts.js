import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import weekOptions from "../weeks";
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
    const [weeksAgo, setWeeksAgo] = useState(0);
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

    const data = activeTypes.map((item) => {
        return {
            type: "stackedColumn",
            showInLegend: true,
            name: item.value,
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

    const options = {
        animationEnabled: true,
        title: {
            text: "Active Minutes by Category",
            fontFamily: "arial black",
            fontColor: "#695A42",
        },
        axisX: {
            valueFormatString: "DDD",
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
        data: data,
    };

    return (
        <div>
            <h1>Data Charts</h1>
            <Dropdown
                selection
                search
                options={chartWeeks}
                value={weeksAgo}
                onChange={(e, { value }) => setWeeksAgo(value)}
            />
            <CanvasJSChart options={options} />
        </div>
    );
}

export default DataCharts;
