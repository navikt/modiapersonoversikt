import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';
import renderDecoratorHead from './decorator';
import { parseUrlForPersonIKontekst } from './utils/urlUtils';

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);

const fodselsnummer = parseUrlForPersonIKontekst(window.location);
renderDecoratorHead(fodselsnummer);

export { default as Visittkort } from './components/StandAloneVisittkort/VisittKortStandAlone';
