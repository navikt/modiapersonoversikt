import * as Cookies from 'js-cookie';
import moment from 'moment';

const temaValgCookieNavn = 'temaValg';

export function getTemaFraCookie(): string | undefined {
    return Cookies.get()[temaValgCookieNavn];
}

export function setTemaCookie(tema: string) {
    const omEnUke = moment()
        .add(1, 'week')
        .startOf('day')
        .toDate();
    Cookies.set(temaValgCookieNavn, tema, { expires: omEnUke });
}
