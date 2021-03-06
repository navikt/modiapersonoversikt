import dayjs from 'dayjs';
import * as Cookies from 'js-cookie';

const kontrollSpmErLukketForBrukerCookieNavn = 'KontrollSpmErLukketForBruker';

export function settSkjulKontrollspørsmålPåTversAvVinduerForBrukerCookie(fnr: string) {
    const omEnTime = dayjs()
        .add(1, 'hour')
        .toDate();
    Cookies.set(kontrollSpmErLukketForBrukerCookieNavn, fnr, { expires: omEnTime });
}

export function kontrollspørsmålHarBlittLukketForBruker(fnr: string): boolean {
    const cookie = Cookies.get(kontrollSpmErLukketForBrukerCookieNavn);
    if (cookie && cookie === fnr) {
        return true;
    }
    return false;
}
