import * as React from 'react';
import styled from 'styled-components/macro';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { useAppState } from '../../../utils/customHooks';
import SendNyMeldingContainer from './sendMelding/SendNyMeldingContainer';
import FortsettDialogContainer from './fortsettDialog/FortsettDialogContainer';
import useVisTraadTilknyttetPlukketOppgave from './fortsettDialog/useVisTraadTilknyttetPlukketOppgave';
import { OppgavelisteValg } from './sendMelding/SendNyMelding';
import LazySpinner from '../../../components/LazySpinner';
import innstillingerResource from '../../../rest/resources/innstillingerResource';
import IfFeatureToggleOn from '../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../components/featureToggle/toggleIDs';
import IfFeatureToggleOff from '../../../components/featureToggle/IfFeatureToggleOff';
import NyFortsettDialogContainer from './fortsettDialog/NyFortsettDialogContainer';
import NySendNyMeldingContainer from './sendMelding/NySendNyMeldingContainer';

const DialogPanelWrapper = styled.div`
    flex-grow: 1;
    word-break: break-word;
`;

function DialogPanel() {
    const dialogpanelTraad = useAppState((state) => state.oppgaver.dialogpanelTraad);
    const slaaOppOppgave = useVisTraadTilknyttetPlukketOppgave(dialogpanelTraad);
    const innstillingerRequest = innstillingerResource.useFetch();
    const defaultOppgaveDestinasjon = innstillingerResource.useInnstilling(
        'defaultOppgaveDestinasjon',
        OppgavelisteValg.MinListe
    );
    if (slaaOppOppgave.pending) {
        return slaaOppOppgave.placeholder;
    }
    if (innstillingerRequest.isLoading) {
        return <LazySpinner type="M" />;
    }

    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <DialogPanelWrapper>
                {dialogpanelTraad ? (
                    <>
                        <IfFeatureToggleOn toggleID={FeatureToggles.useNewDialogComponents}>
                            <NyFortsettDialogContainer
                                traad={dialogpanelTraad}
                                defaultOppgaveDestinasjon={defaultOppgaveDestinasjon}
                                key={dialogpanelTraad.traadId} // for å tvinge refresh dersom man velger en ny tråd
                            />
                        </IfFeatureToggleOn>
                        <IfFeatureToggleOff toggleID={FeatureToggles.useNewDialogComponents}>
                            <FortsettDialogContainer
                                traad={dialogpanelTraad}
                                defaultOppgaveDestinasjon={defaultOppgaveDestinasjon}
                                key={dialogpanelTraad.traadId} // for å tvinge refresh dersom man velger en ny tråd
                            />
                        </IfFeatureToggleOff>
                    </>
                ) : (
                    <>
                        <IfFeatureToggleOn toggleID={FeatureToggles.useNewDialogComponents}>
                            <NySendNyMeldingContainer defaultOppgaveDestinasjon={defaultOppgaveDestinasjon} />
                        </IfFeatureToggleOn>
                        <IfFeatureToggleOff toggleID={FeatureToggles.useNewDialogComponents}>
                            <SendNyMeldingContainer defaultOppgaveDestinasjon={defaultOppgaveDestinasjon} />
                        </IfFeatureToggleOff>
                    </>
                )}
            </DialogPanelWrapper>
        </ErrorBoundary>
    );
}

export default React.memo(DialogPanel);
