export function getDateTime(dateString){
    const dateObject = new Date(dateString);
    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();

    return `${date} ${time}`;
}

export function convertUTCToCST(utcDateString) {
    var utcDate = new Date(utcDateString);
    var localTime = utcDate.toLocaleString(undefined, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    console.log(localTime)
    return localTime.toString();
}
