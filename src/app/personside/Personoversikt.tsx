import WaitForUserLoaded from 'src/components/WaitForUserLoaded';
import { DialogpanelStateProvider } from 'src/context/dialogpanel-state';
import tilgangskontroll from '../../rest/resources/tilgangskontrollResource';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import MainLayout from './MainLayout';
import NyIdentModal from './NyIdentModal';

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
    return <WaitForUserLoaded>{({ fnr }) => <Personoversikt fnr={fnr} />}</WaitForUserLoaded>;
}

export default PersonoversiktWrapper;
