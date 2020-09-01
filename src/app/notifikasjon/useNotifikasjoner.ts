import { useEffect, useMemo, useState } from 'react';
import { Notifikasjon } from './NotifikasjonsContainer';
import { loggError, loggEvent } from '../../utils/logger/frontendLogger';
import { apiBaseUri, includeCredentials } from '../../api/config';

interface Returns {
    data: Notifikasjon[];
    pending: boolean;
    error: boolean;
}

function useNotifikasjoner(): Returns {
    const [data, setNotifikasjoner] = useState<Notifikasjon[]>([]);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setPending(true);
        loggEvent('Fetch', 'Notifikasjon');
        fetch(`${apiBaseUri}/notifikasjon`, includeCredentials)
            .then(response => response.json())
            .then(setNotifikasjoner)
            .catch(e => {
                setError(true);
                loggError(e, 'Feil ved henting av notifikasjoner');
            })
            .finally(() => setPending(false));
    }, []);
    return useMemo(
        () => ({
            pending,
            data,
            error
        }),
        [pending, data, error]
    );
}

export default useNotifikasjoner;
