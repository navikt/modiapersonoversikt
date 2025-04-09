import './extra-polyfills';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
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

const router = createRouter();

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
