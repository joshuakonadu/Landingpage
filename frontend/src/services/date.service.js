export const convertISODate = date => {
    return new Date(date)
        .toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' })
        .replace(",", " um")
        .concat(" Uhr")
}