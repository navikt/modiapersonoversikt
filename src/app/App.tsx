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
import PersonsokKomponent from './personsok/PersonsokKomponent';
import { useEffect, useState } from 'react';

if (mockEnabled) {
    setupMock();
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

function Personoveriskt() {
    const appRef = React.createRef<HTMLDivElement>();

    useOnMount(() => {
        ModalWrapper.setAppElement(appRef.current);
    });

    return (
        <Provider store={store}>
            <>
                <PersonOppslagHandler />
                <HentGlobaleVerdier />
                <AvasertSok />
                <AppStyle ref={appRef}>
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

function AvasertSok() {
    const [apen, settApen] = useState(false);
    useEffect(() => {
        const mouseEvent = () => {
            settApen(a => {
                return !a;
            });
        };
        const toggle = document.getElementById('toggle-personsok');
        if (toggle) {
            toggle.addEventListener('click', mouseEvent);
        }
        return () => {
            if (toggle) {
                toggle.removeEventListener('click', mouseEvent);
            }
        };
    }, [settApen]);

    return (
        <ModalWrapper contentLabel={'Avansert søk'} onRequestClose={() => settApen(false)} isOpen={apen}>
            <PersonsokKomponent />
        </ModalWrapper>
    );
}

export default App;
