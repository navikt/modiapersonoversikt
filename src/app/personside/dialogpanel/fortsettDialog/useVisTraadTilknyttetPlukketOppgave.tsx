import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Traad } from '../../../../models/meldinger/meldinger';
import { useRestResource } from '../../../../utils/customHooks';
import useTildelteOppgaver from '../../../../utils/hooks/useTildelteOppgaver';
import { useDispatch } from 'react-redux';
import { useInfotabsDyplenker } from '../../infotabs/dyplenker';
import { useEffect } from 'react';
import { hasData } from '../../../../rest/utils/restResource';
import { setValgtTraadDialogpanel } from '../../../../redux/oppgave/actions';
import { loggError } from '../../../../utils/frontendLogger';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';

interface Pending {
    pending: true;
    placeholder: JSX.Element;
}

interface Success {
    pending: false;
}

type Response = Pending | Success;

function useVisTraadTilknyttetPlukketOppgave(props: RouteComponentProps, dialogpanelTraad?: Traad): Response {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const tildelteOppgaver = useTildelteOppgaver();
    const dispatch = useDispatch();
    const dyplenker = useInfotabsDyplenker();

    useEffect(
        function visTraadTilknyttetOppgaveIDialogpanel() {
            const oppgave = tildelteOppgaver.nettopTildelt[0];
            const åpneTrådIFortsettDialogpanel = !dialogpanelTraad && !!oppgave;
            if (!åpneTrådIFortsettDialogpanel || !hasData(traaderResource)) {
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
        [tildelteOppgaver.nettopTildelt, dialogpanelTraad, dispatch, dyplenker, props.history, traaderResource]
    );

    if (tildelteOppgaver.nettopTildelt.length > 0 && !hasData(traaderResource)) {
        return {
            pending: true,
            placeholder: <CenteredLazySpinner />
        };
    }

    return {
        pending: false
    };
}

export default useVisTraadTilknyttetPlukketOppgave;
