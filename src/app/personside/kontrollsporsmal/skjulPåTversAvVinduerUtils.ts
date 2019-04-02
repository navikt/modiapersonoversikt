import moment from 'moment';
import * as Cookies from 'js-cookie';

const skjulForCookieNavn = 'SkjulKontrollSpørsmålFor';
const skjulVedPlukkCookieNavn = 'SkjulKontrollSpørsmålJobberMedPlukk';

export function settSkjulKontrollspørsmålPåTversAvVinduerForBrukerCookie(fnr: string) {
    const omEnTime = moment()
        .add(1, 'hour')
        .toDate();
    Cookies.set(skjulForCookieNavn, fnr, { expires: omEnTime });
}

export function kontrollspørsmålHarBlittLukketForBruker(fnr: string): boolean {
    const cookie = Cookies.get(skjulForCookieNavn);
    if (cookie && cookie === fnr) {
        return true;
    }
    return false;
}

export function settJobberMedSpørsmålOgSvar() {
    Cookies.set(skjulVedPlukkCookieNavn, 'true');
}

export function settJobberIkkeMedSpørsmålOgSvar() {
    Cookies.remove(skjulVedPlukkCookieNavn);
}

export function jobberMedSpørsmålOgSvar() {
    const cookie = Cookies.get(skjulVedPlukkCookieNavn);
    if (cookie && cookie === 'true') {
        return true;
    }
    return false;
}
