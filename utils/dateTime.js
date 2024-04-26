export function getDateTime(dateString){
    const dateObject = new Date(dateString);
    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();

    return `${date} ${time}`;
}