import './extra-polyfills';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './index.less';
import AppContainer from './app/AppContainer';
import { setupTimeSpentMetrics } from './utils/timeSpentMetrics';

declare global {
    interface Window {
        erChatvisning: boolean;
        applicationFeatureToggles: Record<string, boolean>;
        __ENV__: Record<string, string>;
    }
}
window.erChatvisning = (document.location.search + document.location.hash).includes('chatvisning');

setupTimeSpentMetrics();

if (import.meta.env.DEV) {
    window.applicationFeatureToggles = {
        enableFaro: true
    };
}

(async () => {
    if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
        const { worker } = await import('./mock/browser');
        await worker.start({
            serviceWorker: {
                url: `${import.meta.env.VITE_APP_BASE_PATH} + '/mockServiceWorker.js'`
            }
        });
    }

    const container = document.getElementById('root');
    const root = createRoot(container!);

    root.render(<AppContainer />);
})();
