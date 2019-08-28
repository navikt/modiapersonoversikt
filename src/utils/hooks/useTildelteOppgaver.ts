import { hasData } from '../../rest/utils/restResource';
import { isFinishedPosting } from '../../rest/utils/postResource';
import { useFødselsnummer, useRestResource } from '../customHooks';
import { Oppgave } from '../../models/oppgave';

export function removeDuplicateOppgaver(value: Oppgave, index: number, list: Oppgave[]) {
    return list.findIndex(oppgave => oppgave.oppgaveid === value.oppgaveid) === index;
}

function useTildelteOppgaver() {
    const oppgaveResource = useRestResource(resources => resources.oppgaver);
    const tildelteOppgaverResource = useRestResource(resources => resources.tildDelteOppgaver);
    const fnr = useFødselsnummer();

    const tildelteOppgaver = [
        ...(isFinishedPosting(oppgaveResource) ? oppgaveResource.response : []),
        ...(hasData(tildelteOppgaverResource) ? tildelteOppgaverResource.data : [])
    ].filter(removeDuplicateOppgaver);

    const tildelteOppgaverPaaBruker = tildelteOppgaver.filter(oppg => oppg.fødselsnummer === fnr);
    const tildelteOppgaverPaaAndreBrukere = tildelteOppgaver.filter(oppg => oppg.fødselsnummer !== fnr);

    return {
        alle: tildelteOppgaver,
        paaBruker: tildelteOppgaverPaaBruker,
        andreBrukere: tildelteOppgaverPaaAndreBrukere
    };
}

export default useTildelteOppgaver;
