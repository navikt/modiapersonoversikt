import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import reducers from '../redux/reducers';
import ModalWrapper from 'nav-frontend-modal';
import { composeWithDevTools } from 'redux-devtools-extension';
import DemoBanner from '../components/DemoBanner';
import IeMacStyling from './IeMacStyling';
import { Provider } from 'react-redux';
import LyttPåFnrIURLOgSettIRedux from './PersonOppslagHandler/LyttPåFnrIURLOgSettIRedux';
import HentGlobaleVerdier from './FetchSessionInfoOgLeggIRedux';
import GlobalStyling from './GlobalStyling';
import Decorator from './internarbeidsflatedecorator/Decorator';
import Routing from './Routing';
import styled from 'styled-components';
import { useAppState, useOnMount } from '../utils/customHooks';
import VelgEnhet from './VelgEnhet';

const AppStyle = styled.div`
    height: 100vh;
    @media print {
        height: auto;
    }
    display: flex;
    flex-flow: column nowrap;
`;

const ContentStyle = styled.div`
    height: 0; // IE11-hack for at flex skal funke
    @media print {
        height: auto;
    }
    flex-grow: 1;
    display: flex;
`;

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

function App() {
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);

    if (!valgtEnhet) {
        /* valgt enhet utledes fra saksbehandlerinnstillinger-cookie i session-reducer. Mange kall mot backenden vil feile uten denne cookien. Legger derfor denne sjekken før resten av appen mountes for å motvirke feilede kall */
        return <VelgEnhet />;
    }

    return (
        <>
            <LyttPåFnrIURLOgSettIRedux />
            <HentGlobaleVerdier />
            <ContentStyle>
                <Routing />
            </ContentStyle>
        </>
    );
}

const Router: React.ComponentType = process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;
function AppContainer() {
    useOnMount(() => {
        ModalWrapper.setAppElement('#root');
    });
    return (
        <>
            <IeMacStyling />
            <GlobalStyling />
            <DemoBanner />
            <Provider store={store}>
                <Router>
                    <AppStyle>
                        <Decorator />
                        <App />
                    </AppStyle>
                </Router>
            </Provider>
        </>
    );
}

export default AppContainer;
