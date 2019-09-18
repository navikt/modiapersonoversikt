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
import { RouteComponentProps, withRouter } from 'react-router';
import { useInfotabsDyplenker } from '../infotabs/dyplenker';
import { useEffect } from 'react';

const DialogPanelWrapper = styled.article`
    flex-grow: 1;
`;

function DialogPanel(props: RouteComponentProps) {
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);
    const tildelteOppgaver = useTildelteOppgaver();
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const dispatch = useDispatch();
    const dyplenker = useInfotabsDyplenker();

    useEffect(
        function visTraadTilknyttetOppgaveIDialogpanel() {
            const oppgave = tildelteOppgaver.paaBruker[0];
            const visTraadTilknyttetOppgave = !dialogpanelTraad && !!oppgave;
            if (!visTraadTilknyttetOppgave || !hasData(traaderResource)) {
                return;
            }
            const traadTilknyttetOppgave = traaderResource.data.find(traad => traad.traadId === oppgave.henvendelseid);
            if (traadTilknyttetOppgave) {
                dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
                props.history.push(dyplenker.meldinger.link(traadTilknyttetOppgave));
            } else {
                loggError(
                    new Error(
                        `Fant ikke tråd tilknyttet oppgave ${oppgave.oppgaveid} med henvendelseId ${oppgave.henvendelseid}`
                    )
                );
            }
        },
        [tildelteOppgaver.paaBruker, dialogpanelTraad, dispatch, dyplenker, props.history, traaderResource]
    );

    const tilknyttetOppgave = dialogpanelTraad
        ? tildelteOppgaver.paaBruker.find(oppgave => oppgave.henvendelseid === dialogpanelTraad.traadId)
        : undefined;

    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <DialogPanelWrapper role="region" aria-label="Dialogpanel">
                <Undertittel className="sr-only">Dialogpanel</Undertittel>
                {dialogpanelTraad !== undefined ? (
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
