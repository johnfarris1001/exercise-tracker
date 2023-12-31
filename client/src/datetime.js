export function getDate(datetime) {
    const date = new Date(datetime);
    return date;
}

export function getNowDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    return new Date(now.getTime() - offset * 60 * 1000);
}

export function createDatetime(date, time) {
    const localDate = date + "T" + time + ":00.000Z";
    const now = new Date(localDate);
    const offset = now.getTimezoneOffset();
    const utc = new Date(now.getTime() + offset * 60 * 1000);
    return utc.toISOString();
}

export function formatTime(time) {
    return time === 0 ? "00" : time < 10 ? `0${time}` : time;
}
