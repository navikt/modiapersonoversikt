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

function MainLayout() {
    const UI = useSelector((state: AppState) => state.ui);
    const dispatch = useDispatch();

    const ekspanderDialogpanelHandler = () => {
        if (!UI.dialogPanel.ekspandert) {
            dispatch(toggleDialogpanel(true));
        }
    };

    return (
        <LayoutWrapper role="main">
            <VenstreKolonne dialogPanelEkspandert={UI.dialogPanel.ekspandert}>
                <Kontrollsporsmal />
                <Visittkort />
                <InfoTabs />
            </VenstreKolonne>
            <HøyreKolonne
                onClick={ekspanderDialogpanelHandler}
                role="region"
                aria-label="Oppgavepanel"
                dialogPanelEkspandert={UI.dialogPanel.ekspandert}
            >
                <HentOppgaveKnapp />
                <DialogPanel />
            </HøyreKolonne>
            <SmallScreenToggleButton UI={UI} toggleDialogpanel={() => dispatch(toggleDialogpanel())} />
        </LayoutWrapper>
    );
}

export default MainLayout;
