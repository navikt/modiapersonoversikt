import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { StaticRouter } from 'react-router';

import reducers from '../../redux/reducers';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import HentOppgaveKnapp from '../../app/personside/dialogpanel/HentOppgaveKnapp';

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

if (mockEnabled) {
    setupMock();
}

class HentOppgaveKnappStandalone extends React.Component {

    render() {
        return (
            <ErrorBoundary>
                <Provider store={store}>
                    <StaticRouter>
                        <HentOppgaveKnapp/>
                    </StaticRouter>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default HentOppgaveKnappStandalone;