import * as React from 'react';
import DialogPanel from './dialogpanel/DialogPanel';
import PilKnapp from '../../components/pilknapp';
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

    return (
        <LayoutWrapper role="main">
            <VenstreKolonne dialogPanelEkspandert={UI.dialogPanel.ekspandert}>
                <Kontrollsporsmal />
                <Visittkort />
                <InfoTabs />
            </VenstreKolonne>
            <HøyreKolonne role="region" aria-label="Oppgavepanel" dialogPanelEkspandert={UI.dialogPanel.ekspandert}>
                <HentOppgaveKnapp />
                <DialogPanel />
                <div>
                    <PilKnapp
                        width="30px"
                        beskrivelse={UI.dialogPanel.ekspandert ? 'Minimer dialogpanel' : 'Ekspander dialogpanel'}
                        direction={UI.dialogPanel.ekspandert ? 'right' : 'left'}
                        onClick={() => dispatch(toggleDialogpanel())}
                    />
                </div>
            </HøyreKolonne>
            <SmallScreenToggleButton UI={UI} toggleDialogpanel={() => dispatch(toggleDialogpanel())} />
        </LayoutWrapper>
    );
}

export default MainLayout;
