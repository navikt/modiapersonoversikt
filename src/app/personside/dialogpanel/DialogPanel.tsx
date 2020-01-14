import * as React from 'react';
import styled from 'styled-components/macro';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { useAppState } from '../../../utils/customHooks';
import SendNyMeldingContainer from './sendMelding/SendNyMeldingContainer';
import FortsettDialogContainer from './fortsettDialog/FortsettDialogContainer';
import useVisTraadTilknyttetPlukketOppgave from './fortsettDialog/useVisTraadTilknyttetPlukketOppgave';

const DialogPanelWrapper = styled.div`
    flex-grow: 1;
    word-break: break-word;
`;

function DialogPanel() {
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);
    const slåOppOppgave = useVisTraadTilknyttetPlukketOppgave(dialogpanelTraad);

    if (slåOppOppgave.pending) {
        return slåOppOppgave.placeholder;
    }

    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <DialogPanelWrapper>
                {dialogpanelTraad ? (
                    <FortsettDialogContainer
                        traad={dialogpanelTraad}
                        key={dialogpanelTraad.traadId} // for å tvinge refresh dersom man velger en ny tråd
                    />
                ) : (
                    <SendNyMeldingContainer />
                )}
            </DialogPanelWrapper>
        </ErrorBoundary>
    );
}

export default React.memo(DialogPanel);
