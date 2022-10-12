import { Dispatch, useCallback, useMemo } from 'react';
import innstillingerResource, { Innstillinger } from '../../rest/resources/innstillingerResource';
import { hasData } from '@nutgaard/use-fetch';

const INGEN_INNSTILLINGER = {};
const INNSTILLINGER_KEY = 'lest-oppdateringslogg';
const INGEN_VERDI = -1;
const IKKE_LASTET_VERDI = Number.MAX_SAFE_INTEGER;

function useSisteLestOppdateringLogg(): [number, Dispatch<number>] {
    const innstillingerRequest = innstillingerResource.useFetch();

    const innstillinger: Innstillinger = hasData(innstillingerRequest)
        ? innstillingerRequest.data.innstillinger
        : INGEN_INNSTILLINGER;

    const value: number = hasData(innstillingerRequest)
        ? parseInt(innstillinger[INNSTILLINGER_KEY] ?? INGEN_VERDI)
        : IKKE_LASTET_VERDI;

    const updater: Dispatch<number> = useCallback(
        (newValue: number) => {
            if (hasData(innstillingerRequest)) {
                innstillingerResource
                    .update({ ...innstillingerRequest.data.innstillinger, [INNSTILLINGER_KEY]: newValue.toString() })
                    .catch((err) => console.error(err));
            }
        },
        [innstillingerRequest]
    );

    return useMemo(() => [value, updater], [value, updater]);
}

export default useSisteLestOppdateringLogg;
