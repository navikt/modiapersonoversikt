import FetchMock from 'yet-another-fetch-mock';
import { SaksbehandlerInnstillinger } from '../redux/innstillinger';

let innstillinger: SaksbehandlerInnstillinger = {
    sistLagret: '2020-04-07T12:12:54',
    innstillinger: {
        defaultTagsStandardtekster: 'sto'
    }
};

export function setupSaksbehandlerInnstillingerMock(mock: FetchMock) {
    mock.get(
        '/modiapersonoversikt-innstillinger/api/innstillinger',
        (req, res, ctx) => res(ctx.delay(500), ctx.json(innstillinger))
        // ResponseUtils.delayed(500, () => Promise.resolve({ status: 404 }))
    );

    mock.post('/modiapersonoversikt-innstillinger/api/innstillinger', (req, res, ctx) => {
        innstillinger = {
            sistLagret: new Date().toISOString(),
            innstillinger: req.body
        };
        return res(ctx.status(200), ctx.json(innstillinger));
    });
}
