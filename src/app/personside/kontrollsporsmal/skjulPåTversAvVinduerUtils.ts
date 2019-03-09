import moment from 'moment';
import * as Cookies from 'js-cookie';

const cookieNavn = 'SkjulKontrollSpørsmålFor';

export function settSkjulKontrollspørsmålPåTversAvVinduerForBrukerCookie(fnr: string) {
    const omEnTime = moment()
        .add(1, 'hour')
        .toDate();
    Cookies.set(cookieNavn, fnr, { expires: omEnTime });
}

export function kontrollspørsmålHarBlittLukketForBruker(fnr: string): boolean {
    const cookie = Cookies.get(cookieNavn);
    if (cookie && cookie === fnr) {
        return true;
    }
    return false;
}
