import * as React from 'react';
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
import Decorator from './internarbeidsflatedecorator/Decorator';
import StandAloneKomponenter from '../components/standalone/StandAloneKomponenter';
import HentGlobaleVerdier from './globaleVerdier/FetchSessionInfoOgLeggIRedux';
import { useOnMount } from '../utils/customHooks';
import PersonsokContainer from './personsok/Personsok';
import { detect } from 'detect-browser';
import { useState } from 'react';

if (mockEnabled) {
    setupMock();
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

function Personoveriskt() {
    const appRef = React.createRef<HTMLDivElement>();
    const [isMac, setIsMac] = useState<undefined | boolean>(undefined);

    useOnMount(() => {
        ModalWrapper.setAppElement(appRef.current);
        const browser = detect();
        const os = browser && browser.os;
        setIsMac(os ? os.toLowerCase().includes('mac') : undefined);
    });

    return (
        <Provider store={store}>
            <>
                <PersonOppslagHandler />
                <HentGlobaleVerdier />
                <PersonsokContainer />
                <AppStyle ref={appRef} className={isMac ? 'is-mac' : ''}>
                    <Decorator />
                    <ContentStyle>
                        <Routing />
                    </ContentStyle>
                </AppStyle>
            </>
        </Provider>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={`${paths.standaloneKomponenter}/:component?/:fnr?`} component={StandAloneKomponenter} />
                <Route path={'/'} component={Personoveriskt} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
