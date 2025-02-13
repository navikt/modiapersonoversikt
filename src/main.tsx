import './extra-polyfills';
import { createRoot } from 'react-dom/client';
import './index.css';
import './index.less';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRouter } from './router';
import { initAmplitude } from './utils/amplitude';
import { initializeObservability } from './utils/observability';

if (import.meta.env.DEV) {
    window.applicationFeatureToggles = {
        enableFaro: true
    };
}

initAmplitude();
initializeObservability();

const router = createRouter();

let preRenderPromise: Promise<unknown> = Promise.resolve();

if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
    console.log('import worker code');
    preRenderPromise = import('./mock/browser.js').then(({ worker }) => {
        return worker.start({
            serviceWorker: {
                url: `${import.meta.env.BASE_URL || '/'}mockServiceWorker.js`
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
