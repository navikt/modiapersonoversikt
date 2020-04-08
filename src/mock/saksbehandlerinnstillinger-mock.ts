import FetchMock, { JSONObject, ResponseUtils } from 'yet-another-fetch-mock';
import { Innstillinger } from '../redux/innstillinger';

let value: Innstillinger & JSONObject = {
    defaultTagsStandardtekster: 'sto'
};

export function setupSaksbehandlerInnstillingerMock(mock: FetchMock) {
    mock.get(
        '/modiapersonoversikt-innstillinger/api/innstillinger',
        ResponseUtils.delayed(500, () =>
            ResponseUtils.jsonPromise({
                sistLagret: '2020-04-07T12:12:54',
                innstillinger: value
            })
        )
    );

    mock.post(
        '/modiapersonoversikt-innstillinger/api/innstillinger',
        ResponseUtils.delayed(500, ({ body }) => {
            value = body;
            return Promise.resolve({
                status: 200,
                body: JSON.stringify({ sistLagret: '2020-04-07T12:12:54', innstillinger: value })
            });
        })
    );
}
