import FetchMock, { JSONObject, ResponseUtils } from 'yet-another-fetch-mock';
import { SaksbehandlerInnstillinger } from '../redux/innstillinger';

let innstillinger: SaksbehandlerInnstillinger & JSONObject = {
    sistLagret: '2020-04-07T12:12:54',
    innstillinger: {
        defaultTagsStandardtekster: 'sto'
    }
};

export function setupSaksbehandlerInnstillingerMock(mock: FetchMock) {
    mock.get(
        '/modiapersonoversikt-innstillinger/api/innstillinger',
        ResponseUtils.delayed(500, () => ResponseUtils.jsonPromise(innstillinger))
        // ResponseUtils.delayed(500, () => Promise.resolve({ status: 404 }))
    );

    mock.post(
        '/modiapersonoversikt-innstillinger/api/innstillinger',
        ResponseUtils.delayed(500, ({ body }) => {
            innstillinger = {
                sistLagret: new Date().toISOString(),
                innstillinger: body
            };
            return Promise.resolve({
                status: 200,
                body: JSON.stringify(innstillinger)
            });
        })
    );
}
