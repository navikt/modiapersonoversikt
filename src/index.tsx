import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import renderDecoratorHead from './decorator';
import { parseUrlForPersonIKontekst } from './utils/urlUtils';
import VisittkortStandAlone from './components/standalone/VisittKort';

ReactDOM.render(
    <VisittkortStandAlone fødselsnummer={'10108000398'}/>,
    document.getElementById('root') as HTMLElement
);

const fodselsnummer = parseUrlForPersonIKontekst(window.location);
renderDecoratorHead(fodselsnummer);
