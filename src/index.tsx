import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import renderDecoratorHead from './menyConfig';

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);

renderDecoratorHead();
