import { useEffect, useMemo, useState } from 'react';
import { Ansatt, Enhet } from '../../../../../../../models/meldinger/oppgave';
import { loggError, loggEvent } from '../../../../../../../utils/frontendLogger';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';

interface Returns {
    ansatte: Ansatt[];
    pending: boolean;
}

function useAnsattePaaEnhet(enhet?: Enhet): Returns {
    const [ansatte, setAnsatte] = useState<Ansatt[]>([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (!enhet) {
            return;
        }

        setPending(true);
        loggEvent('Fetch', 'LagOppgave-Ansatte');
        fetch(`${apiBaseUri}/enheter/${enhet.enhetId}/ansatte`, includeCredentials)
            .then(response => response.json())
            .then(setAnsatte)
            .catch(e => loggError(e, 'Feil ved henting av ansatte'))
            .finally(() => setPending(false));
    }, [enhet]);

    return useMemo(
        () => ({
            pending,
            ansatte
        }),
        [pending, ansatte]
    );
}

export default useAnsattePaaEnhet;
