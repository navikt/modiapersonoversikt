import { apiBaseUri } from '../../api/config';

async function fetchToJson<T>(url: string): Promise<T> {
    try {
        const resp = await fetch(url, { credentials: 'include', headers: { 'Content-Type': 'application/json' } });
        if (resp.ok) {
            const json = await resp.json();
            return json as T;
        } else {
            throw new Error(resp.statusText);
        }
    } catch (e) {
        throw e;
    }
}

interface AktivEnhetModell {
    aktivEnhet: string;
}

interface AktivBrukerModell {
    aktivBruker: string;
}

interface MeModell {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
}

export function hentIdent(): Promise<string> {
    return fetchToJson<MeModell>(`${apiBaseUri}/hode/me`).then(data => data.ident);
}

export function settValgtEnhet(enhet: string) {
    return fetch(`${apiBaseUri}/hode/velgenhet`, {
        body: enhet,
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function hentAktivEnhet(): Promise<string> {
    return fetchToJson<AktivEnhetModell>(`/modiacontextholder/api/context/aktivenhet`).then(data => {
        return data.aktivEnhet;
    });
}

export function hentAktivBruker(): Promise<string> {
    return fetchToJson<AktivBrukerModell>(`/modiacontextholder/api/context/aktivbruker`).then(data => {
        return data.aktivBruker;
    });
}

export function oppdaterAktivBruker(bruker: string): Promise<Response> {
    return fetch(`/modiacontextholder/api/context`, {
        body: JSON.stringify({
            eventType: 'NY_AKTIV_BRUKER',
            verdi: bruker
        }),
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
