import { useMemo } from 'react';
import { useFødselsnummer } from '../customHooks';
import { useRestResource } from '../../rest/consumer/useRestResource';
import { Oppgave } from '../../models/meldinger/oppgave';

export function removeDuplicateOppgaver(value: Oppgave, index: number, list: Oppgave[]) {
    return list.findIndex(oppgave => oppgave.oppgaveId === value.oppgaveId) === index;
}

const emptyList: any[] = [];
function useTildelteOppgaver() {
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);
    const fnr = useFødselsnummer();

    const tildelteOppgaver = useMemo(
        () => (tildelteOppgaverResource.data ?? emptyList).filter(removeDuplicateOppgaver),
        [tildelteOppgaverResource]
    );

    const plukkedeOppgaverPåBruker = useMemo(() => tildelteOppgaver.filter(oppg => oppg.fødselsnummer === fnr), [
        tildelteOppgaver,
        fnr
    ]);

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
