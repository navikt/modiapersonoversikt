import * as React from 'react';
import { useRef } from 'react';
import DialogPanel from './dialogpanel/DialogPanel';
import Visittkort from './visittkort-v2/Visittkort';
import { toggleDialogpanel } from '../../redux/uiReducers/UIReducer';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutWrapper } from './MainLayoutStyles';
import { HoyreKolonne, SmallScreenToggleButton, VenstreKolonne } from './ResponsiveMainLayoutStyles';
import InfoTabs from './infotabs/InfoTabs';
import EkspanderDilaogpanelKnapp from './EkspanderDilaogpanelKnapp';
import styled from 'styled-components/macro';
import BrukerHarUbesvarteMeldinger from './dialogpanel/BrukerHarUbesvarteMeldinger';
import { guid } from 'nav-frontend-js-utils';
import TildelteOppgaver from './dialogpanel/TildelteOppgaver';

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
                    <Visittkort />
                </Scrollbar>
                <InfoTabs />
            </VenstreKolonne>
            {!window.erChatvisning && (
                <HoyreKolonne
                    onClick={ekspanderDialogpanelHandler}
                    dialogPanelEkspandert={UI.dialogPanel.ekspandert}
                    aria-describedby={tittelId.current}
                >
                    <h1 className="sr-only" id={tittelId.current}>
                        Oppgavepanel
                    </h1>
                    <Scrollbar>
                        <BrukerHarUbesvarteMeldinger />
                        <TildelteOppgaver standalone />
                        <DialogPanel />
                    </Scrollbar>
                    <EkspanderDilaogpanelKnapp />
                </HoyreKolonne>
            )}
            <SmallScreenToggleButton UI={UI} toggleDialogpanel={() => dispatch(toggleDialogpanel())} />
        </LayoutWrapper>
    );
}

export default MainLayout;
