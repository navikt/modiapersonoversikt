import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import Routing from './routes/routing';
import UnderArbeid from '../components/underarbeid/UnderArbeid';
import { setupMock } from '../mock/setup-mock';
import { personOversiktTheme } from '../themes/personOversiktTheme';
import reducers from '../redux/reducer';
import { mockEnabled } from '../api/config';
import AppWrapper, { Content } from './AppWrapper';
import Eventlistener from './Eventlistener';

if (mockEnabled === 'true') {
    setupMock();
}

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

class App extends React.Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={personOversiktTheme}>
                    <AppWrapper>
                        <nav id="header" />
                        <BrowserRouter>
                            <Content>
                                <Eventlistener/>
                                <Routing/>
                            </Content>
                        </BrowserRouter>
                        <UnderArbeid />
                    </AppWrapper>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
