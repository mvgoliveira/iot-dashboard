/**
 * Function that replaces special characters in a string with their ASCII equivalent
 * @param {string} value - The string to be processed
 * @returns {string} - The string with the special characters replaced
 */
const replaceSpecialChars = (value: string): string =>
    value
        .replace(/[áàâã]/g, "a")
        .replace(/[éèê]/g, "e")
        .replace(/[íï]/g, "i")
        .replace(/[óôõö]/g, "o")
        .replace(/[ú]/g, "u")
        .replace(/[ç]/g, "c");

export { replaceSpecialChars };
