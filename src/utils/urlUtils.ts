import { paths } from '../app/routes/routing';

interface Location {
    pathname: string;
}

export function parseUrlForPersonIKontekst(location: Location): string {
    const splittetUrl = location.pathname.split(`${paths.personUri}/`);
    if (splittetUrl.length >= 2 && splittetUrl[1]) {
        return splittetUrl[1];
    }
    return '';
}
