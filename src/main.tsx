import './extra-polyfills';
import { createRoot } from 'react-dom/client';
import './index.css';
import './index.less';
import { createRouter } from './router';
import { StrictMode } from 'react';
import { RouterProvider } from '@tanstack/react-router';

declare global {
    interface Window {
        applicationFeatureToggles: Record<string, boolean>;
        __ENV__: Record<string, string>;
    }
}

if (import.meta.env.DEV) {
    window.applicationFeatureToggles = {
        enableFaro: true
    };
}

if (!window.faro) {
    window.faro = {
        // @ts-expect-error Vi overskriver faro siden error boundarien ikke tar
        // hensyn til at faro ikke er tilgjengelig
        api: {
            pushError: () => {
                console.warn('Not pushing error to grafana. Faro is not initialized.');
            }
        }
    };
}

const router = createRouter();

if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
    const { worker } = await import('./mock/browser');
    await worker.start();
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
