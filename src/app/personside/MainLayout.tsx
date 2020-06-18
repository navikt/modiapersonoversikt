import * as React from 'react';
import DialogPanel from './dialogpanel/DialogPanel';
import HentOppgaveKnapp from './dialogpanel/HentOppgaveKnapp';
import Visittkort from './visittkort/VisittkortContainer';
import { toggleDialogpanel } from '../../redux/uiReducers/UIReducer';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutWrapper } from './MainLayoutStyles';
import { HøyreKolonne, SmallScreenToggleButton, VenstreKolonne } from './ResponsiveMainLayoutStyles';
import Kontrollsporsmal from './kontrollsporsmal/Kontrollsporsmal';
import InfoTabs from './infotabs/InfoTabs';
import EkspanderDilaogpanelKnapp from './EkspanderDilaogpanelKnapp';
import styled from 'styled-components/macro';
import BrukerHarUbesvarteMeldinger from './dialogpanel/BrukerHarUbesvarteMeldinger';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';

const Scrollbar = styled.div`
    overflow-y: auto;
    flex-grow: 1;
    flex-shrink: 1;
`;

function MainLayout() {
    const UI = useSelector((state: AppState) => state.ui);
    const dispatch = useDispatch();
    const tittelId = useRef(guid());

    const ekspanderDialogpanelHandler = () => {
        if (!UI.dialogPanel.ekspandert) {
            dispatch(toggleDialogpanel(true));
        }
    };

    return (
        <LayoutWrapper>
            <VenstreKolonne dialogPanelEkspandert={UI.dialogPanel.ekspandert}>
                <Scrollbar>
                    <Kontrollsporsmal />
                    <Visittkort />
                </Scrollbar>
                <InfoTabs />
            </VenstreKolonne>
            {!(window as any).isChatVisning && (
                <HøyreKolonne
                    onClick={ekspanderDialogpanelHandler}
                    dialogPanelEkspandert={UI.dialogPanel.ekspandert}
                    aria-describedby={tittelId.current}
                >
                    <h1 className="sr-only" id={tittelId.current}>
                        Oppgavepanel
                    </h1>
                    <Scrollbar>
                        <BrukerHarUbesvarteMeldinger />
                        <HentOppgaveKnapp />
                        <DialogPanel />
                    </Scrollbar>
                    <EkspanderDilaogpanelKnapp />
                </HøyreKolonne>
            )}
            <SmallScreenToggleButton UI={UI} toggleDialogpanel={() => dispatch(toggleDialogpanel())} />
        </LayoutWrapper>
    );
}

export default MainLayout;
