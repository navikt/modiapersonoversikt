import { useEffect, useMemo, useState } from 'react';
import { apiBaseUri, includeCredentials } from '../../../../../../../api/config';
import type { Ansatt } from '../../../../../../../models/meldinger/oppgave';
import { loggError, loggEvent } from '../../../../../../../utils/logger/frontendLogger';

interface Returns {
    ansatte: Ansatt[];
    pending: boolean;
}

function useAnsattePaaEnhet(enhetId?: string): Returns {
    const [ansatte, setAnsatte] = useState<Ansatt[]>([]);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (!enhetId) {
            return;
        }

        setPending(true);
        loggEvent('Fetch', 'LagOppgave-Ansatte');
        fetch(`${apiBaseUri}/v2/enheter/${enhetId}/ansatte`, includeCredentials)
            .then((response) => response.json())
            .then(setAnsatte)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
