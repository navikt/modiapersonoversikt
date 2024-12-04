import { useLocation } from '@tanstack/react-router';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'src/redux/reducers';
import ModalWrapper from 'nav-frontend-modal';
import { composeWithDevTools } from 'redux-devtools-extension';
import IeMacStyling from 'src/app/IeMacStyling';
import { Provider, useDispatch } from 'react-redux';
import LyttPaaFnrIURLOgSettIRedux from 'src/app/PersonOppslagHandler/LyttPaaFnrIURLOgSettIRedux';
import HentGlobaleVerdier from 'src/app/FetchSessionInfoOgLeggIRedux';
import GlobalStyling from 'src/app/GlobalStyling';
import styled from 'styled-components';
import { useOnMount } from 'src/utils/customHooks';
import VelgEnhet from 'src/app/VelgEnhet';
import LoggetUtModal from 'src/app/LoggetUtModal';
import { usePersistentWWLogin } from 'src/login/use-persistent-ww-login';
import usePersistentLogin from 'src/utils/hooks/use-persistent-login';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';

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
import { useAtom } from 'jotai';
import { aktivBrukerAtom, aktivEnhetAtom } from 'src/lib/state/context';
import { PropsWithChildren, useEffect } from 'react';
import setGjeldendeBrukerIRedux from 'src/redux/gjeldendeBruker/actions';
import { useAtomValue } from 'jotai';
import useHandleGosysUrl from 'src/app/internarbeidsflatedecorator/useHandleGosysUrl';

const ContentStyle = styled.div`
    height: 0px;
    @media print {
        height: auto;
    }
    display: flex;
    flex: 1 1 auto;
`;

const store = createStore(reducers(history), composeWithDevTools({ trace: true })(applyMiddleware(thunk)));

function App({ children }: PropsWithChildren) {
    const loginStateOld = usePersistentLogin();
    const loginStateNew = usePersistentWWLogin();
    const { isOn: newLoginStateToggleIsOn } = useFeatureToggle(FeatureToggles.BrukWebworkerPaaInnLogging);
    const valgtEnhet = useAtomValue(aktivEnhetAtom);

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
            {
                //<LyttPaaFnrIURLOgSettIRedux />
            }
            <HentGlobaleVerdier />
            <ContentStyle>{children}</ContentStyle>
        </>
    );
}

const ReduxJotaiCompat = () => {
    const [aktivBruker] = useAtom(aktivBrukerAtom);
    const dispatch = useDispatch();

    useHandleGosysUrl();

    useEffect(() => {
        dispatch(setGjeldendeBrukerIRedux(aktivBruker ?? ''));
    }, [aktivBruker]);

    return <></>;
};

export default function LegacyAppContainer({ children }: PropsWithChildren) {
    useOnMount(() => {
        ModalWrapper.setAppElement('#root');
    });
    return (
        <>
            <IeMacStyling />
            <GlobalStyling />
            <Provider store={store}>
                <ReduxJotaiCompat />
                <App>{children}</App>
            </Provider>
        </>
    );
}
