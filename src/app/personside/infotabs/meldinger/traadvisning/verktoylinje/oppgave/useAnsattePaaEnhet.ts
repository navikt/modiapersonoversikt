import { useEffect, useMemo, useState } from 'react';
import { Ansatt } from '../../../../../../../models/meldinger/oppgave';
import { loggError, loggEvent } from '../../../../../../../utils/logger/frontendLogger';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';

interface Returns {
    ansatte: Ansatt[];
    pending: boolean;
}

function useAnsattePaaEnhet(enhetId?: String): Returns {
    const [ansatte, setAnsatte] = useState<Ansatt[]>([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (!enhetId) {
            return;
        }

        setPending(true);
        loggEvent('Fetch', 'LagOppgave-Ansatte');
        fetch(`${apiBaseUri}/enheter/${enhetId}/ansatte`, includeCredentials)
            .then((response) => response.json())
            .then(setAnsatte)
            .catch((e) => loggError(e, 'Feil ved henting av ansatte'))
            .finally(() => setPending(false));
    }, [enhetId]);

    return useMemo(
        () => ({
            pending,
            ansatte
        }),
        [pending, ansatte]
    );
}

export default useAnsattePaaEnhet;
