import { useEffect } from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import useTildelteOppgaver from '../../../../utils/hooks/useTildelteOppgaver';
import { useDispatch } from 'react-redux';
import { useInfotabsDyplenker } from '../../infotabs/dyplenker';
import { setValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { loggError } from '../../../../utils/logger/frontendLogger';
import { useHistory } from 'react-router';
import { useRestResource } from '../../../../rest/consumer/useRestResource';

interface Pending {
    pending: true;
    placeholder: JSX.Element;
}

interface Success {
    pending: false;
}

type Response = Pending | Success;

function useVisTraadTilknyttetPlukketOppgave(dialogpanelTraad?: Traad): Response {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const tildelteOppgaver = useTildelteOppgaver();
    const dispatch = useDispatch();
    const dyplenker = useInfotabsDyplenker();
    const history = useHistory();

    useEffect(
        function visTraadTilknyttetOppgaveIDialogpanel() {
            const oppgave = tildelteOppgaver.nettopTildelt[0];
            const åpneTrådIFortsettDialogpanel = !dialogpanelTraad && !!oppgave;
            if (!åpneTrådIFortsettDialogpanel || !traaderResource.data) {
                return;
            }
            const traadTilknyttetOppgave = traaderResource.data.find(traad => traad.traadId === oppgave.traadId);
            if (traadTilknyttetOppgave) {
                dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
                history.push(dyplenker.meldinger.link(traadTilknyttetOppgave));
            } else {
                loggError(
                    new Error(`Fant ikke tråd tilknyttet oppgave ${oppgave.oppgaveId} med traadId ${oppgave.traadId}`)
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
