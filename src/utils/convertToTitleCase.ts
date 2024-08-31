/**
 * Function that converts a string to Title Case format
 * @param {string} value - The string to be converted to Title Case
 * @returns {string} - The string in Title Case format
 */
const convertToTitleCase = (value: string): string =>
    value
        ?.toLowerCase()
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export { convertToTitleCase };
