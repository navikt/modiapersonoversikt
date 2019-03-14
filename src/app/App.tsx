import * as React from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routing, { paths } from './routes/routing';
import { setupMock } from '../mock/setup-mock';
import reducers from '../redux/reducers';
import { mockEnabled } from '../api/config';
import AppStyle, { ContentStyle } from './AppWrapper';
import ModalWrapper from 'nav-frontend-modal';
import { composeWithDevTools } from 'redux-devtools-extension';
import PersonOppslagHandler from './PersonOppslagHandler/PersonOppslagHandler';
import Decorator from './Decorator';
import StandAloneKomponenter from '../components/standalone/StandAloneKomponenter';

if (mockEnabled) {
    setupMock();
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

function Content() {
    const appRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        ModalWrapper.setAppElement(appRef.current);
    }, []);

    return (
        <>
            <PersonOppslagHandler />
            <AppStyle ref={appRef}>
                <Decorator />
                <ContentStyle>
                    <Routing />
                </ContentStyle>
            </AppStyle>
        </>
    );
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path={`${paths.standaloneKomponenter}/:fnr?`} component={StandAloneKomponenter} />
                    <Route path={'/'} component={Content} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
