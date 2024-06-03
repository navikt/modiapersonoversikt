import React, { useEffect, useState } from 'react';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import MainLayout from './MainLayout';
import { erGyldigishFnr } from '../../utils/fnr-utils';
import { useHistory } from 'react-router';
import { paths } from '../routes/routing';
import { loggInfo } from '../../utils/logger/frontendLogger';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import tilgangskontroll from '../../rest/resources/tilgangskontrollResource';
import { DialogpanelStateProvider } from '../../context/dialogpanel-state';
import NyIdentModal from './NyIdentModal';
import { useGjeldendeBrukerLastet } from '../../redux/gjeldendeBruker/types';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import useTimeout from '../../utils/hooks/use-timeout';

function Personoversikt({ fnr }: { fnr: string }) {
    const [loadTimeout, setLoadTimeout] = useState(false);
    const history = useHistory();
    const gjeldendeBrukerHasLoaded = useGjeldendeBrukerLastet();
    useTimeout(() => setLoadTimeout(true), 500);

    useEffect(() => {
        if (!erGyldigishFnr(fnr) && (gjeldendeBrukerHasLoaded || loadTimeout)) {
            loggInfo('Ugyldig fnr, redirecter til startside');
            history.push(`${paths.basePath}`);
        }
    }, [fnr, gjeldendeBrukerHasLoaded]);

    if (!gjeldendeBrukerHasLoaded) {
        return <CenteredLazySpinner />;
    }

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

export default Personoversikt;
