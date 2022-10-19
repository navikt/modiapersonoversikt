import { useMemo } from 'react';
import { useFodselsnummer } from '../customHooks';
import { Oppgave } from '../../models/meldinger/oppgave';
import tildelteoppgaver from '../../rest/resources/tildelteoppgaverResource';

const emptyList: any[] = [];
function useTildelteOppgaver(): { paaBruker: Oppgave[] } {
    const tildelteOppgaverResource = tildelteoppgaver.useFetch();
    const fnr = useFodselsnummer();

    const tildelteOppgaver = tildelteOppgaverResource.data ? tildelteOppgaverResource.data : emptyList;
    return useMemo(() => {
        const alleTildelteOppgaverPaaBruker = tildelteOppgaver.filter((oppg) => oppg.fødselsnummer === fnr);

        return { paaBruker: alleTildelteOppgaverPaaBruker };
    }, [tildelteOppgaver, fnr]);
}

export default useTildelteOppgaver;
