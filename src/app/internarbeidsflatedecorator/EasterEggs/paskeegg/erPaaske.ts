import moment from 'moment';

export function erPaaske() {
    const date = moment();
    const month = date.month();
    const day = date.date();
    const year = date.year();

    switch (year) {
        case 2020:
            return day >= 5 && day <= 13 && month === 3;
        case 2021:
            return (day >= 28 && month === 2) || (day <= 5 && month === 3);
        case 2022:
            return day >= 10 && day <= 18 && month === 3;
        case 2023:
            return day >= 2 && day <= 10 && month === 3;
        case 2024:
            return day >= 24 && day <= 31 && month === 2;
        case 2025:
            return day >= 13 && day <= 21 && month === 3;
        case 2026:
            return (day >= 29 && month === 2) || (day <= 6 && month === 3);
        case 2027:
            return day >= 21 && day <= 29 && month === 2;
        default:
            return false;
    }
}
