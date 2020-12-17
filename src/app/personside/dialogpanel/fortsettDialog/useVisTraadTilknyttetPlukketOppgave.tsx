import { Traad } from '../../../../models/meldinger/meldinger';
import useTildelteOppgaver from '../../../../utils/hooks/useTildelteOppgaver';
import { useDispatch } from 'react-redux';
import { useInfotabsDyplenker } from '../../infotabs/dyplenker';
import { setValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { useHistory } from 'react-router';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { eldsteMelding, kanBesvares } from '../../infotabs/meldinger/utils/meldingerUtils';
import { useJustOnceEffect } from '../../../../utils/customHooks';

interface Pending {
    pending: true;
    placeholder: JSX.Element;
}

interface Success {
    pending: false;
}

type Response = Pending | Success;

function useVisTraadTilknyttetPlukketOppgave(dialogpanelTraad?: Traad): Response {
    const traaderResource = useRestResource(resources => resources.traader);
    const tildelteOppgaver = useTildelteOppgaver();
    const dispatch = useDispatch();
    const dyplenker = useInfotabsDyplenker();
    const history = useHistory();

    useJustOnceEffect(
        function visTraadTilknyttetOppgaveIDialogpanel(done: () => void) {
            const oppgave = tildelteOppgaver.nettopTildelt[0];
            const åpneTrådIFortsettDialogpanel = !dialogpanelTraad && !!oppgave;
            if (!åpneTrådIFortsettDialogpanel || !traaderResource.data) {
                return;
            }
            const traadTilknyttetOppgave = traaderResource.data.find(traad => traad.traadId === oppgave.traadId);
            const kanTraadBesvares = kanBesvares(traadTilknyttetOppgave);

            if (traadTilknyttetOppgave && kanTraadBesvares) {
                dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
            }

            if (traadTilknyttetOppgave) {
                history.push(dyplenker.meldinger.link(traadTilknyttetOppgave));
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
        [tildelteOppgaver.nettopTildelt, dialogpanelTraad, dispatch, dyplenker, history, traaderResource]
    );

    if (tildelteOppgaver.nettopTildelt.length > 0 && !traaderResource.data) {
        return {
            pending: true,
            placeholder: traaderResource.placeholder
        };
    }

    return {
        pending: false
    };
}

export default useVisTraadTilknyttetPlukketOppgave;
