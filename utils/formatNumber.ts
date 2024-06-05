export function formatNumber(number) {
    // Check if the number is fractional
    if (number % 1 !== 0) {
        // Format the number to two decimal places
        return number?.toFixed(2);
    } else {
        // If the number is not fractional, convert it to an integer
        return number?.toString();
    }
}