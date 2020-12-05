export const convertISODate = date => {
    const isoDate = new Date(date);
    return `${isoDate.getDay()}.${isoDate.getMonth()}.${isoDate.getFullYear()} um ${isoDate.getUTCHours()}:${isoDate.getUTCMinutes()} Uhr`;
}