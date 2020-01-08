import { isFinishedPosting } from '../../rest/utils/postResource';
import { useFødselsnummer } from '../customHooks';
import { Oppgave } from '../../models/oppgave';
import { useRestResource } from '../../rest/consumer/useRestResource';
import { usePostResource } from '../../rest/consumer/usePostResource';

export function removeDuplicateOppgaver(value: Oppgave, index: number, list: Oppgave[]) {
    return list.findIndex(oppgave => oppgave.oppgaveId === value.oppgaveId) === index;
}

function useTildelteOppgaver() {
    const oppgaveResource = usePostResource(resources => resources.plukkNyeOppgaver);
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);
    const fnr = useFødselsnummer();

    const tildelteOppgaver = [
        ...(isFinishedPosting(oppgaveResource) ? oppgaveResource.response : []),
        ...(tildelteOppgaverResource.data ? tildelteOppgaverResource.data : [])
    ].filter(removeDuplicateOppgaver);

    const alleTildelteOppgaverPaaBruker = tildelteOppgaver.filter(oppg => oppg.fødselsnummer === fnr);
    const alleTildelteOppgaverPaaAndreBrukere = tildelteOppgaver.filter(oppg => oppg.fødselsnummer !== fnr);
    const plukkedeOppgaverPåBruker = isFinishedPosting(oppgaveResource)
        ? oppgaveResource.response.filter(oppg => oppg.fødselsnummer === fnr)
        : [];

    return {
        alle: tildelteOppgaver,
        paaBruker: alleTildelteOppgaverPaaBruker,
        andreBrukere: alleTildelteOppgaverPaaAndreBrukere,
        nettopTildelt: plukkedeOppgaverPåBruker
    };
}

export default useTildelteOppgaver;
