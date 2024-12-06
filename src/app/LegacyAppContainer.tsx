import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'src/redux/reducers';
import ModalWrapper from 'nav-frontend-modal';
import { composeWithDevTools } from 'redux-devtools-extension';
import IeMacStyling from 'src/app/IeMacStyling';
import { Provider, useDispatch } from 'react-redux';
import GlobalStyling from 'src/app/GlobalStyling';
import { useOnMount } from 'src/utils/customHooks';

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
import { aktivBrukerAtom } from 'src/lib/state/context';
import { PropsWithChildren, useEffect } from 'react';
import setGjeldendeBrukerIRedux from 'src/redux/gjeldendeBruker/actions';

const store = createStore(reducers(), composeWithDevTools({ trace: true })(applyMiddleware(thunk)));

const ReduxJotaiCompat = () => {
    const [aktivBruker] = useAtom(aktivBrukerAtom);
    const dispatch = useDispatch();

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
                {children}
            </Provider>
        </>
    );
}
