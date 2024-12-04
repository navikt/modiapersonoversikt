import { useState } from 'react';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import MainLayout from './MainLayout';
import { erGyldigishFnr } from '../../utils/fnr-utils';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import tilgangskontroll from '../../rest/resources/tilgangskontrollResource';
import { DialogpanelStateProvider } from '../../context/dialogpanel-state';
import NyIdentModal from './NyIdentModal';
import useTimeout from '../../utils/hooks/use-timeout';
import { Navigate } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { aktivBrukerAtom, aktivBrukerLastetAtom } from 'src/lib/state/context';
import { CenteredLazySpinner } from 'src/components/LazySpinner';

function Personoversikt({ fnr }: { fnr: string }) {
    return tilgangskontroll.useRenderer(fnr, (data) => {
        if (!data.harTilgang) {
            return <BegrensetTilgangSide tilgangsData={data} />;
        }
        if (data.harTilgang && data.aktivIdent && data.aktivIdent !== fnr) {
            return <NyIdentModal aktivIdent={data.aktivIdent} />;
        }
        return (
            <>
                <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
                <DialogpanelStateProvider>
                    <MainLayout />
                </DialogpanelStateProvider>
            </>
        );
    });
}

function PersonoversiktWrapper() {
    const aktivBruker = useAtomValue(aktivBrukerAtom);
    const aktivBrukerLastet = useAtomValue(aktivBrukerLastetAtom);

    const [loadTimeout, setLoadTimeout] = useState(false);
    useTimeout(() => setLoadTimeout(true), 500);

    const validFnr = aktivBruker && erGyldigishFnr(aktivBruker);

    if (loadTimeout && !validFnr) return <Navigate to="/" replace />;
    if (!aktivBrukerLastet) return <CenteredLazySpinner />;

    if (!aktivBruker) return <Navigate to="/" replace />;

    return <Personoversikt fnr={aktivBruker} />;
}

export default PersonoversiktWrapper;
