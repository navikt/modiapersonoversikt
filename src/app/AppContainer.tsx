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
import LyttPaaFnrIURLOgSettIRedux from './PersonOppslagHandler/LyttPaaFnrIURLOgSettIRedux';
import HentGlobaleVerdier from './FetchSessionInfoOgLeggIRedux';
import GlobalStyling from './GlobalStyling';
import Decorator from './internarbeidsflatedecorator/Decorator';
import Routing from './Routing';
import styled from 'styled-components';
import { useOnMount } from '../utils/customHooks';
import VelgEnhet from './VelgEnhet';
import usePersistentLogin from '../utils/hooks/use-persistent-login';
import LoggetUtModal from './LoggetUtModal';
import { useValgtenhet, ValgtEnhetProvider } from '../context/valgtenhet-state';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    const loginState = usePersistentLogin();
    const valgtEnhet = useValgtenhet().enhetId;

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

function Router(props: { children?: React.ReactNode }) {
    if (process.env.REACT_APP_USE_HASH_ROUTER === 'true') {
        return <HashRouter>{props.children}</HashRouter>;
    }
    return <BrowserRouter basename={process.env.PUBLIC_URL}>{props.children}</BrowserRouter>;
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
                    <Router>
                        <AppStyle>
                            {!window.erChatvisning && <Decorator />}
                            <App />
                        </AppStyle>
                    </Router>
                </Provider>
            </ValgtEnhetProvider>
        </QueryClientProvider>
    );
}

export default AppContainer;
