export function convertDateTime(datetime: string): string {
    const date = new Date(datetime);

    const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    return formattedDate;
}

export function getTime(datetime: string): string {
    const date = new Date(datetime);

    const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric'
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
    return formattedTime;
}