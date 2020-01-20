import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from './AppContainer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    ReactDOM.render(<AppContainer />, div);
});
