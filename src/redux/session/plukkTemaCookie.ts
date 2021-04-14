import * as Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { Temagruppe } from '../../models/temagrupper';

const temaValgCookieNavn = 'plukk-tema';

export function getTemaFraCookie(): Temagruppe | undefined {
    return Cookies.get()[temaValgCookieNavn] as Temagruppe;
}

export function setTemaCookie(tema: Temagruppe) {
    const omEnTime = dayjs()
        .add(1, 'hour')
        .toDate();
    Cookies.set(temaValgCookieNavn, tema, { expires: omEnTime });
}
