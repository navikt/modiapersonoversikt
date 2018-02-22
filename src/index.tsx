import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import renderDecoratorHead from './menyConfig';

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
renderDecoratorHead();
