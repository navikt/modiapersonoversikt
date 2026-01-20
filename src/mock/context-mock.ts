import { HttpResponse, http, type PathParams } from 'msw';

const AREMARK = '10108000398';

class ContextStorage {
    public set aktivBruker(verdi: string | null) {
        localStorage.setItem('context-bruker', verdi ?? '');
    }
    public get aktivBruker() {
        return localStorage.getItem('context-bruker') ?? AREMARK;
    }
    public set aktivEnhet(verdi: string | null) {
        localStorage.setItem('context-enhet', verdi ?? '');
    }
    public get aktivEnhet() {
        return localStorage.getItem('context-enhet') ?? enheter[0].enhetId;
    }
}

const context = new ContextStorage();

export const enheter = [
    { enhetId: '0219', navn: 'NAV Bærum', type: 'LOKAL' },
    { enhetId: '4100', navn: 'NKS', type: 'OKONOMI' },
    { enhetId: '0118', navn: 'NAV Aremark', type: 'KO' },
    { enhetId: '0604', navn: 'NAV Kongsberg', type: 'DIR' },
    { enhetId: '0602', navn: 'NAV Drammer', type: 'IT' }
];

type ContextRequest = {
    eventType: 'NY_AKTIV_ENHET' | 'NY_AKTIV_BRUKER';
    verdi: string;
};

export function getContextHandlers() {
    const baseUrl = import.meta.env.BASE_URL;
    const me = {
        ident: 'Z999999',
        navn: 'Kari Etternavn',
        fornavn: 'Kari',
        etternavn: 'Etternavn',
        enheter: enheter
    };

    return [
        http.post<PathParams, ContextRequest>(`${baseUrl}proxy/modiacontextholder/api/context`, async ({ request }) => {
            const body = await request.json();
            if (body.eventType === 'NY_AKTIV_ENHET') {
                context.aktivEnhet = body.verdi;
                return HttpResponse.json(null);
            }
            if (body.eventType === 'NY_AKTIV_BRUKER') {
                context.aktivBruker = body.verdi;
                return HttpResponse.json(null);
            }
            return HttpResponse.json(null, { status: 500 });
        }),

        http.delete(`${baseUrl}proxy/modiacontextholder/api/context`, () => {
            context.aktivBruker = null;
            context.aktivEnhet = null;
            return HttpResponse.json(null);
        }),

        http.get(`${baseUrl}proxy/modiacontextholder/api/context/aktivenhet`, () =>
            HttpResponse.json({
                aktivEnhet: context.aktivEnhet,
                aktivBruker: null
            })
        ),

        http.get(`${baseUrl}proxy/modiacontextholder/api/context/v2/aktivenhet`, () =>
            HttpResponse.json({
                aktivEnhet: context.aktivEnhet
            })
        ),
        http.delete(`${baseUrl}proxy/modiacontextholder/api/context/aktivbruker`, () => {
            context.aktivBruker = null;
            return HttpResponse.json(null);
        }),

        http.get(`${baseUrl}proxy/modiacontextholder/api/context/aktivbruker`, () =>
            HttpResponse.json({
                aktivEnhet: null,
                aktivBruker: context.aktivBruker
            })
        ),

        http.get(`${baseUrl}proxy/modiacontextholder/api/context/v2/aktivbruker`, () =>
            HttpResponse.json({
                aktivBruker: context.aktivBruker
            })
        ),

        http.get(`${baseUrl}proxy/modiacontextholder/api/context`, () =>
            HttpResponse.json({
                aktivEnhet: context.aktivEnhet,
                aktivBruker: context.aktivBruker
            })
        ),

        http.get(`${baseUrl}proxy/modiacontextholder/api/decorator/aktor/:fnr`, ({ params }) =>
            HttpResponse.json({ fnr: params.fnr, aktorId: `0000${params.fnr as string}0000` })
        ),

        http.get(`${baseUrl}proxy/modiacontextholder/api/decorator`, () => HttpResponse.json(me))
    ];
}
