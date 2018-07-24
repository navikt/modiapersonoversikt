import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { StaticRouter } from 'react-router';

import { personOversiktTheme } from '../../themes/personOversiktTheme';
import reducers from '../../redux/reducers';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import HentOppgaveKnapp from '../../app/personside/dialogpanel/HentOppgaveKnapp';

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

if (mockEnabled === 'true') {
    setupMock();
}

class HentOppgaveKnappStandalone extends React.Component {

    render() {
        return (
            <ErrorBoundary>
                <Provider store={store}>
                    <ThemeProvider theme={personOversiktTheme}>
                        <StaticRouter>
                            <HentOppgaveKnapp />
                        </StaticRouter>
                    </ThemeProvider>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default HentOppgaveKnappStandalone;