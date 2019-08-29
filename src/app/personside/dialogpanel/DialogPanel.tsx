import * as React from 'react';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { useAppState, useRestResource } from '../../../utils/customHooks';
import SendNyMeldingContainer from './sendMelding/SendNyMeldingContainer';
import FortsettDialogContainer from './fortsettDialog/FortsettDialogContainer';
import useTildelteOppgaver from '../../../utils/hooks/useTildelteOppgaver';
import { hasData } from '../../../rest/utils/restResource';
import { useDispatch } from 'react-redux';
import { setValgtTraadDialogpanel } from '../../../redux/oppgave/actions';
import { loggError } from '../../../utils/frontendLogger';
import { setValgtTraadMeldingspanel } from '../../../redux/meldinger/actions';

const DialogPanelWrapper = styled.article`
    flex-grow: 1;
`;

function DialogPanel() {
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);
    const tildelteOppgaver = useTildelteOppgaver();
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const dispatch = useDispatch();

    const visTraadTilknyttetOppgaveIDialogpanel = !dialogpanelTraad && tildelteOppgaver.paaBruker.length > 0;
    if (visTraadTilknyttetOppgaveIDialogpanel && hasData(traaderResource)) {
        const oppgave = tildelteOppgaver.paaBruker[0];
        const traadTilknyttetOppgave = traaderResource.data.find(traad => traad.traadId === oppgave.henvendelseid);
        if (traadTilknyttetOppgave) {
            dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
            dispatch(setValgtTraadMeldingspanel(traadTilknyttetOppgave));
        } else {
            loggError(
                new Error(
                    `Fant ikke tråd tilknyttet oppgave ${oppgave.oppgaveid} med henvendelseId ${oppgave.henvendelseid}`
                )
            );
        }
    }

    const tilknyttetOppgave = dialogpanelTraad
        ? tildelteOppgaver.paaBruker.find(oppgave => oppgave.henvendelseid === dialogpanelTraad.traadId)
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
