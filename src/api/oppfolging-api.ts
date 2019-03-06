import { apiBaseUri } from './config';
import { DetaljertOppfolging, Oppfolging } from '../models/oppfolging';
import { formaterTilISO8601Date } from '../utils/dateUtils';

export function getOppfolging(fodselsnummer: string): Promise<Oppfolging> {
    const uri = `${apiBaseUri}/oppfolging/${fodselsnummer}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}

export function getDetaljertOppfolging(
    fodselsnummer: string,
    startDato?: Date,
    sluttDato?: Date
): Promise<DetaljertOppfolging> {
    const uri = `${apiBaseUri}/oppfolging/${fodselsnummer}/ytelserogkontrakter${lagQueryParametre(
        startDato,
        sluttDato
    )}`;
    return fetch(uri, { credentials: 'include' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}

function lagQueryParametre(startDato?: Date, sluttDato?: Date): string {
    if (startDato && sluttDato) {
        return `?startDato=${formaterTilISO8601Date(startDato)}&sluttDato=${formaterTilISO8601Date(sluttDato)}`;
    } else {
        return '';
    }
}
