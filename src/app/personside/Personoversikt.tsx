import * as React from 'react';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import MainLayout from './MainLayout';
import { useOnMount } from '../../utils/customHooks';
import { erGyldigishFnr } from '../../utils/fnr-utils';
import { useHistory } from 'react-router';
import { paths } from '../routes/routing';
import { loggInfo } from '../../utils/logger/frontendLogger';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import tilgangskontroll from '../../rest/resources/tilgangskontrollResource';
import { DialogpanelStateProvider } from '../../context/dialogpanel-state';
import NyIdentModal from './NyIdentModal';

function Personoversikt({ fnr }: { fnr: string }) {
    const history = useHistory();

    useOnMount(() => {
        if (!erGyldigishFnr(fnr)) {
            loggInfo('Ugyldig fnr, redirecter til startside');
            history.push(`${paths.basePath}`);
        }
    });

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
