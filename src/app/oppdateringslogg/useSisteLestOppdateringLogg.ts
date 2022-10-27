import { Dispatch, useCallback, useMemo } from 'react';
import innstillingerResource, { Innstillinger } from '../../rest/resources/innstillingerResource';

const INGEN_INNSTILLINGER = {};
const INNSTILLINGER_KEY = 'lest-oppdateringslogg';
const INGEN_VERDI = -1;
const IKKE_LASTET_VERDI = Number.MAX_SAFE_INTEGER;

function useSisteLestOppdateringLogg(): [number, Dispatch<number>] {
    const innstillingerRequest = innstillingerResource.useFetch();
    const updateInnstillinger = innstillingerResource.useMutation();

    const innstillinger: Innstillinger = innstillingerRequest.isSuccess
        ? innstillingerRequest.data.innstillinger
        : INGEN_INNSTILLINGER;

    const value: number = innstillingerRequest.isSuccess
        ? parseInt(innstillinger[INNSTILLINGER_KEY] ?? INGEN_VERDI)
        : IKKE_LASTET_VERDI;

    const updater: Dispatch<number> = useCallback(
        (newValue: number) => {
            if (innstillingerRequest.isSuccess) {
                updateInnstillinger
                    .mutateAsync({
                        ...innstillingerRequest.data.innstillinger,
                        [INNSTILLINGER_KEY]: newValue.toString()
                    })
                    .catch((err) => console.error(err));
            }
        },
        [innstillingerRequest, updateInnstillinger]
    );

    return useMemo(() => [value, updater], [value, updater]);
}

export default useSisteLestOppdateringLogg;
