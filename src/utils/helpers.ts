export function formatNumber(format: string, streng: string) {
    let result = '';

    let strengIndex = 0;
    for (let i = 0; i < format.length; i++) {
        if (format[i] === '#') {
            result += streng[strengIndex++];
        } else {
            result += format[i];
        }
    }

    return result;
}