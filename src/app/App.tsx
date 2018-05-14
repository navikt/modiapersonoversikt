import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import Routing from './routes/routing';
import UnderArbeid from '../components/underarbeid/UnderArbeid';
import { setupMock } from '../mock/setup-mock';
import { personOversiktTheme } from '../themes/personOversiktTheme';
import reducers from '../redux/reducer';
import { mockEnabled } from '../api/config';
import AppWrapper from './AppWrapper';

interface AppProps {

}

if (mockEnabled === 'true') {
    setupMock();
}

const history = createBrowserHistory();
const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware, routerMiddleware(history))
);

class App extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={personOversiktTheme}>
                    <AppWrapper>
                        <nav id="header" />
                        <ConnectedRouter history={history}>
                            <Routing />
                        </ConnectedRouter>
                        <UnderArbeid />
                    </AppWrapper>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
