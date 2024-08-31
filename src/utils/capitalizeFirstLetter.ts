/**
 * Function that capitalizes the first letter of a string
 * @param {string} value - The string to be capitalized
 * @returns {string} - The string with the first letter in uppercase
 */
const capitalizeFirstLetter = (value: string): string =>
    value.toLowerCase().charAt(0).toUpperCase() + value.slice(1);

export { capitalizeFirstLetter };
