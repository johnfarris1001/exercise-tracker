export function getDate(datetime) {
    const date = new Date(datetime);
    return date;
}

export function getNowDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    return new Date(now.getTime() - offset * 60 * 1000);
}

export function formatTime(time) {
    return time === 0 ? "00" : time < 10 ? `0${time}` : time;
}

export function createDatetime(date, time) {
    const nonZeroTime = !time ? "00:00" : time;
    const nonZeroDate = !date ? getNowDate().toISOString().split("T")[0] : date;
    const localDate = nonZeroDate + "T" + nonZeroTime + ":00.000Z";
    const now = new Date(localDate);
    const offset = now.getTimezoneOffset();
    const utc = new Date(now.getTime() + offset * 60 * 1000);
    return utc.toISOString();
}
