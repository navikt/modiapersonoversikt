import * as React from 'react';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { useAppState } from '../../../utils/customHooks';
import SendNyMeldingContainer from './sendMelding/SendNyMeldingContainer';
import FortsettDialogContainer from './fortsettDialog/FortsettDialogContainer';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { isFinishedPosting } from '../../../rest/utils/postResource';

const DialogPanelWrapper = styled.article`
    flex-grow: 1;
`;

function DialogPanel() {
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);
    const oppgaveResource = useSelector((state: AppState) => state.restResources.oppgaver);
    const tilknyttetOppgave =
        isFinishedPosting(oppgaveResource) && dialogpanelTraad
            ? oppgaveResource.response.find(oppgave => oppgave.henvendelseid === dialogpanelTraad.traadId)
            : undefined;

    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <DialogPanelWrapper role="region" aria-label="Dialogpanel">
                <Undertittel className="sr-only">Dialogpanel</Undertittel>
                {dialogpanelTraad !== undefined ? (
                    <FortsettDialogContainer traad={dialogpanelTraad} tilknyttetOppgave={tilknyttetOppgave} />
                ) : (
                    <SendNyMeldingContainer />
                )}
            </DialogPanelWrapper>
        </ErrorBoundary>
    );
}

export default DialogPanel;
