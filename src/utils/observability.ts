import { getWebInstrumentations, initializeFaro, Meta, ReactRouterHistory } from '@grafana/faro-react';
import { getEnvFromHost } from './environment';
import { getWindowFeature } from './featureToggles';
const customPageMeta: () => Pick<Meta, 'page'> = () => {
    const maskedUrl = location.href.replaceAll(/\d{11}/g, '***********');

    return {
        page: {
            url: maskedUrl
        }
    };
};

// eslint-disable-next-line
export const initializeObservability = (history: ReactRouterHistory) => {
    if (!getWindowFeature('enableFaro') && !import.meta.env.VITE_GRAFANA_COLLECTOR) return;

    const env = getEnvFromHost();
    if (!['q2'].includes(env) && !import.meta.env.VITE_GRAFANA_COLLECTOR) {
        console.info('Not running in GCP, web observability disabled');
    }

    initializeFaro({
        url:
            (import.meta.env.VITE_GRAFANA_COLLECTOR as string) ??
            (env === 'prod' ? 'https://telemetry.nav.no/collect' : 'https://telemetry.ekstern.dev.nav.no/collect'),
        app: {
            name: 'modiapersonoversikt'
        },
        metas: [customPageMeta],
        paused: !import.meta.env.PROD,
        instrumentations: [
            ...getWebInstrumentations()
            // Disable react integration to nok leak fnr in URLs. This can be reenabled when we are
            // certain we never recieve any URLs with fnr.
            //
            // new ReactIntegration({
            //     router: {
            //         version: ReactRouterVersion.V5,
            //         dependencies: {
            //             history,
            //             Route
            //         }
            //     }
            // })
        ],
        ignoreUrls: [/\d{11}/]
    });
};
