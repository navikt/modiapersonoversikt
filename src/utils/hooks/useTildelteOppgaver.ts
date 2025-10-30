import { useMemo } from 'react';
import { usePersonAtomValue } from 'src/lib/state/context';
import type { Oppgave } from 'src/models/meldinger/oppgave';
import tildelteoppgaver from '../../rest/resources/tildelteoppgaverResource';

const emptyList: Oppgave[] = [];
function useTildelteOppgaver(): { paaBruker: Oppgave[] } {
    const tildelteOppgaverResource = tildelteoppgaver.useFetch();
    const fnr = usePersonAtomValue();

    const tildelteOppgaver = tildelteOppgaverResource.data ?? emptyList;
    return useMemo(() => {
        const alleTildelteOppgaverPaaBruker = tildelteOppgaver.filter((oppg) => oppg.fnr === fnr);

        return { paaBruker: alleTildelteOppgaverPaaBruker };
    }, [tildelteOppgaver, fnr]);
}

export default useTildelteOppgaver;
