import FetchMock from 'yet-another-fetch-mock';

type Context = { aktivEnhet: string | null; aktivBruker: string | null };
const context: Context = { aktivEnhet: '', aktivBruker: '' };

export const enheter = [
    { enhetId: '0219', navn: 'NAV Bærum' },
    { enhetId: '4100', navn: 'NKS' },
    { enhetId: '0118', navn: 'NAV Aremark' },
    { enhetId: '0604', navn: 'NAV Kongsberg' },
    { enhetId: '0602', navn: 'NAV Drammer' }
];

export function setupWsControlAndMock(mock: FetchMock) {
    const baseUrl = `https://${window.location.host}`;

    mock.post(baseUrl + '/proxy/modiacontextholder/api/context', ({ body }, res, ctx) => {
        if (body.eventType === 'NY_AKTIV_ENHET') {
            context.aktivEnhet = body.verdi;
            return res(ctx.status(200));
        } else if (body.eventType === 'NY_AKTIV_BRUKER') {
            context.aktivBruker = body.verdi;
            return res(ctx.status(200));
        } else {
            return res(ctx.status(500));
        }
    });

    mock.delete(baseUrl + '/proxy/modiacontextholder/api/context', (req, res, ctx) => {
        context.aktivBruker = null;
        context.aktivEnhet = null;
        return res(ctx.status(200));
    });

    mock.get(baseUrl + '/proxy/modiacontextholder/api/context/aktivenhet', (req, res, ctx) =>
        res(
            ctx.json({
                aktivEnhet: context.aktivEnhet,
                aktivBruker: null
            })
        )
    );

    mock.delete(baseUrl + '/proxy/modiacontextholder/api/context/aktivbruker', (req, res, ctx) => {
        context.aktivBruker = null;
        return res(ctx.status(200));
    });

    mock.get(baseUrl + '/proxy/modiacontextholder/api/context/aktivbruker', (req, res, ctx) =>
        res(
            ctx.json({
                aktivEnhet: null,
                aktivBruker: context.aktivBruker
            })
        )
    );

    mock.get(baseUrl + '/proxy/modiacontextholder/api/context', (req, res, ctx) =>
        res(
            ctx.json({
                aktivEnhet: context.aktivEnhet,
                aktivBruker: context.aktivBruker
            })
        )
    );

    mock.get(baseUrl + '/proxy/modiacontextholder/api/decorator/aktor/:fnr', (req, res, ctx) =>
        res(ctx.json({ fnr: req.pathParams.fnr, aktorId: `0000${req.pathParams.fnr}0000` }))
    );

    const me = {
        ident: 'Z999999',
        navn: 'Kari Etternavn',
        fornavn: 'Kari',
        etternavn: 'Etternavn',
        enheter: enheter
    };

    mock.get(baseUrl + '/proxy/modiacontextholder/api/decorator', (req, res, ctx) => res(ctx.json(me)));

    mock.get('https://app-q0.adeo.no/aktoerregister/api/v1/identer', (req, res, ctx) => {
        const fnr = (req.init!.headers! as Record<string, string>)['Nav-Personidenter'];
        return res(
            ctx.json({
                [fnr]: {
                    feilmelding: null,
                    identer: [{ gjeldende: true, ident: `000${fnr}000`, identgruppe: 'AktoerId' }]
                }
            })
        );
    });
}
