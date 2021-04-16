import { useMemo } from 'react';
import { useFodselsnummer } from '../customHooks';
import { useRestResource } from '../../rest/consumer/useRestResource';
import { Oppgave } from '../../models/meldinger/oppgave';

const emptyList: any[] = [];
function useTildelteOppgaver(): { paaBruker: Oppgave[] } {
    const tildelteOppgaverResource = useRestResource(resources => resources.tildelteOppgaver);
    const fnr = useFodselsnummer();

    const tildelteOppgaver = tildelteOppgaverResource.data ?? emptyList;
    return useMemo(() => {
        const alleTildelteOppgaverPaaBruker = tildelteOppgaver.filter(oppg => oppg.fødselsnummer === fnr);

        return { paaBruker: alleTildelteOppgaverPaaBruker };
    }, [tildelteOppgaver, fnr]);
}

export default useTildelteOppgaver;
