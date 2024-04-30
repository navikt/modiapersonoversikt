import './extra-polyfills';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import AppContainer from './app/AppContainer';
import { setupTimeSpentMetrics } from './utils/timeSpentMetrics';
import './window-variabler';
setupTimeSpentMetrics();

if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
    await import('./mock');
}

ReactDOM.render(<AppContainer />, document.getElementById('root') as HTMLElement);
