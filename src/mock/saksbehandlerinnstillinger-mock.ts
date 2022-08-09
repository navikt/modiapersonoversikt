import FetchMock from 'yet-another-fetch-mock';
import { SaksbehandlerInnstillinger } from '../redux/innstillinger';

const localstoreageKey = 'modia-innstillinger-mock';
const finnesILocalStorage = localStorage.getItem(localstoreageKey);
const defaultInnstillinger: SaksbehandlerInnstillinger = {
    sistLagret: '2020-04-07T12:12:54',
    innstillinger: {}
};

let innstillinger: SaksbehandlerInnstillinger =
    finnesILocalStorage !== null ? JSON.parse(finnesILocalStorage) : defaultInnstillinger;

export function setupSaksbehandlerInnstillingerMock(mock: FetchMock) {
    mock.get(
        '/modiapersonoversikt/proxy/modia-innstillinger/api/innstillinger',
        (req, res, ctx) => res(ctx.delay(500), ctx.json(innstillinger))
        // ResponseUtils.delayed(500, () => Promise.resolve({ status: 404 }))
    );

    mock.post('/modiapersonoversikt/proxy/modia-innstillinger/api/innstillinger', (req, res, ctx) => {
        innstillinger = {
            sistLagret: new Date().toISOString(),
            innstillinger: req.body
        };
        window.localStorage.setItem(localstoreageKey, JSON.stringify(innstillinger));
        return res(ctx.status(200), ctx.json(innstillinger));
    });
}
