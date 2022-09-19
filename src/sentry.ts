import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
    const isProd = window.location.host === 'app.adeo.no';
    Sentry.init({
        dsn: 'https://5f3951672e1b49b5a8bca188bf4ad44f@sentry.gc.nav.no/148',
        integrations: [
            new BrowserTracing({
                routingInstrumentation: Sentry.reactRouterV5Instrumentation(window.history)
            })
        ],
        environment: isProd ? 'prod' : 'preprod',
        release: '$env{APP_VERSION}',
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 0.05
    });
}
