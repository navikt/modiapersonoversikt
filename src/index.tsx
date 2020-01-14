import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import App from './app/App';
import { setupTimeSpentMetrics } from './utils/timeSpentMetrics';

setupTimeSpentMetrics();

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
