import { useNavigate } from '@tanstack/react-router';
import type { JSX } from 'react';
import { useDispatch } from 'react-redux';
import LazySpinner from '../../../../components/LazySpinner';
import type { Traad } from '../../../../models/meldinger/meldinger';
import { setValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import dialogResource from '../../../../rest/resources/dialogResource';
import { useJustOnceEffect } from '../../../../utils/customHooks';
import useTildelteOppgaver from '../../../../utils/hooks/useTildelteOppgaver';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { useInfotabsDyplenker } from '../../infotabs/dyplenker';
import { eldsteMelding, kanBesvares } from '../../infotabs/meldinger/utils/meldingerUtils';

interface Pending {
    pending: true;
    placeholder: JSX.Element;
}

interface Success {
    pending: false;
}

type Response = Pending | Success;

function useVisTraadTilknyttetPlukketOppgave(dialogpanelTraad?: Traad): Response {
    const traaderResource = dialogResource.useFetch();
    const tildelteOppgaver = useTildelteOppgaver();
    const dispatch = useDispatch();
    const dyplenker = useInfotabsDyplenker();
    const navigate = useNavigate();

    useJustOnceEffect(
        function visTraadTilknyttetOppgaveIDialogpanel(done) {
            const oppgave = tildelteOppgaver.paaBruker[0];
            const åpneTrådIFortsettDialogpanel = !dialogpanelTraad && !!oppgave;
            if (!åpneTrådIFortsettDialogpanel || !traaderResource.data) {
                return;
            }
            const traadTilknyttetOppgave = traaderResource.data.find((traad) => traad.traadId === oppgave.traadId);
            const kanTraadBesvares = kanBesvares(traadTilknyttetOppgave);

            if (traadTilknyttetOppgave && kanTraadBesvares) {
                dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
            }

            if (traadTilknyttetOppgave) {
                navigate({
                    to: '/person/meldinger',
                    search: { traadId: traadTilknyttetOppgave.traadId }
                });
                done();
            } else {
                const debugKanBesvares = traadTilknyttetOppgave
                    ? eldsteMelding(traadTilknyttetOppgave).meldingstype
                    : 'Fant ikke tråd';
                loggError(
                    new Error(
                        `Fant ikke tråd tilknyttet oppgave ${oppgave.oppgaveId} med traadId ${oppgave.traadId} [${debugKanBesvares}]`
                    )
                );
            }
        },
        [tildelteOppgaver.paaBruker, dialogpanelTraad, dispatch, dyplenker, history, traaderResource]
    );

    if (tildelteOppgaver.paaBruker.length > 0 && !traaderResource.data) {
        return {
            pending: true,
            placeholder: <LazySpinner type="M" />
        };
    }

    return {
        pending: false
    };
}

export default useVisTraadTilknyttetPlukketOppgave;
