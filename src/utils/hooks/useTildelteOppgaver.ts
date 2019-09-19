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
