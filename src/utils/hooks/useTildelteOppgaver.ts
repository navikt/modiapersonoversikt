import { useMemo } from 'react';
import { isFinishedPosting } from '../../rest/utils/postResource';
import { useFødselsnummer } from '../customHooks';
import { useRestResource } from '../../rest/consumer/useRestResource';
import { usePostResource } from '../../rest/consumer/usePostResource';
import { Oppgave } from '../../models/meldinger/oppgave';

export function removeDuplicateOppgaver(value: Oppgave, index: number, list: Oppgave[]) {
    return list.findIndex(oppgave => oppgave.oppgaveId === value.oppgaveId) === index;
}

const emptyList: any[] = [];
function useTildelteOppgaver() {
    const oppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);
    const fnr = useFødselsnummer();

    const tildelteOppgaver = useMemo(
        () =>
            [
                ...(isFinishedPosting(oppgaveResource) ? oppgaveResource.response : emptyList),
                ...(tildelteOppgaverResource.data ? tildelteOppgaverResource.data : emptyList)
            ].filter(removeDuplicateOppgaver),
        [oppgaveResource, tildelteOppgaverResource]
    );

    const plukkedeOppgaverPåBruker = useMemo(
        () =>
            isFinishedPosting(oppgaveResource)
                ? oppgaveResource.response.filter(oppg => oppg.fødselsnummer === fnr)
                : emptyList,
        [oppgaveResource, fnr]
    );

    return useMemo(() => {
        const alleTildelteOppgaverPaaBruker = tildelteOppgaver.filter(oppg => oppg.fødselsnummer === fnr);
        const alleTildelteOppgaverPaaAndreBrukere = tildelteOppgaver.filter(oppg => oppg.fødselsnummer !== fnr);

        return {
            alle: tildelteOppgaver,
            paaBruker: alleTildelteOppgaverPaaBruker,
            andreBrukere: alleTildelteOppgaverPaaAndreBrukere,
            nettopTildelt: plukkedeOppgaverPåBruker
        };
    }, [tildelteOppgaver, plukkedeOppgaverPåBruker, fnr]);
}

export default useTildelteOppgaver;
