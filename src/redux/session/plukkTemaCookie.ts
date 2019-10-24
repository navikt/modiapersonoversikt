import * as Cookies from 'js-cookie';
import moment from 'moment';
import { Temagruppe } from '../../models/Temagrupper';

const temaValgCookieNavn = 'plukk-tema';

export function getTemaFraCookie(): Temagruppe | undefined {
    return Cookies.get()[temaValgCookieNavn] as Temagruppe;
}

export function setTemaCookie(tema: Temagruppe) {
    const omEnTime = moment()
        .add(1, 'hour')
        .toDate();
    Cookies.set(temaValgCookieNavn, tema, { expires: omEnTime });
}
