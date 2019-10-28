import * as React from 'react';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { useAppState } from '../../../utils/customHooks';
import SendNyMeldingContainer from './sendMelding/SendNyMeldingContainer';
import FortsettDialogContainer from './fortsettDialog/FortsettDialogContainer';
import { RouteComponentProps, withRouter } from 'react-router';
import useVisTraadTilknyttetPlukketOppgave from './fortsettDialog/useVisTraadTilknyttetPlukketOppgave';

const DialogPanelWrapper = styled.article`
    flex-grow: 1;
`;

function DialogPanel(props: RouteComponentProps) {
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);
    const slåOppOppgave = useVisTraadTilknyttetPlukketOppgave(props, dialogpanelTraad);

    if (slåOppOppgave.pending) {
        return slåOppOppgave.placeholder;
    }

    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <DialogPanelWrapper role="region" aria-label="Dialogpanel">
                <Undertittel className="sr-only">Dialogpanel</Undertittel>
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

export default withRouter(DialogPanel);
