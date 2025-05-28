// utils/date.js
import {
    format,
    parseISO,
    isBefore,
    isAfter,
    isEqual,
    addDays,
    subDays,
    differenceInDays,
} from 'date-fns';

/**
 * Format a Date or ISO string to readable format
 * @param {Date|string} date
 * @param {string} formatStr (e.g., 'MMMM d, yyyy')
 * @returns {string}
 */
export const formatDate = (date, formatStr = 'MMMM d, yyyy') => {
    const parsed = typeof date === 'string' ? parseISO(date) : date;
    return format(parsed, formatStr);
};

/**
 * Compare if first date is before second
 * @param {Date|string} date1
 * @param {Date|string} date2
 * @returns {boolean}
 */
export const isDateBefore = (date1, date2) => {
    return isBefore(new Date(date1), new Date(date2));
};

/**
 * Compare if first date is after second
 * @param {Date|string} date1
 * @param {Date|string} date2
 * @returns {boolean}
 */
export const isDateAfter = (date1, date2) => {
    return isAfter(new Date(date1), new Date(date2));
};

/**
 * Check if two dates are the same (ignoring time)
 * @param {Date|string} date1
 * @param {Date|string} date2
 * @returns {boolean}
 */
export const isSameDate = (date1, date2) => {
    return isEqual(new Date(date1), new Date(date2));
};

/**
 * Add N days to a date
 * @param {Date|string} date
 * @param {number} days
 * @returns {Date}
 */
export const addDaysToDate = (date, days) => {
    return addDays(new Date(date), days);
};

/**
 * Subtract N days from a date
 * @param {Date|string} date
 * @param {number} days
 * @returns {Date}
 */
export const subtractDaysFromDate = (date, days) => {
    return subDays(new Date(date), days);
};

/**
 * Difference in days between two dates
 * @param {Date|string} date1
 * @param {Date|string} date2
 * @returns {number}
 */
export const getDaysDifference = (date1, date2) => {
    return differenceInDays(new Date(date1), new Date(date2));
};
