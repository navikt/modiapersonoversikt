import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../redux/reducers';
import ModalWrapper from 'nav-frontend-modal';
import { composeWithDevTools } from 'redux-devtools-extension';
import DemoBanner from '../components/DemoBanner';
import IeMacStyling from './IeMacStyling';
import { Provider } from 'react-redux';
import LyttPaaFnrIURLOgSettIRedux from './PersonOppslagHandler/LyttPaaFnrIURLOgSettIRedux';
import HentGlobaleVerdier from './FetchSessionInfoOgLeggIRedux';
import GlobalStyling from './GlobalStyling';
import Decorator from './internarbeidsflatedecorator/Decorator';
import Routing from './Routing';
import styled from 'styled-components';
import { useOnMount } from '../utils/customHooks';
import VelgEnhet from './VelgEnhet';
import LoggetUtModal from './LoggetUtModal';
import { useValgtenhet, ValgtEnhetProvider } from '../context/valgtenhet-state';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePersistentWWLogin } from '../login/use-persistent-ww-login';
import usePersistentLogin from '../utils/hooks/use-persistent-login';
import useFeatureToggle from '../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';
import { initAmplitude } from '../utils/amplitude';

import 'nav-frontend-lukknapp-style';
import 'nav-frontend-lenker-style';
import 'nav-frontend-popover-style';
import 'nav-frontend-alertstriper-style';
import 'nav-frontend-snakkeboble-style';
import 'nav-frontend-modal-style';
import 'nav-frontend-hjelpetekst-style';
import 'nav-frontend-knapper-style';
import 'nav-frontend-spinner-style';
import 'nav-frontend-stegindikator-style';
import 'nav-frontend-typografi-style';
import 'nav-frontend-chevron-style';
import 'nav-frontend-paneler-style';
import 'nav-frontend-lenkepanel-style';
import 'nav-frontend-tabs-style';
import 'nav-frontend-skjema-style';
import 'nav-frontend-ekspanderbartpanel-style';
import 'nav-frontend-etiketter-style';
import { SentryRoute } from '../sentry-route';
import { paths } from './routes/routing';
import { Switch } from 'react-router';
import { LandingPage } from './internarbeidsflatedecorator/LandingPage';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { initializeObservability } from '../utils/observability';

const AppStyle = styled.div`
    height: 100vh;
    @media print {
        height: auto;
    }
    display: flex;
    flex-flow: column nowrap;
`;

const ContentStyle = styled.div`
    height: 0px;
    @media print {
        height: auto;
    }
    display: flex;
    flex: 1 1 auto;
`;

const history = createBrowserHistory({
    basename: import.meta.env.BASE_URL
});

const store = createStore(
    reducers(history),
    composeWithDevTools({ trace: true })(applyMiddleware(thunk), applyMiddleware(routerMiddleware(history)))
);

initAmplitude();
initializeObservability(history);

function App() {
    const loginStateOld = usePersistentLogin();
    const loginStateNew = usePersistentWWLogin();
    const { isOn: newLoginStateToggleIsOn } = useFeatureToggle(FeatureToggles.BrukWebworkerPaaInnLogging);
    const valgtEnhet = useValgtenhet().enhetId;

    let loginState = loginStateOld;
    if (newLoginStateToggleIsOn) {
        loginState = loginStateNew;
    }

    if (!valgtEnhet) {
        /**
         * valgt enhet hentes fra modiacontextholder, og mellomlagres i localStorage
         */
        return (
            <>
                <LoggetUtModal loginState={loginState} />
                <VelgEnhet />
            </>
        );
    }
    return (
        <>
            <LoggetUtModal loginState={loginState} />
            <LyttPaaFnrIURLOgSettIRedux />
            <HentGlobaleVerdier />
            <ContentStyle>
                <Routing />
            </ContentStyle>
        </>
    );
}

const minutes = 60 * 1000;
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * minutes,
            cacheTime: 10 * minutes,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false
        }
    }
});

function AppContainer() {
    useOnMount(() => {
        ModalWrapper.setAppElement('#root');
    });
    return (
        <QueryClientProvider client={queryClient}>
            <IeMacStyling />
            <GlobalStyling />
            <DemoBanner />
            <ValgtEnhetProvider>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <SentryRoute path={paths.landingPage}>
                                <LandingPage />
                            </SentryRoute>
                            <SentryRoute>
                                <AppStyle>
                                    {!window.erChatvisning && <Decorator />}
                                    <App />
                                </AppStyle>
                            </SentryRoute>
                        </Switch>
                    </ConnectedRouter>
                </Provider>
            </ValgtEnhetProvider>
        </QueryClientProvider>
    );
}

export default AppContainer;
