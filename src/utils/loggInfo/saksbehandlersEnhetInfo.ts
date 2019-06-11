import * as Cookies from 'js-cookie';
import { getSaksbehandlerInstillingerCookieNavn } from './getSaksbehandlerIdent';
import { mockEnabled } from '../../api/config';

export function getSaksbehandlerEnhet(): string | undefined {
    if (mockEnabled) {
        return '1234';
    }
    const cookienavn = getSaksbehandlerInstillingerCookieNavn();
    if (cookienavn) {
        return Cookies.get()[cookienavn];
    }
    return undefined;
}

export function erKontaktsenter(): boolean | undefined {
    const enhet = getSaksbehandlerEnhet();
    if (enhet) {
        if (enhet.slice(0, 2) === '41') {
            return true;
        } else {
            return false;
        }
    }
    return undefined;
}
