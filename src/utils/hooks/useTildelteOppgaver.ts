import { hasData, isNotStarted } from '../../rest/utils/restResource';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isFinishedPosting } from '../../rest/utils/postResource';
import { useFødselsnummer, usePrevious, useRestResource } from '../customHooks';

function useTildelteOppgaver() {
    const oppgaveResource = useRestResource(resources => resources.oppgaver);
    const tildelteOppgaverResource = useRestResource(resources => resources.tildDelteOppgaver);
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();

    const prevFnr = usePrevious(fnr);
    useEffect(() => {
        if (prevFnr !== fnr) {
            if (isNotStarted(tildelteOppgaverResource)) {
                dispatch(tildelteOppgaverResource.actions.fetch);
            } else {
                dispatch(tildelteOppgaverResource.actions.reload);
            }
        }
    }, [fnr, dispatch, tildelteOppgaverResource, prevFnr]);

    const tildelteOppgaver = [
        ...(isFinishedPosting(oppgaveResource) ? oppgaveResource.response : []),
        ...(hasData(tildelteOppgaverResource) ? tildelteOppgaverResource.data : [])
    ];
    const tildelteOppgaverPaaBruker = tildelteOppgaver.filter(oppg => oppg.fødselsnummer === fnr);
    const tildelteOppgaverPaaAndreBrukere = tildelteOppgaver.filter(oppg => oppg.fødselsnummer !== fnr);

    return {
        alle: tildelteOppgaver,
        paaBruker: tildelteOppgaverPaaBruker,
        andreBrukere: tildelteOppgaverPaaAndreBrukere
    };
}

export default useTildelteOppgaver;
