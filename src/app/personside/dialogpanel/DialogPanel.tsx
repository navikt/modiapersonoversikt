import * as React from 'react';
import styled from 'styled-components/macro';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { useAppState } from '../../../utils/customHooks';
import SendNyMeldingContainer from './sendMelding/SendNyMeldingContainer';
import FortsettDialogContainer from './fortsettDialog/FortsettDialogContainer';
import useVisTraadTilknyttetPlukketOppgave from './fortsettDialog/useVisTraadTilknyttetPlukketOppgave';
import { getInnstillingPending } from '../../../redux/innstillinger';
import { OppgavelisteValg } from './sendMelding/SendNyMelding';
import LazySpinner from '../../../components/LazySpinner';

const DialogPanelWrapper = styled.div`
    flex-grow: 1;
    word-break: break-word;
`;

function DialogPanel() {
    const dialogpanelTraad = useAppState((state) => state.oppgaver.dialogpanelTraad);
    const slaaOppOppgave = useVisTraadTilknyttetPlukketOppgave(dialogpanelTraad);
    const defaultOppgaveDestinasjon = useAppState((appstate) =>
        getInnstillingPending<OppgavelisteValg>(appstate, 'defaultOppgaveDestinasjon', OppgavelisteValg.MinListe)
    );

    if (slaaOppOppgave.pending) {
        return slaaOppOppgave.placeholder;
    }
    if (defaultOppgaveDestinasjon.pending) {
        return <LazySpinner type="M" />;
    }

    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <DialogPanelWrapper>
                {dialogpanelTraad ? (
                    <FortsettDialogContainer
                        traad={dialogpanelTraad}
                        defaultOppgaveDestinasjon={defaultOppgaveDestinasjon.data}
                        key={dialogpanelTraad.traadId} // for å tvinge refresh dersom man velger en ny tråd
                    />
                ) : (
                    <SendNyMeldingContainer defaultOppgaveDestinasjon={defaultOppgaveDestinasjon.data} />
                )}
            </DialogPanelWrapper>
        </ErrorBoundary>
    );
}

export default React.memo(DialogPanel);
