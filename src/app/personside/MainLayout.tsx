import * as React from 'react';
import { useRef } from 'react';
import DialogPanel from './dialogpanel/DialogPanel';
import HentOppgaveKnapp from './dialogpanel/HentOppgaveKnapp';
import Visittkort from './VisittkortSwitcher';
import { toggleDialogpanel } from '../../redux/uiReducers/UIReducer';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutWrapper } from './MainLayoutStyles';
import { HoyreKolonne, SmallScreenToggleButton, VenstreKolonne } from './ResponsiveMainLayoutStyles';
import Kontrollsporsmal from './kontrollsporsmal/Kontrollsporsmal';
import InfoTabs from './infotabs/InfoTabs';
import EkspanderDilaogpanelKnapp from './EkspanderDilaogpanelKnapp';
import styled from 'styled-components/macro';
import BrukerHarUbesvarteMeldinger from './dialogpanel/BrukerHarUbesvarteMeldinger';
import { guid } from 'nav-frontend-js-utils';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';
import { useOnMount } from '../../utils/customHooks';
import { isNotStarted } from '../../rest/utils/restResource';
import { useRestResource } from '../../rest/consumer/useRestResource';

const Scrollbar = styled.div`
    overflow-y: auto;
    flex-grow: 1;
    flex-shrink: 1;
`;

function useBrukersNavKontor() {
    const resource = useRestResource((resource) => resource.brukersNavKontor).resource;
    const dispatch = useDispatch();

    useOnMount(() => {
        if (isNotStarted(resource)) {
            dispatch(resource.actions.fetch);
        }
    });
}

function MainLayout() {
    const UI = useSelector((state: AppState) => state.ui);
    const dispatch = useDispatch();
    const tittelId = useRef(guid());
    const usingSFBackend = useFeatureToggle(FeatureToggles.BrukSalesforceDialoger).isOn ?? false;
    useBrukersNavKontor();

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
                        {!usingSFBackend && <HentOppgaveKnapp />}
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
