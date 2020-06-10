import FetchMock, { JSONObject } from 'yet-another-fetch-mock';

type Context = { aktivEnhet: string | null; aktivBruker: string | null };
const context: Context = { aktivEnhet: '', aktivBruker: '' };

export const enheter = [
    { enhetId: '0219', navn: 'NAV Bærum' },
    { enhetId: '4100', navn: 'NKS' },
    { enhetId: '0118', navn: 'NAV Aremark' },
    { enhetId: '0604', navn: 'NAV Kongsberg' },
    { enhetId: '0602', navn: 'NAV Drammer' }
];

class VoidWebSocket {
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
}

export function setupWsControlAndMock(mock: FetchMock) {
    (window as any).WebSocket = VoidWebSocket;

    mock.post('/modiacontextholder/api/context', ({ body }) => {
        if (body.eventType === 'NY_AKTIV_ENHET') {
            context.aktivEnhet = body.verdi;
            return Promise.resolve({ status: 200 });
        } else if (body.eventType === 'NY_AKTIV_BRUKER') {
            context.aktivBruker = body.verdi;
            return Promise.resolve({ status: 200 });
        } else {
            return Promise.resolve({ status: 500 });
        }
    });

    mock.delete('/modiacontextholder/api/context', () => {
        context.aktivBruker = null;
        context.aktivEnhet = null;
        return {};
    });

    mock.get('/modiacontextholder/api/context/aktivenhet', () => ({
        aktivEnhet: context.aktivEnhet,
        aktivBruker: null
    }));

    mock.delete('/modiacontextholder/api/context/aktivbruker', () => {
        context.aktivBruker = null;
        return {};
    });

    mock.get('/modiacontextholder/api/context/aktivbruker', () => ({
        aktivEnhet: null,
        aktivBruker: context.aktivBruker
    }));

    mock.get('/modiacontextholder/api/context', () => ({
        aktivEnhet: context.aktivEnhet,
        aktivBruker: context.aktivBruker
    }));

    const me: JSONObject = {
        ident: 'Z999999',
        navn: 'Fornavn Ettersen',
        fornavn: 'Fornavn',
        etternavn: 'Ettersen',
        enheter: enheter
    };

    mock.get('/modiacontextholder/api/decorator', me);

    mock.get('https://app-q0.adeo.no/aktoerregister/api/v1/identer', args => {
        const fnr = (args.init!.headers! as Record<string, string>)['Nav-Personidenter'];
        return {
            [fnr]: {
                feilmelding: null,
                identer: [{ gjeldende: true, ident: `000${fnr}000`, identgruppe: 'AktoerId' }]
            }
        };
    });
}
