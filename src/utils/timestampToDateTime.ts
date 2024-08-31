/**
 * Converts a Unix timestamp to a JavaScript Date object
 *
 * @param {number | string} timestamp - The Unix timestamp to convert
 * @returns {number} A date string in format DD/MM/YYYY - HH:MM
 */
const timestampToDateTime = (timestamp: number | string, timezone?: number): string => {
    const date = new Date(timestamp);
    if (timezone) date.setTime(date.getTime() + timezone * 60 * 60 * 1000);
    const offset = date.getTimezoneOffset();
    const correctedDate = new Date(date.getTime() + offset * 60000);
    const day = String(correctedDate.getDate()).padStart(2, "0");
    const month = String(correctedDate.getMonth() + 1).padStart(2, "0");
    const hour = String(correctedDate.getHours()).padStart(2, "0");
    const minute = String(correctedDate.getMinutes()).padStart(2, "0");
    return `${day}/${month} - ${hour}:${minute}`;
};

const timestampToDateTimeWithYearAndSeconds = (timestamp: number | string): string => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear() + 1).padStart(4, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hour}:${minute}:${seconds}`;
};

export { timestampToDateTime, timestampToDateTimeWithYearAndSeconds };
