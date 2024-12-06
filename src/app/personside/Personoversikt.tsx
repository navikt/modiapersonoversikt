import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import MainLayout from './MainLayout';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import tilgangskontroll from '../../rest/resources/tilgangskontrollResource';
import { DialogpanelStateProvider } from '../../context/dialogpanel-state';
import NyIdentModal from './NyIdentModal';
import WaitForUserLoaded from 'src/components/WaitForUserLoaded';

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
