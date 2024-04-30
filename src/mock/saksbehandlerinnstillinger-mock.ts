import FetchMock from 'yet-another-fetch-mock';
import { SaksbehandlerInnstillinger } from '../rest/resources/innstillingerResource';

const localstoreageKey = 'modia-innstillinger-mock';
const finnesILocalStorage = localStorage.getItem(localstoreageKey);
const defaultInnstillinger: SaksbehandlerInnstillinger = {
    sistLagret: '2020-04-07T12:12:54',
    innstillinger: {}
};

let innstillinger: SaksbehandlerInnstillinger =
    finnesILocalStorage !== null ? JSON.parse(finnesILocalStorage) : defaultInnstillinger;

export function setupSaksbehandlerInnstillingerMock(mock: FetchMock) {
    mock.get(`${import.meta.env.BASE_URl}proxy/modia-innstillinger/api/innstillinger`, (req, res, ctx) =>
        res(ctx.json(innstillinger))
    );

    mock.post(`${import.meta.env.BASE_URL}proxy/modia-innstillinger/api/innstillinger`, (req, res, ctx) => {
        innstillinger = {
            sistLagret: new Date().toISOString(),
            innstillinger: req.body
        };
        window.localStorage.setItem(localstoreageKey, JSON.stringify(innstillinger));
        return res(ctx.status(200), ctx.json(innstillinger));
    });
}
