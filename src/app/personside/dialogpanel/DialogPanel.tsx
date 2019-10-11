import * as React from 'react';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { useAppState } from '../../../utils/customHooks';
import SendNyMeldingContainer from './sendMelding/SendNyMeldingContainer';
import FortsettDialogContainer from './fortsettDialog/FortsettDialogContainer';
import useTildelteOppgaver from '../../../utils/hooks/useTildelteOppgaver';
import { RouteComponentProps, withRouter } from 'react-router';
import useVisTraadTilknyttetPlukketOppgave from './fortsettDialog/useVisTraadTilknyttetPlukketOppgave';
import { useEffect, useState } from 'react';

const DialogPanelWrapper = styled.article`
    flex-grow: 1;
`;

enum DialogPanelStatus {
    SendNyMelding,
    FortsettDialog
}
function DialogPanel(props: RouteComponentProps) {
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);
    const tildelteOppgaver = useTildelteOppgaver();
    const [dialogPanelStatus, setDialogPanelStatus] = useState<DialogPanelStatus>(DialogPanelStatus.SendNyMelding);
    const slåOppOppgave = useVisTraadTilknyttetPlukketOppgave(props, dialogpanelTraad);
    useEffect(() => {
        setDialogPanelStatus(dialogpanelTraad ? DialogPanelStatus.FortsettDialog : DialogPanelStatus.SendNyMelding);
    }, [dialogpanelTraad, setDialogPanelStatus]);

    if (slåOppOppgave.pending) {
        return slåOppOppgave.placeholder;
    }

    const tilknyttetOppgave = dialogpanelTraad
        ? tildelteOppgaver.paaBruker.find(oppgave => oppgave.henvendelseid === dialogpanelTraad.traadId)
        : undefined;

    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <DialogPanelWrapper role="region" aria-label="Dialogpanel">
                <Undertittel className="sr-only">Dialogpanel</Undertittel>
                {dialogPanelStatus === DialogPanelStatus.FortsettDialog ? (
                    <FortsettDialogContainer
                        traad={dialogpanelTraad}
                        tilknyttetOppgave={tilknyttetOppgave}
                        key={dialogpanelTraad.traadId}
                    />
                ) : (
                    <SendNyMeldingContainer />
                )}
            </DialogPanelWrapper>
        </ErrorBoundary>
    );
}

export default withRouter(DialogPanel);
