import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routing, { paths } from './routes/routing';
import { setupMock } from '../mock/setup-mock';
import reducers from '../redux/reducers';
import { mockEnabled } from '../api/config';
import AppStyle, { ContentStyle } from './AppStyle';
import ModalWrapper from 'nav-frontend-modal';
import { composeWithDevTools } from 'redux-devtools-extension';
import PersonOppslagHandler from './PersonOppslagHandler/PersonOppslagHandler';
import Decorator from './internarbeidsflatedecorator/Decorator';
import StandAloneKomponenter from '../components/standalone/StandAloneKomponenter';
import HentGlobaleVerdier from './globaleVerdier/FetchSessionInfoOgLeggIRedux';
import { useAppState } from '../utils/customHooks';
import DemoBanner from '../components/DemoBanner';
import VelgEnhet from './routes/VelgEnhet';
import SakerFullscreen from './personside/infotabs/saksoversikt/SakerFullscreen';
import SaksDokumentEgetVindu from './personside/infotabs/saksoversikt/SaksDokumentIEgetVindu';
import IeMacStyling from './startbilde/IeMacStyling';

if (mockEnabled) {
    setupMock();
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

function Personoversikt() {
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);

    if (!valgtEnhet) {
        return <VelgEnhet />;
    }

    return (
        <>
            <PersonOppslagHandler />
            <HentGlobaleVerdier />
            <ContentStyle>
                <Routing />
            </ContentStyle>
        </>
    );
}

function PersonoverisktProvider() {
    return (
        <Provider store={store}>
            <AppStyle>
                <Decorator />
                <Switch>
                    <Route
                        path={`${paths.sakerFullscreen}/:fodselsnummer/`}
                        render={routeProps => <SakerFullscreen fødselsnummer={routeProps.match.params.fodselsnummer} />}
                    />
                    <Route
                        path={`${paths.saksdokumentEgetVindu}/:fodselsnummer/`}
                        render={routeProps => (
                            <SaksDokumentEgetVindu fødselsnummer={routeProps.match.params.fodselsnummer} />
                        )}
                    />
                    <Route path={''} component={Personoversikt} />
                </Switch>
            </AppStyle>
        </Provider>
    );
}

function App() {
    ModalWrapper.setAppElement('#root');

    return (
        <>
            <DemoBanner />
            <IeMacStyling />
            <BrowserRouter>
                <Switch>
                    <Route
                        path={`${paths.standaloneKomponenter}/:component?/:fnr?`}
                        component={StandAloneKomponenter}
                    />

                    <Route path={'/'} component={PersonoverisktProvider} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
