import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './extra-polyfills';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import AppContainer from './app/AppContainer';
import { setupTimeSpentMetrics } from './utils/timeSpentMetrics';

setupTimeSpentMetrics();
if (process.env.REACT_APP_MOCK_ENABLED === 'true') {
    require('./mock');
}

ReactDOM.render(<AppContainer />, document.getElementById('root') as HTMLElement);
