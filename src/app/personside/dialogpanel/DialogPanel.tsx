import { memo } from 'react';
import styled from 'styled-components';
import ErrorBoundary from '../../../components/ErrorBoundary';
import LazySpinner from '../../../components/LazySpinner';
import innstillingerResource from '../../../rest/resources/innstillingerResource';
import { useAppState } from '../../../utils/customHooks';
import FortsettDialogContainer from './fortsettDialog/FortsettDialogContainer';
import useVisTraadTilknyttetPlukketOppgave from './fortsettDialog/useVisTraadTilknyttetPlukketOppgave';
import { OppgavelisteValg } from './sendMelding/SendNyMelding';
import SendNyMeldingContainer from './sendMelding/SendNyMeldingContainer';

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
                    <FortsettDialogContainer
                        traad={dialogpanelTraad}
                        defaultOppgaveDestinasjon={defaultOppgaveDestinasjon}
                        key={dialogpanelTraad.traadId} // for å tvinge refresh dersom man velger en ny tråd
                    />
                ) : (
                    <SendNyMeldingContainer defaultOppgaveDestinasjon={defaultOppgaveDestinasjon} />
                )}
            </DialogPanelWrapper>
        </ErrorBoundary>
    );
}

export default memo(DialogPanel);
