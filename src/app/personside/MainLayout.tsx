import { guid } from 'nav-frontend-js-utils';
import { useRef } from 'react';
import styled from 'styled-components';
import { useDialogpanelState } from '../../context/dialogpanel-state';
import { VisittkortStateProvider } from '../../context/visittkort-state';
import BrukerHarUbesvarteMeldinger from './dialogpanel/BrukerHarUbesvarteMeldinger';
import DialogPanel from './dialogpanel/DialogPanel';
import TildelteOppgaver from './dialogpanel/TildelteOppgaver';
import EkspanderDilaogpanelKnapp from './EkspanderDilaogpanelKnapp';
import InfoTabs from './infotabs/InfoTabs';
import { LayoutWrapper } from './MainLayoutStyles';
import { HoyreKolonne, SmallScreenToggleButton, VenstreKolonne } from './ResponsiveMainLayoutStyles';
import Visittkort from './visittkort-v2/Visittkort';

const Scrollbar = styled.div`
    overflow-y: auto;
    flex-grow: 1;
    flex-shrink: 1;
`;

function MainLayout() {
    const dialogpanel = useDialogpanelState();
    const tittelId = useRef(guid());

    const ekspanderDialogpanelHandler = () => {
        if (!dialogpanel.apent) {
            dialogpanel.setApent(true);
        }
    };

    return (
        <LayoutWrapper>
            <VenstreKolonne dialogPanelEkspandert={dialogpanel.apent}>
                <VisittkortStateProvider>
                    <Scrollbar>
                        <Visittkort />
                    </Scrollbar>
                    <InfoTabs />
                </VisittkortStateProvider>
            </VenstreKolonne>
            {!window.erChatvisning && (
                <HoyreKolonne
                    onClick={ekspanderDialogpanelHandler}
                    dialogPanelEkspandert={dialogpanel.apent}
                    aria-describedby={tittelId.current}
                >
                    <h1 className="sr-only" id={tittelId.current}>
                        Oppgavepanel
                    </h1>
                    <Scrollbar>
                        <BrukerHarUbesvarteMeldinger />
                        <TildelteOppgaver />
                        <DialogPanel />
                    </Scrollbar>
                    <EkspanderDilaogpanelKnapp />
                </HoyreKolonne>
            )}
            <SmallScreenToggleButton />
        </LayoutWrapper>
    );
}

export default MainLayout;
