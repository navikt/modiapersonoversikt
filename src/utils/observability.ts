import {
    getWebInstrumentations,
    initializeFaro,
    Instrumentation,
    Meta,
    ReactIntegration,
    ReactRouterHistory,
    ReactRouterVersion
} from '@grafana/faro-react';
import { Route } from 'react-router-dom';
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

export const initializeObservability = (history: ReactRouterHistory) => {
    if (!getWindowFeature('enableFaro') && !import.meta.env.VITE_GRAFANA_COLLECTOR && !import.meta.env.DEV) return;

    const env = getEnvFromHost();

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
            ...getWebInstrumentations(),
            // Disable react integration to nok leak fnr in URLs. This can be reenabled when we are
            // certain we never recieve any URLs with fnr.
            //
            env !== 'prod' &&
                new ReactIntegration({
                    router: {
                        version: ReactRouterVersion.V5,
                        dependencies: {
                            history,
                            Route
                        }
                    }
                })
        ].filter((v): v is Instrumentation => !!v),
        ignoreUrls: [/\d{11}/]
    });
};
