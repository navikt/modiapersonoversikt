import {
    getWebInstrumentations,
    initializeFaro,
    ReactIntegration,
    ReactRouterHistory,
    ReactRouterVersion
} from '@grafana/faro-react';
import { Route } from 'react-router-dom';
import { getEnvFromHost } from './environment';
import { getWindowFeature } from './featureToggles';

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
        paused: !import.meta.env.PROD,
        instrumentations: [
            ...getWebInstrumentations(),
            new ReactIntegration({
                router: {
                    version: ReactRouterVersion.V5,
                    dependencies: {
                        history,
                        Route
                    }
                }
            })
        ]
    });
};
