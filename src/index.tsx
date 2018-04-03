import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'babel-polyfill';

import App from './app/App';
import './index.css';
import renderDecoratorHead from './menyConfig';
import { parseUrlForPersonIKontekst } from './utils/urlUtils';

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);

const fodselsnummer = parseUrlForPersonIKontekst(window.location);
renderDecoratorHead(fodselsnummer);
