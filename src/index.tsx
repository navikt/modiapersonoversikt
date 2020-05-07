import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './extra-polyfills';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import AppContainer from './app/AppContainer';
import { setupTimeSpentMetrics } from './utils/timeSpentMetrics';

setupTimeSpentMetrics();

ReactDOM.render(<AppContainer />, document.getElementById('root') as HTMLElement);
