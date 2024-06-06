import './extra-polyfills';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import AppContainer from './app/AppContainer';
import { setupTimeSpentMetrics } from './utils/timeSpentMetrics';

declare global {
    interface Window {
        erChatvisning: boolean;
        applicationFeatureToggles: Record<string, never>;
    }
}
window.erChatvisning = (document.location.search + document.location.hash).includes('chatvisning');

setupTimeSpentMetrics();

if (import.meta.env.DEV) {
    window.applicationFeatureToggles = {};
}

if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
    await import('./mock');
}
ReactDOM.render(<AppContainer />, document.getElementById('root') as HTMLElement);
