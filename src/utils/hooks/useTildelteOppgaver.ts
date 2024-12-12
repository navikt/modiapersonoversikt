import { useMemo } from 'react';
import type { Oppgave } from '../../models/meldinger/oppgave';
import tildelteoppgaver from '../../rest/resources/tildelteoppgaverResource';
import { useFodselsnummer } from '../customHooks';

const emptyList: Oppgave[] = [];
function useTildelteOppgaver(): { paaBruker: Oppgave[] } {
    const tildelteOppgaverResource = tildelteoppgaver.useFetch();
    const fnr = useFodselsnummer();

    const tildelteOppgaver = tildelteOppgaverResource.data ?? emptyList;
    return useMemo(() => {
        const alleTildelteOppgaverPaaBruker = tildelteOppgaver.filter((oppg) => oppg.fødselsnummer === fnr);

        return { paaBruker: alleTildelteOppgaverPaaBruker };
    }, [tildelteOppgaver, fnr]);
}

export default useTildelteOppgaver;
