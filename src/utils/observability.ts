import {
    getWebInstrumentations,
    initializeFaro,
    InternalLoggerLevel,
    ReactIntegration,
    ReactRouterVersion
} from '@grafana/faro-react';
import { History } from 'history';
import { Route } from 'react-router-dom';
import { getEnvFromHost } from './environment';
import { getWindowFeature } from './featureToggles';

export const initializeObservability = (history: History) => {
    if (!getWindowFeature('enableFaro') && !import.meta.env.VITE_GRAFANA_COLLECTOR) return;

    const env = getEnvFromHost();
    if (!['q2'].includes(env) && !import.meta.env.VITE_GRAFANA_COLLECTOR) {
        console.info('Not running in GCP, web observability disabled');
    }

    console.log(import.meta.env.VITE_GRAFANA_COLLECTOR);
    initializeFaro({
        url:
            import.meta.env.VITE_GRAFANA_COLLECTOR ??
            (env === 'prod' ? 'https://telemetry.nav.no/collect' : 'https://telemetry.ekstern.dev.nav.no/collect'),
        app: {
            name: 'modiapersonoversikt'
        },
        internalLoggerLevel: InternalLoggerLevel.VERBOSE,
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
