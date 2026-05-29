import './extra-polyfills';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { setAnalyticsReferrer, setAnalyticsUrl } from 'src/utils/analytics';
import { createRouter } from './router';
import { initializeObservability } from './utils/observability';

const baseUrl = () => {
    if (import.meta.env.BASE_URL.endsWith('/')) {
        return import.meta.env.BASE_URL;
    }
    return `${import.meta.env.BASE_URL}/`;
};

if (import.meta.env.DEV) {
    window.applicationFeatureToggles = {
        enableFaro: true
    };
}

initializeObservability();

export const router = createRouter();
window.__router = router;

router.subscribe('onResolved', (event) => {
    // Setter url og referrer for analytics
    const origin = window.location.origin;
    const currentUrl = origin + event.toLocation.href;

    const referrerUrl = event.fromLocation ? origin + event.fromLocation.href : document.referrer;

    setAnalyticsReferrer(referrerUrl);
    setAnalyticsUrl(currentUrl);
});

let preRenderPromise: Promise<unknown> = Promise.resolve();

if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
    preRenderPromise = import('./mock/browser.js').then(({ worker }) => {
        return worker.start({
            serviceWorker: {
                url: `${baseUrl()}mockServiceWorker.js`
            }
        });
    });
}

preRenderPromise.then(() => {
    const container = document.getElementById('root');
    //biome-ignore lint/style/noNonNullAssertion: The container element is defined in index.html
    const root = createRoot(container!);

    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
});
